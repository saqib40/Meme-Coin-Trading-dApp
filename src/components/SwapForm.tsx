import { useState } from "react";
import { ArrowDown, ChevronDown, SolanaLogo, WifLogo } from "../icons/icons";

const SwapForm = () => {
    const [fromToken, setFromToken] = useState({ name: 'Solana', symbol: 'SOL', logo: <SolanaLogo /> });
    const [toToken, setToToken] = useState({ name: 'dogwifhat', symbol: 'WIF', logo: <WifLogo /> });

    return (
        <div className="w-full max-w-md mx-auto bg-[#2c3240] rounded-2xl p-6 space-y-4 shadow-2xl">
            {/* From Section */}
            <div className="bg-[#1a1f2e] p-4 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">You pay</span>
                    <span className="text-xs text-gray-400">Balance: 1.25</span>
                </div>
                <div className="flex justify-between items-center">
                    <input 
                        type="number" 
                        placeholder="0.0" 
                        className="bg-transparent text-3xl font-mono text-white w-full focus:outline-none"
                        defaultValue="0.1"
                    />
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors">
                        {fromToken.logo}
                        <span className="font-bold text-white">{fromToken.symbol}</span>
                        <ChevronDown />
                    </button>
                </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex justify-center">
                <div className="p-2 bg-[#1a1f2e] rounded-full border-4 border-[#2c3240]">
                    <ArrowDown />
                </div>
            </div>

            {/* To Section */}
            <div className="bg-[#1a1f2e] p-4 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">You receive</span>
                    <span className="text-xs text-gray-400">Balance: 1,337.0</span>
                </div>
                <div className="flex justify-between items-center">
                    <input 
                        type="number" 
                        placeholder="0.0" 
                        className="bg-transparent text-3xl font-mono text-white w-full focus:outline-none"
                        defaultValue="69.42"
                        readOnly
                    />
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors">
                        {toToken.logo}
                        <span className="font-bold text-white">{toToken.symbol}</span>
                        <ChevronDown />
                    </button>
                </div>
            </div>
            
            {/* Swap Button */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-colors">
                Swap
            </button>
        </div>
    );
};

export default SwapForm;