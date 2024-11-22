import { useParams } from 'react-router';

export function Crypto() {
  const { id } = useParams();
  return <h2>Info about crypto with id={id}</h2>;
}
