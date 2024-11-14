import axios from 'axios';
import { useEffect, useState } from 'react';
import './Crypto.css';

export function Crypto() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.coincap.io/v2/assets');
        setCryptos(result.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price USD</th>
            <th>Change 24H</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.rank}</td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{parseFloat(crypto.priceUsd).toFixed(2)} USD</td>
              <td>{parseFloat(crypto.changePercent24Hr).toFixed(4)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
