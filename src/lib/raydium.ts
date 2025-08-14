import {
  Raydium,
  Token,
  TokenAmount,
  TxVersion,
  toApiV3Token,
} from '@raydium-io/raydium-sdk-v2';
import { PublicKey } from '@solana/web3.js';
import type { TokenInfo } from '../lib/constants';


// mainnet program IDs from the official Raydium documentation.
const MAINNET_PROGRAM_ID = {
  Router: new PublicKey('routeUGWgWzqBWFcrCfv8tritsqukccJPu3q5GPP3xS'),
  AmmV4: new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'),
  CLMM: new PublicKey('CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK'),
  CREATE_CPMM_POOL_PROGRAM: new PublicKey('CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C'),
};

type InferredRoutePoolInfo = Awaited<ReturnType<Raydium['tradeV2']['fetchRoutePoolBasicInfo']>>;

let routePoolInfoCache: InferredRoutePoolInfo | null = null;

/**
 * @returns A promise that resolves to an object with an `execute` function.
 */
export async function prepareSwap(
  raydiumInstance: Raydium,
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amount: number
) {
  console.log('Preparing v2 swap...');

  if (!raydiumInstance.owner) {
    throw new Error("Wallet not connected. The Raydium SDK instance provided to prepareSwap must have an owner.");
  }

  // 1. Fetch pool info for routing, using a cache to be efficient.
  if (!routePoolInfoCache) {
    console.log('Fetching all pool basic info for routing, this may take a moment...');
    routePoolInfoCache = await raydiumInstance.tradeV2.fetchRoutePoolBasicInfo({
      amm: MAINNET_PROGRAM_ID.AmmV4,
      clmm: MAINNET_PROGRAM_ID.CLMM,
      cpmm: MAINNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM,
    });
  } else {
    console.log('Using cached route pool info.');
  }

  const inputMint = new PublicKey(fromToken.mint);
  const outputMint = new PublicKey(toToken.mint);

  // 2. Find all possible routes
  const routes = raydiumInstance.tradeV2.getAllRoute({
    inputMint,
    outputMint,
    ...routePoolInfoCache,
  });

  // 3. Fetch live data for the routes found
  const {
    routePathDict,
    mintInfos,
    ammSimulateCache,
    computeClmmPoolInfo,
    computeCpmmData,
    computePoolTickData,
  } = await raydiumInstance.tradeV2.fetchSwapRoutesData({
    routes,
    inputMint,
    outputMint,
  });

  const inputTokenInfo = mintInfos[inputMint.toBase58()];
  const outputTokenInfo = mintInfos[outputMint.toBase58()];

  // 4. Calculate the output for each route to find the best one
  const swapRoutes = raydiumInstance.tradeV2.getAllRouteComputeAmountOut({
    directPath: routes.directPath.map(
      (p) => ammSimulateCache[p.id.toBase58()] || computeClmmPoolInfo[p.id.toBase58()] || computeCpmmData[p.id.toBase58()]
    ),
    routePathDict,
    simulateCache: ammSimulateCache,
    tickCache: computePoolTickData,
    inputTokenAmount: new TokenAmount(new Token({ ...inputTokenInfo, mint: fromToken.mint }), amount, true),
    outputToken: toApiV3Token({
        address: toToken.mint,
        programId: outputTokenInfo.programId.toBase58(),
        decimals: outputTokenInfo.decimals,
        symbol: toToken.symbol,
        name: toToken.name,
        mintAuthority: outputTokenInfo.mintAuthority?.toBase58(),
        freezeAuthority: outputTokenInfo.freezeAuthority?.toBase58(),
    }),
    chainTime: new Date().getTime() / 1000,
    slippage: 0.01, // 1%
    epochInfo: await raydiumInstance.connection.getEpochInfo(),
    mintInfos,
  });

  if (swapRoutes.length === 0) {
    throw new Error("No viable swap route found.");
  }

  const bestRoute = swapRoutes[0];
  console.log('Best route found:', bestRoute);

  // 5. Get the pool keys for the chosen route
  const poolKeys = await raydiumInstance.tradeV2.computePoolToPoolKeys({
    pools: bestRoute.poolInfoList,
  });

  // 6. Build the transaction
  const { execute } = await raydiumInstance.tradeV2.swap({
    routeProgram: MAINNET_PROGRAM_ID.Router,
    txVersion: TxVersion.V0,
    swapInfo: bestRoute,
    swapPoolKeys: poolKeys,
    ownerInfo: {
      associatedOnly: true,
      checkCreateATAOwner: true,
    },
  });

  console.log('Swap prepared.');
  return { execute };
}
