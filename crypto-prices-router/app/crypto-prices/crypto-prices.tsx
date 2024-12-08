import { NavLink } from 'react-router';

interface Crypto {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

interface Props {
  cryptos: Crypto[];
}

export function CryptoPrices({ cryptos }: Props) {
  return (
    <div className='text-center'>
      <h2 className='text-3xl font-bold p-4'>Crypto Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th> Name</th>
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
                  <NavLink to={`/crypto/${crypto.id}`}>{crypto.name}</NavLink>
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
