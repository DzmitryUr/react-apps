import axios from 'axios';

export const fetchCryptoPrices = async () => {
  try {
    const result = await axios('https://api.coincap.io/v2/assets');
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
