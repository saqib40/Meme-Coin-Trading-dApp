type BalanceDisplayProps = {
  tokenName: string;
  tokenSymbol: string;
  balance: number;
  logo: React.ReactNode;
};

const BalanceDisplay = ({ tokenName, tokenSymbol, balance, logo } : BalanceDisplayProps) => {
  return (
    <div className="flex items-center justify-between w-full p-3 bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-3">
        {logo}
        <div>
          <p className="font-bold text-white">{tokenName}</p>
          <p className="text-sm text-gray-400">{tokenSymbol}</p>
        </div>
      </div>
      <p className="font-mono text-lg text-white">{balance.toFixed(4)}</p>
    </div>
  );
};

export default BalanceDisplay;