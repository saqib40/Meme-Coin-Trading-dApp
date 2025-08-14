import { useState, useCallback } from "react";
import { ChevronDown, ArrowDown } from "../icons/icons";
import type { TokenInfo } from "../lib/constants";
import { useRaydiumSwap } from "../hooks/useRaydiumSwap";
import { DEFAULT_TOKEN_LIST } from "../lib/constants";

const TokenModal = ({ isOpen, onClose, onSelectToken, tokenList, selectedTokenMint }: { isOpen: boolean; onClose: () => void; onSelectToken: (token: TokenInfo) => void; tokenList: TokenInfo[]; selectedTokenMint?: string; }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1a1f2e] rounded-2xl w-full max-w-md p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Select a token</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tokenList.map((token) => {
            const isSelected = token.mint === selectedTokenMint;
            return (
              <button key={token.mint} onClick={() => onSelectToken(token)} disabled={isSelected} className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${isSelected ? "bg-slate-700 cursor-not-allowed" : "hover:bg-slate-800"}`}>
                <div className="w-8 h-8">{token.logoURI}</div>
                <div>
                  <p className="font-bold text-white text-left">{token.symbol}</p>
                  <p className="text-xs text-gray-400 text-left">{token.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SwapForm = () => {
  const [fromToken, setFromToken] = useState<TokenInfo>(DEFAULT_TOKEN_LIST[0]);
  const [toToken, setToToken] = useState<TokenInfo>(DEFAULT_TOKEN_LIST[1]);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingFor, setSelectingFor] = useState<"from" | "to" | null>(null);
  const { swap, status, error, isLoading } = useRaydiumSwap();

  const openModal = (type: "from" | "to") => {
    setSelectingFor(type);
    setIsModalOpen(true);
  };

  const handleSelectToken = (token: TokenInfo) => {
    if (selectingFor === "from") {
      if (token.mint === toToken.mint) setToToken(fromToken);
      setFromToken(token);
    } else {
      if (token.mint === fromToken.mint) setFromToken(toToken);
      setToToken(token);
    }
    setIsModalOpen(false);
    setSelectingFor(null);
  };

  const handleSwap = useCallback(() => {
    const numericAmount = parseFloat(amount);
    if (!fromToken || !toToken || isNaN(numericAmount) || numericAmount <= 0) return;
    swap(fromToken, toToken, numericAmount);
  }, [fromToken, toToken, amount, swap]);

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-[#2c3240] rounded-2xl p-6 space-y-4 shadow-2xl">
        <div className="bg-[#1a1f2e] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">You pay</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0.0" className="bg-transparent text-3xl font-mono text-white w-full focus:outline-none" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={() => openModal("from")} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors shrink-0">
              <div className="w-6 h-6">{fromToken.logoURI}</div>
              <span className="font-bold text-white">{fromToken.symbol}</span>
              <ChevronDown />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleFlipTokens} className="p-2 bg-[#1a1f2e] rounded-full border-4 border-[#2c3240] hover:bg-slate-800 transition-colors">
            <ArrowDown />
          </button>
        </div>
        <div className="bg-[#1a1f2e] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">You receive</span>
          </div>
          <div className="flex justify-between items-center">
            <input type="number" placeholder="0.0" className="bg-transparent text-3xl font-mono text-white w-full focus:outline-none" value="--" readOnly />
            <button onClick={() => openModal("to")} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors shrink-0">
              <div className="w-6 h-6">{toToken.logoURI}</div>
              <span className="font-bold text-white">{toToken.symbol}</span>
              <ChevronDown />
            </button>
          </div>
        </div>
        <button onClick={handleSwap} disabled={isLoading || !amount || parseFloat(amount) <= 0} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-colors">
          {isLoading ? "Swapping..." : "Swap"}
        </button>
        {status === 'error' && error && <p className="text-red-400 text-center mt-2">{error.message}</p>}
        {status === 'success' && <p className="text-green-400 text-center mt-2">Swap Successful!</p>}
      </div>
      <TokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectToken={handleSelectToken} tokenList={DEFAULT_TOKEN_LIST} selectedTokenMint={selectingFor === "from" ? toToken.mint : fromToken.mint} />
    </>
  );
};

export default SwapForm;