import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { TokenInfo } from '../lib/constants'; // We'll need token info for decimals

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
            const tokenAccountAddress = await getAssociatedTokenAddress(token.mint, publicKey);
            const tokenAccountInfo = await getAccount(connection, tokenAccountAddress);
            setBalance(Number(tokenAccountInfo.amount) / (10 ** token.decimals));
        } catch (error) {
            // This error is expected if the user doesn't have a token account yet.
            setBalance(0);
        }
    }, [publicKey, connection, token]);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return { balance, refreshBalance: fetchTokenBalance };
};
