import { useGetPrice } from "../api/prices";
import { useEffect, useRef } from "react";
import { transformDate } from "../utils/date";

const CoinPrice = ({ coin, savedCoins, setSavedCoins }) => {
  const { data: price } = useGetPrice(coin);

  const proccentFuncRef = useRef();
  const saveCoinRef = useRef();

  useEffect(() => {
    // Function to calculate percentage difference
    proccentFuncRef.current = () => {
      const total = savedCoins.find((searchCoin) => searchCoin.coin === coin)?.price;
      const part = price?.data?.result?.list[0]?.indexPrice;
      const result = total ? ((part - total) / total) * 100 : 0;
      return result.toFixed(2);
    };

    // Function to save the coin data
    saveCoinRef.current = () => {
      const date = new Date();  
      console.log("Function saveCoin was called", transformDate(date));

      setSavedCoins((prev) =>
        prev.map((searchCoin) =>
          searchCoin.coin === coin
            ? {
                ...searchCoin,
                price: price?.data?.result?.list[0]?.indexPrice || searchCoin.price,
                date: transformDate(date),
                pricesHistory: [
                  ...searchCoin.pricesHistory,
                  { price: price?.data?.result?.list[0]?.indexPrice || 0, date: transformDate(date), priceMovement: proccentFuncRef.current()},
                ],
              }
            : searchCoin
        )
      );
    };
  }, [coin, price, savedCoins, setSavedCoins]);

  useEffect(() => {
    const saveCoinInterval = setInterval(() => {
      console.log("Interval for saveCoin triggered");
      saveCoinRef.current();
    }, 60000); // 1 хвилина

    const updateDifferenceInterval = setInterval(() => {
      console.log("Interval for updateDifference triggered");
      setSavedCoins((prev) =>
        prev.map((searchCoin) =>
          searchCoin.coin === coin
            ? {
                ...searchCoin,
                difference: proccentFuncRef.current() || 0,
              }
            : searchCoin
        )
      );
    }, 1000); // 1 секунда

    return () => {
      clearInterval(saveCoinInterval);
      clearInterval(updateDifferenceInterval);
      console.log("Intervals cleared");
    };
  }, [coin, setSavedCoins]);

  if (!price || price.data.retCode !== 0 || price.data.retMsg !== "OK") {
    return <div>Такої монети не існує: {coin}</div>;
  }

  const priceOfCoin = price?.data?.result?.list[0]?.indexPrice;

  return (
    <div style={{ display: "flex" }}>
      <div>{coin}: {priceOfCoin}</div>
      <div style={{ marginLeft: '10px' }}>({proccentFuncRef.current()}%)</div>
    </div>
  );
};

export default CoinPrice;
