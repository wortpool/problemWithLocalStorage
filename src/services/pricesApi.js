import axiosIns from "./axiosIns"

export const getPrice = async (coin) => {
    return await axiosIns.get(`/v5/market/tickers?category=inverse&symbol=${coin}`)
}