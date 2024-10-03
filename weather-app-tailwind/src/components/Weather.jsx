import { useState } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import useFetchWeather from '../hooks/useFetchWeather';

const WeatherComponent = () => {
  const {
    loading: geoLoading,
    error: geoError,
    data: geoData,
  } = useGeolocation();
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    error: apiError,
    isLoading: apiLoading,
  } = useFetchWeather(geoData, searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchQuery(city.trim());
    }
  };

  if (geoLoading || apiLoading) return <p>Loading...</p>;

  const { currentWeather, forecast } = data || {};

  return (
    <div>
      {geoError && <p>Geolocation Error: {geoError.message}</p>}
      {apiError && <p>API Error: {apiError.message}</p>}
      <form onSubmit={handleSearch} className='mb-4'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name'
          className='p-2 border border-gray-300 rounded'
        />
        <button
          type='submit'
          className='ml-2 p-2 bg-blue-500 text-white rounded'
        >
          Search
        </button>
      </form>

      {currentWeather && (
        <div className='mb-8 text-center'>
          <h2 className='text-xl font-semibold mb-2'>
            Current Weather for {currentWeather.name}
          </h2>
          <p className='text-2xl font-bold'>
            {Math.round(currentWeather.main.temp)}&deg;C
          </p>
          <p className='capitalize'>{currentWeather.weather[0].description}</p>
        </div>
      )}
      <hr />

      {forecast && (
        <div className='bg-blue-100 p-4 rounded-lg shadow-lg'>
          <h2 className='text-lg font-bold text-center mb-4'>Forecast</h2>
          <ul className='space-y-4'>
            {forecast.list.slice(0, 5).map((forecastItem, index) => (
              <li key={index} className='p-4 bg-white rounded-lg shadow-md'>
                <p className='text-lg font-semibold'>
                  {new Date(forecastItem.dt * 1000).toLocaleString()}
                </p>
                <p>Temperature: {Math.round(forecastItem.main.temp)}&deg;C</p>
                <p>Weather: {forecastItem.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
