import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { ConfirmedSignatureInfo } from '@solana/web3.js';

export const useTxHistory = () => {
    const [history, setHistory] = useState<ConfirmedSignatureInfo[] | null>(null);
    const [loading, setLoading] = useState(false);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    /**
     * useCallback to prevent re-creation on every render
     * It only gets re-created if `publicKey` or `connection` changes.
     */
    const fetchHistory = useCallback(async () => {
        if (!publicKey) {
            setHistory(null);
            return;
        }
        // Set loading to true before starting the fetch.
        setLoading(true);
        try {
            const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 15 });
            setHistory(signatures);
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
            setHistory(null);
        } finally {
            // Set loading back to false once the operation is complete.
            setLoading(false);
        }
    }, [publicKey, connection]); // Dependencies for the useCallback hook.
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { history, loading, refreshHistory: fetchHistory };
};
