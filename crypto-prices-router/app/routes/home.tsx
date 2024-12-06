import type { Route } from './+types/home';
import axios from 'axios';
import { CryptoPrices } from '~/crypto-prices/crypto-prices';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Crypto Prices App' },
    { name: 'description', content: 'Crypto Prices App with React Router' },
  ];
}

export async function clientLoader() {
  let cryptos = null;
  try {
    const result = await axios('https://api.coincap.io/v2/assets');
    cryptos = result.data.data;
  } catch (error) {
    console.error(error);
  }
  console.log({ cryptos });
  return cryptos;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log('loaderData=', loaderData);
  return <CryptoPrices cryptos={loaderData} />;
}
