## Using :
- [@solana/web3.js](https://github.com/solana-foundation/solana-web3.js)
- [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter/tree/master)
- [@solana/spl-token](https://www.solana-program.com/docs/token)
- Raydium as AMM => [here](https://docs.raydium.io/raydium), [here](https://www.npmjs.com/package/@raydium-io/raydium-sdk-v2), and [here](https://github.com/raydium-io/raydium-sdk-V2-demo/tree/master)

## The flow :
### Connects Wallet:
- User clicks the “Connect Wallet” button.
- Wallet adapter prompts the user to select a wallet (e.g., Phantom).
- Wallet public key is stored in the frontend state.

### Fetches Balances:
- Frontend calls getTokenBalance to query SOL and meme coin balances.
- Balances are displayed in the UI.

### Initiate Swap:
- User selects a meme coin and enters the amount in the TradeForm.
- Frontend constructs a swap transaction using Raydium’s SDK or manual instruction via @solana/spl-token
- Wallet signs the transaction.

### Submit Transaction:
- Transaction is sent to the Devnet RPC.
- Frontend polls for transaction confirmation and updates the UI with the result.

### Add Token Selection: 
- Allow users to select from a list of meme coins (e.g., via a dropdown populated by Raydium’s token list).
### Transaction History: 
- Display a list of recent swap transactions with links to Solana Explorer.

