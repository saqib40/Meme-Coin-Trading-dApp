import { SolanaLogo } from "../icons/icons";

const Header = () => {
  return (
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <SolanaLogo />
        <h1 className="text-xl font-bold text-white">Meme Trader</h1>
      </div>
      {/* This is where the actual <WalletMultiButton /> would go */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors">
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;