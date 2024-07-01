import { useQuery } from "react-query";
import { getPrice } from "../services/pricesApi";

export const useGetPrice = (coin) => useQuery({queryKey: ['price', coin], queryFn: () => getPrice(coin), refetchInterval: 2000})
