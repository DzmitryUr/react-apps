import type { Route } from './+types/crypto';
import axios from 'axios';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  let cryptos = null;
  console.log('params=', params);
  try {
    const result = await axios(`https://api.coincap.io/v2/assets/${params.id}`);
    cryptos = result.data.data;
  } catch (error) {
    console.error(error);
  }
  console.log({ cryptos });
  return cryptos;
}

export default function Crypto({ loaderData }: Route.ComponentProps) {
  const { name, marketCapUsd, priceUsd, supply } = loaderData;

  return (
    <div>
      <h2 className='text-3xl font-bold p-4'>Info about {name}</h2>
      <p>Price: {parseFloat(priceUsd).toFixed(2)}$</p>
      <p>Supply: {parseFloat(supply).toFixed(2)}</p>
      <p>Market Cap: {parseFloat(marketCapUsd).toFixed(2)}$</p>
    </div>
  );
}
