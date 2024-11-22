import { useLoaderData } from 'react-router';

import './CryptoPrices.css';

export async function clientLoader() {
  try {
    const result = await axios('https://api.coincap.io/v2/assets');
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function CryptoPrices() {
  const cryptos = useLoaderData();
  return (
    <div>
      <h2>Crypto Prices</h2>
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
          {cryptos &&
            cryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td>{crypto.rank}</td>
                <td>
                  <Link to={`crypto/${crypto.name}`}>{crypto.name}</Link>
                </td>
                <td>{crypto.symbol}</td>
                <td>{parseFloat(crypto.priceUsd).toFixed(2)}</td>
                <td>{parseFloat(crypto.changePercent24Hr).toFixed(4)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
