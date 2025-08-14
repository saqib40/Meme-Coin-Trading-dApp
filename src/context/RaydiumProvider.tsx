import { Raydium } from '@raydium-io/raydium-sdk-v2';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Define the shape of the context data
interface RaydiumContextState {
  raydium: Raydium | null;
  isLoading: boolean;
}

// Create the context with a default value
const RaydiumContext = createContext<RaydiumContextState>({
  raydium: null,
  isLoading: false,
});

// Create a provider component
export const RaydiumProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [raydium, setRaydium] = useState<Raydium | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initRaydium = async () => {
      if (!wallet.connected || !wallet.publicKey || !wallet.signAllTransactions) {
        setRaydium(null);
        return;
      }

      if (raydium) return;

      setIsLoading(true);
      try {
        const sdk = await Raydium.load({
          owner: wallet.publicKey,
          connection,
          signAllTransactions: wallet.signAllTransactions,
        });
        setRaydium(sdk);
      } catch (error) {
        console.error("Failed to initialize Raydium SDK:", error);
        setRaydium(null);
      } finally {
        setIsLoading(false);
      }
    };

    initRaydium();
  }, [wallet, connection, raydium]);

  return (
    <RaydiumContext.Provider value={{ raydium, isLoading }}>
      {children}
    </RaydiumContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useRaydium = () => {
  const context = useContext(RaydiumContext);
  if (context === undefined) {
    throw new Error('useRaydium must be used within a RaydiumProvider');
  }
  return context;
};
