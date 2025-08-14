import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SolanaLogo } from "../icons/icons";

const Header = () => {
  return (
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <SolanaLogo />
        <h1 className="text-xl font-bold text-white">Meme Trader</h1>
      </div>
      <WalletMultiButton/>
    </header>
  );
};

export default Header;