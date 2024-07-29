import { useEffect, useState } from 'react';
import './CurrencyConverter.css';

function CurrencyConverter({ url }) {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmunt, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchRate();
  }, [amount, fromCurrency, toCurrency]);

  const sendRequest = async (endpoint) => {
    try {
      setError('');
      const response = await fetch(endpoint);
      if (!response.ok) {
        setError('Wrong Request. Try again with other params.');
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setError('Service is unavailable. Try again later');
    }
  };

  const fetchCurrencies = async () => {
    const data = await sendRequest(`${url}/currencies`);
    console.log('fetchCurrencies=', data);
    setCurrencies(Object.keys(data));
  };

  const fetchRate = async () => {
    const data = await sendRequest(
      `${url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    setConvertedAmount(data.rates[toCurrency].toFixed(2));
    console.log('fetchRate=', data);
  };

  return (
    <div className='currency-converter'>
      <h2>Convert Currency</h2>
      {error && <h2 className='error'>{error}</h2>}
      <form>
        <div>
          <label>Amount:</label>
          <input
            type='number'
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
        {amount} {fromCurrency} = {convertedAmunt} {toCurrency}
      </h2>
    </div>
  );
}

export default CurrencyConverter;
