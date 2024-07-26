const PricesHistory = ({history}) => {
    // console.log(history);
    return ( 
        <div className="">
            <div className="flex justify-between">
                <div className="grid grid-cols-2">
                    <span>Price</span>
                    <span>Date</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Price</span>
                    <span>Date</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Price</span>
                    <span>Date</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Price</span>
                    <span>Date</span>
                </div>
            </div>
            <div className="flex justify-between">
                {history.map(coin => (
                
                    <div key={coin.coin} className="grid grid-cols-2">
                        {/* <span>{coin.coin}:</span> */}
                        {coin.pricesHistory.map(prices => (
                            <>
                                <span>{prices.price}</span>
                                <span>{prices.date}</span>
                            </>
                        ))}
                    </div>
                ))}
            </div>
            
            
            {/* {history.map(coin => (
            
                <div key={coin.coin} className="grid grid-cols-2">
                    <span>{coin.coin}:</span>
                    {coin.pricesHistory.map(prices => (
                        <>
                            <span>{prices.price}</span>
                            <span>{prices.date}</span>
                        </>
                    ))}
                </div>
            ))} */}
        </div>
    );
}
 
export default PricesHistory;