import { useGetPrice } from "../api/prices";
import { useCallback, useEffect } from "react";
import { transformDate } from "../utils/date";

const CoinPrice = ({ coin, savedCoins, setSavedCoins }) => {
  const { data: price } = useGetPrice(coin);

  const proccentFunc = useCallback(() => {
    const total = savedCoins.find((searchCoin) => searchCoin.coin === coin)?.price;
    const part = price?.data?.result?.list[0]?.indexPrice;
    const result = total ? ((part - total) / total) * 100 : 0;
    return result.toFixed(2);
  }, [coin, price, savedCoins]);

  const saveCoin = useCallback(() => {
    const date = new Date();
    console.log("function saveCoin was called", transformDate(date));

    setSavedCoins((prev) =>
      prev.map((searchCoin) =>
        searchCoin.coin === coin
          ? {
              ...searchCoin,
              price: price?.data?.result?.list[0]?.indexPrice || searchCoin.price,
              date: transformDate(date),
              pricesHistory: [
                ...searchCoin.pricesHistory,
                { price: price?.data?.result?.list[0]?.indexPrice || 0, date: transformDate(date) }
              ],
            }
          : searchCoin
      )
    );
  }, [coin, price, setSavedCoins]);

  useEffect(() => {
    const saveCoinInterval = setInterval(() => {
      console.log("Interval for saveCoin triggered");
      saveCoin();
    }, 5000); // 1 минута

    const updateDifferenceInterval = setInterval(() => {
      console.log("Interval for updateDifference triggered");
      setSavedCoins((prev) =>
        prev.map((searchCoin) =>
          searchCoin.coin === coin
            ? {
                ...searchCoin,
                difference: proccentFunc() || 0,
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
  }, [saveCoin, proccentFunc, coin, setSavedCoins]);

  if (price?.data.retCode !== 0 || price.data.retMsg !== "OK") {
    return <div>Такої монети не існує: {coin}</div>;
  }

  const priceOfCoin = price?.data.result.list[0].indexPrice;

  return (
    <div style={{ display: "flex" }}>
      <div>{coin}: {priceOfCoin}</div>
      <div style={{ marginLeft: '10px' }}>({proccentFunc()}%)</div>
    </div>
  );
};

export default CoinPrice;
