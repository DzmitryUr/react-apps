import axios from 'axios';

export const fetchCrypto = async ({ params }) => {
  console.log('fetchCrypto');
  try {
    console.log('id=', params.id);
    const result = await axios(
      `https://api.coincap.io/v2/assets/${params.id.toLowerCase()}`
    );
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
