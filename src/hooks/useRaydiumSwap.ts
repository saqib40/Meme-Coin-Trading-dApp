import { useState, useCallback } from 'react';
import type { TokenInfo } from '../lib/constants';
import { prepareSwap } from '../lib/raydium';
import { useRaydium } from '../context/RaydiumProvider';

type SwapState = 'idle' | 'loading' | 'success' | 'error';

export const useRaydiumSwap = () => {
    const [status, setStatus] = useState<SwapState>('idle');
    const [error, setError] = useState<Error | null>(null);
    const { raydium, isLoading: isRaydiumLoading } = useRaydium();

    const swap = useCallback(async (fromToken: TokenInfo, toToken: TokenInfo, amount: number) => {
        if (!raydium || !raydium.owner) {
            setError(new Error("Raydium SDK not initialized or wallet not connected."));
            setStatus('error');
            return;
        }

        setStatus('loading');
        setError(null);

        try {
            // 1. Prepare the swap using the initialized SDK instance
            const { execute } = await prepareSwap(raydium, fromToken, toToken, amount);
            
            // 2. Execute the swap
            const { txIds } = await execute({ 
                sequentially: true, // Ensures transactions are sent in the correct order
                sendAndConfirm: true, // Waits for confirmation
            });
            
            // Log the primary transaction ID
            console.log(`Swap successful! Signature: https://solscan.io/tx/${txIds[0]}`);
            setStatus('success');

        } catch (e) {
            console.error("Swap failed:", e);
            setError(e instanceof Error ? e : new Error("An unknown error occurred during swap."));
            setStatus('error');
        }
    }, [raydium]);

    const reset = () => {
        setStatus('idle');
        setError(null);
    };

    // Expose the loading state of the SDK itself
    const isLoading = status === 'loading' || isRaydiumLoading;

    return { status, error, swap, reset, isLoading };
};
