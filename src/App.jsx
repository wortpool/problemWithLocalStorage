import CoinPrice from "./components/CoinPrice";

function App() {
  return (
    <>
      <CoinPrice coin='BTCUSD'/>
      <CoinPrice coin='ETHUSD'/>
      <CoinPrice coin='SOLUSD'/>
      {/* <CoinPrice coin='PEPEUSD'/> */}
      {/* <CoinPrice coin='DOGEUSD'/> */}
    </>
  )
}

export default App
