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
  
  // console.log(savedCoins);
  

  const transformDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const [historyOfAllJumping, setHistoryOfAllJumping] = useState([])
  const [historyOfSingleJumping, setHistoryOfSingleJumping] = useState([])

  const checkDifferenceOnAll = () => {
    return savedCoins.every((coin) => coin.difference > 1.50 || coin.difference < -1.50);
  }

  const checkDifferenceOnSingle = () => {
    return savedCoins.filter((coin) => coin.difference > 1.50 || coin.difference < -1.50);
  }

  useEffect(() => {
    if(checkDifferenceOnAll()) {
      const movement = savedCoins[0].difference > 0 ? 'up' : 'down';
      const differences = savedCoins.map(coin => `${coin.coin}: ${coin.difference}`).join(', ');
      setHistoryOfAllJumping(prev => [...prev, { move: movement, difference: differences, time: transformDate(new Date())}])
    }

    if(checkDifferenceOnSingle().length > 0) {
      const movement = checkDifferenceOnSingle().difference > 0 ? 'up' : 'down';      
      const differences = checkDifferenceOnSingle().map(coin => `${coin.coin}: ${coin.difference}`).join(', ');
      setHistoryOfSingleJumping(prev => [...prev, { move: movement, difference: differences, time: transformDate(new Date())}])
    }
  }, [savedCoins])

  console.log("historyOfAllJumping", historyOfAllJumping);
  console.log("historyOfSingleJumping", historyOfSingleJumping);

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
