import BalanceDisplay from "../components/BalanceDisplay";
import Header from "../components/Header";
import SwapForm from "../components/SwapForm";
import TxHistoryItem from "../components/TxHistoryItem";
import { BonkLogo, SolanaLogo, WifLogo } from "../icons/icons";

function TradeView() {
  const mockTransactions = [
    { from: { symbol: 'SOL', logo: <SolanaLogo /> }, to: { symbol: 'WIF', logo: <WifLogo /> }, date: '2 mins ago', status: 'Completed' },
    { from: { symbol: 'BONK', logo: <BonkLogo /> }, to: { symbol: 'SOL', logo: <SolanaLogo /> }, date: '1 hour ago', status: 'Completed' },
    { from: { symbol: 'SOL', logo: <SolanaLogo /> }, to: { symbol: 'BONK', logo: <BonkLogo /> }, date: '5 hours ago', status: 'Failed' },
  ];

  return (
    <div className="bg-[#1a1f2e] min-h-screen font-sans text-gray-300 flex flex-col items-center pt-4 sm:pt-10">
      <div className="w-full max-w-md mx-auto space-y-8 px-4">
        <Header />
        <main>
          <SwapForm />
        </main>
        
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white px-2">Your Balances</h2>
          <div className="space-y-2">
            <BalanceDisplay tokenName="Solana" tokenSymbol="SOL" balance={1.25} logo={<SolanaLogo />} />
            <BalanceDisplay tokenName="dogwifhat" tokenSymbol="WIF" balance={1337.0} logo={<WifLogo />} />
            <BalanceDisplay tokenName="Bonk" tokenSymbol="BONK" balance={69420.0} logo={<BonkLogo />} />
          </div>
          
          <div className="pt-4">
            <h2 className="text-lg font-bold text-white px-2 mb-2">Transaction History</h2>
            <div className="space-y-1">
              {mockTransactions.map((tx, i) => (
                <TxHistoryItem key={i} fromToken={tx.from} toToken={tx.to} date={tx.date} status={tx.status} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TradeView;