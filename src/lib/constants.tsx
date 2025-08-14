import type { JSX } from "react";
import { WifLogo, BonkLogo, WenLogo, SolanaLogo } from "../icons/icons";

export interface TokenInfo {
    symbol: string;
    name: string;
    mint: string;
    decimals: number;
    logoURI?: string | JSX.Element;
}


export const SOL_INFO: TokenInfo = {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: <SolanaLogo />
};

export const MEME_COINS: TokenInfo[] = [
    {
        symbol: 'WIF',
        name: 'dogwifhat',
        mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzL7GMogW9gysK',
        decimals: 6,
        logoURI: <WifLogo />, 
    },
    {
        symbol: 'BONK',
        name: 'Bonk',
        mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        decimals: 5,
        logoURI: <BonkLogo /> 
    },
    {
        symbol: 'WEN',
        name: 'Wen',
        mint: 'WENWENvqqNya429ub2BgSWbQja8cDWCFmxA6gYmzd3a',
        decimals: 5,
        logoURI: <WenLogo />
    }
];

export const DEFAULT_TOKEN_LIST = [SOL_INFO, ...MEME_COINS];
