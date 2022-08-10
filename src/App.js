import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [select, setSelect] = useState();
  const [money, setMoney] = useState(null);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const onSelect = (event) => {
    setSelect(event.target.selectedIndex);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length} Types)`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name}({coin.symbol}):$ {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <h2>How much money you have?</h2>
          <input type="number" placeholder="$" onChange={onChange}></input>
          <h3>
            {select == null ? null : money / coins[select].quotes.USD.price} BTC{" "}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
