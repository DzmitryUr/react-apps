import { useLoaderData } from 'react-router';

export function Crypto() {
  // const params = useParams();
  // const cryptoName = params.id;
  const data = useLoaderData();
  console.log('data=', data);
  return <h2>Info about {data.name}</h2>;
}
