import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import type { TokenInfo } from '../lib/constants';
import { PublicKey } from '@solana/web3.js';

export const useTokenBalance = (token?: TokenInfo) => {
    const [balance, setBalance] = useState<number>(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const fetchTokenBalance = useCallback(async () => {
        if (!publicKey || !token) {
            setBalance(0);
            return;
        }
        try {
            const tokenMintPublicKey = new PublicKey(token.mint);
            const tokenAccountAddress = await getAssociatedTokenAddress(tokenMintPublicKey, publicKey);
            const tokenAccountInfo = await getAccount(connection, tokenAccountAddress);
            setBalance(Number(tokenAccountInfo.amount) / (10 ** token.decimals));
        } catch (error) {
            setBalance(0);
        }
    }, [publicKey, connection, token]);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return { balance, refreshBalance: fetchTokenBalance };
};
