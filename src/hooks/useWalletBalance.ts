import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const useWalletBalance = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const fetchBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(null);
            return;
        }
        try {
            const lamports = await connection.getBalance(publicKey);
            setBalance(lamports / LAMPORTS_PER_SOL);
        } catch (error) {
            console.error("Failed to fetch wallet balance:", error);
            setBalance(null);
        }
    }, [publicKey, connection]);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return { balance, refreshBalance: fetchBalance };
};
