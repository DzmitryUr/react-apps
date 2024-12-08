import type { Route } from './+types/crypto';
import axios from 'axios';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  let crypto = null;
  console.log('params=', params);
  try {
    const result = await axios(`https://api.coincap.io/v2/assets/${params.id}`);
    console.log(result);
    crypto = result.data.data;
  } catch (error) {
    console.error(error);
  }
  return crypto;
}

export default function Crypto({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return null;
  const { name, priceUsd, supply, marketCapUsd } = loaderData;
  return (
    <div>
      <h2 className='text-3xl font-bold m-4'>Info about {name}</h2>
      <p>Price: {parseFloat(priceUsd).toFixed(2)}</p>
      <p>Supply: {parseFloat(supply).toFixed(2)}</p>
      <p>Market Cap: {parseFloat(marketCapUsd).toFixed(2)}</p>
    </div>
  );
}
