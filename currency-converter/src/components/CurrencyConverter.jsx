import { useEffect, useState } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = ({ url }) => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchExchangeRate();
  }, [amount, fromCurrency, toCurrency]);

  const sendRequest = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setError('Wrong Request. Try again with other params');
        return;
      }

      const data = await response.json();
      console.log('data=', data);
      return data;
    } catch (error) {
      console.error(error);
      setError('Service is unavailable. Try again later');
    }
  };

  const fetchCurrencies = async () => {
    const data = await sendRequest(`${url}/currencies`);
    console.log('fetchCurrencies data=', data);
    setCurrencies(Object.keys(data));
  };

  const fetchExchangeRate = async () => {
    const data = await sendRequest(
      `${url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    const rate = data.rates[toCurrency];
    setConvertedAmount(rate.toFixed(2));
    console.log('fetchExchangeRate data=', data);
  };

  return (
    <div className='currency-converter'>
      <h2>Convert Currencies</h2>
      {error && <h2 class='error'>{error}</h2>}
      <form onSubmit={fetchExchangeRate}>
        <div>
          <label>Amount:</label>
          <input
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>From:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            required
          >
            {currencies.map((currency) => (
              <option value={currency} key={`from_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>To:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            required
          >
            {currencies.map((currency) => (
              <option value={currency} key={`to_${currency}`}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </form>
      <h2>
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </h2>
    </div>
  );
};

export default CurrencyConverter;
