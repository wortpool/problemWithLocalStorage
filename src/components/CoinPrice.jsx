import useLocalStorage from "use-local-storage";
import { useGetPrice } from "../api/prices";
import { useCallback, useEffect } from "react";

const CoinPrice = ({ coin }) => {
  const { data: price } = useGetPrice(coin);
  const [savedCoins, setSavedCoins] = useLocalStorage("savedCoins", [
    { coin: "BTCUSD", price: null },
    { coin: "ETHUSD", price: null },
    { coin: "SOLUSD", price: null },
  ]);

  const transformDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const saveCoin = () => {  // в майбутньому можна заюзати useCallback, поки що не бачу потреби
    const date = new Date();
    console.log("function was called", transformDate(date));

    setSavedCoins((prev) =>
      prev.map((searchCoin) =>
        searchCoin.coin === coin
          ? {
              ...searchCoin,
              price: price?.data?.result?.list[0]?.indexPrice || searchCoin.price,
              date: transformDate(date),
            }
          : searchCoin
      )
    );
  };

  const proccentFunc = () => {
    const total = savedCoins.find((searchCoin) => searchCoin.coin === coin)?.price;
    const part = price?.data?.result?.list[0]?.indexPrice;

    return total ? ((part - total) / total) * 100 : 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveCoin();
    }, 1000); // тут в майбтуньому думаю 10хв +-

    return () => clearInterval(interval);
  }, []);

  if (price?.data.retCode !== 0 || price.data.retMsg !== "OK")
    return <div>Такої монети не існує: {coin}</div>;

  return (
    <div className="" style={{ display: "flex" }}>
      <div className="">
        {coin}: {price?.data.result.list[0].indexPrice}
      </div>
      {/* <div className="">+{proccentFunc()}%</div> */}
    </div>
  );
};

export default CoinPrice;
