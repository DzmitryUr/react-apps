import { useParams } from 'react-router';

export function Crypto() {
  let { id } = useParams();
  return <h2>Info about Crypto with id={id}</h2>;
}
