import useLocalStorage from "use-local-storage";
import CoinPrice from "./components/CoinPrice";
import { useEffect, useState } from "react";
import PricesHistory from "./components/PricesHistory";

function App() {
  const [savedCoins, setSavedCoins] = useLocalStorage("savedCoins", [
    { coin: "BTCUSD", price: null, difference: null, pricesHistory: [] },
    { coin: "ETHUSD", price: null, difference: null, pricesHistory: [] },
    { coin: "SOLUSD", price: null, difference: null, pricesHistory: [] },
    { coin: "1000PEPEUSDT", price: null, difference: null, pricesHistory: [] },
  ]);

  const transformDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const [historyOfJumping, setHistoryOfJumping] = useState([])

  const checkDifference = () => {
    return savedCoins.every((coin) => coin.difference > 2);
  }

  useEffect(() => {
    if(checkDifference()) {
      setHistoryOfJumping(prev => [...prev, {dynamic: 'plus', time: transformDate(new Date())}])
    }
  }, [savedCoins])

  // console.log("historyOfJumping", historyOfJumping);

  return (
    <>
      <CoinPrice coin='BTCUSD' savedCoins={savedCoins} setSavedCoins={setSavedCoins} />
      <CoinPrice coin='ETHUSD' savedCoins={savedCoins} setSavedCoins={setSavedCoins} />
      <CoinPrice coin='SOLUSD' savedCoins={savedCoins} setSavedCoins={setSavedCoins} />
      <CoinPrice coin='1000PEPEUSDT' savedCoins={savedCoins} setSavedCoins={setSavedCoins}/>
      {/* <CoinPrice coin='DOGEUSD'/> */}
      <PricesHistory history={savedCoins} />
    </>
  )
}

export default App
