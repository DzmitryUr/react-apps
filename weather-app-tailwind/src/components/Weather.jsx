import { useState } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import useGeolocation from '../hooks/useGeolocation';

export default function Weather() {
  const { loading, error, data: geoData } = useGeolocation();
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data,
    error: apiError,
    isLoading: apiLoading,
  } = useFetchWeather(geoData, searchQuery);

  if (loading) {
    return <p className='text-blue-500 text-lg font-semibold'>Loading ...</p>;
  }

  if (error) {
    return (
      <p className='text-red-500 text-lg font-semibold'>
        Error: {error.message}
      </p>
    );
  }

  const { currentWeather, forecast } = data || {};

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      console.log('city=', city);
      setSearchQuery(city.trim());
    }
  };

  return (
    <div className='p-6 bg-[url("/src/assets/clouds.jpg")]'>
      {error && <p>{error.message}</p>}
      {apiError && <p>{apiError.message}</p>}
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Enter city name'
          className='p-2 border border-gray-300 rounded'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type='submit'
          className='ml-2 p-2 bg-blue-500 text-white rounded'
        >
          Search
        </button>
      </form>
      {currentWeather && (
        <div className='mb-5 mt-5 text-center'>
          <h2 className='text-xl font-semibold mb-2'>
            Current Weather for {currentWeather.name}
          </h2>
          <p className='text-2xl font-bold'>
            {Math.round(currentWeather.main.temp)}&deg;C
          </p>
          <p className='capitalize'>{currentWeather.weather[0].description}</p>
        </div>
      )}

      {forecast && (
        <div className='bg-blue-100 p-4 rounded-lg shadow-lg'>
          <h2 className='text-lg font-bold mb-4'>Forecast</h2>
          <ul className='space-y-4'>
            {forecast.list.slice(0, 5).map((forecastItem, index) => (
              <li key={index} className='p-4 bg-white rounded-lg shadow-md'>
                <p className='text-lg font-semibold'>{forecastItem.dt_txt}</p>
                <p className='text-2xl font-bold'>
                  {Math.round(forecastItem.main.temp)}&deg;C
                </p>
                <p>Weather: {forecastItem.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
