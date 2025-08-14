import { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { RaydiumProvider } from './RaydiumProvider';

import '@solana/wallet-adapter-react-ui/styles.css';

type SolanaProviderProps = {
    children: ReactNode;
};

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet; // update to mainnet or whatever
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter()
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <RaydiumProvider>
                        {children}
                    </RaydiumProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
