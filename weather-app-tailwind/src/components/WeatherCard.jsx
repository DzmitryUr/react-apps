import { weatherIconUrl } from '../services/api';
import { getFormattedDate } from '../utils';

export function WeatherCard({ data }) {
  const { sys, main, weather, name, wind } = data;

  return (
    <div className='flex flex-col items-center'>
      {/* Location and Date */}
      <h2 className='text-lg font-bold'>
        {name}, {sys.country}
      </h2>
      <h3 className='text-sm'>
        <span>{getFormattedDate()}</span>
      </h3>

      {/* Current Weather */}
      <h3 className='mt-2 mb-4 font-semibold'>Current Weather</h3>
      <div className='flex items-center justify-center mb-4'>
        {/* Weather Icon */}
        <img
          src={`${weatherIconUrl}${weather[0].icon}@2x.png`}
          alt={weather[0].description}
        />

        {/* Temperature */}
        <span className='text-4xl font-bold pr-6'>
          {Math.round(main.temp)}
          <sup>&deg;c</sup>
        </span>

        {/* Weather Description */}
        <div className='text-right'>
          <span className='block font-semibold'>{weather[0].main}</span>
          <span className='block text-sm'>
            Feels like {Math.round(main.feels_like)}
            <sup>&deg;</sup>
          </span>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className='flex justify-between text-sm w-full max-w-md'>
        <div className='text-center'>
          Wind <br /> {Math.round(wind.speed)} m/s
        </div>
        <div className='text-center'>
          Humidity <br /> {main.humidity}%
        </div>
        <div className='text-center'>
          Pressure <br /> {main.pressure} mb
        </div>
      </div>
    </div>
  );
}
