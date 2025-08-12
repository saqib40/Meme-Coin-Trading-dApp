import { SolanaProvider } from "./context/SolanaProvider";
import TradeView from "./views/TradeView"

function App() {
  return (
    <SolanaProvider>
      <TradeView></TradeView>
    </SolanaProvider>
  )
}

export default App;
