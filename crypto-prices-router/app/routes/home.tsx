import type { Route } from './+types/home';
import { CryptoPrices } from '~/crypto-prices/crypto-prices';
import axios from 'axios';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  let cryptos = null;
  try {
    const result = await axios('https://api.coincap.io/v2/assets');
    console.log(result);
    cryptos = result.data.data;
  } catch (error) {
    console.error(error);
  }
  return cryptos;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <CryptoPrices cryptos={loaderData} />;
}
