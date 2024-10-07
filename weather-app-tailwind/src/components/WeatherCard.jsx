import { getFormattedDate } from '../utils';

const WeatherCard = ({ data }) => {
  const { sys, main, weather, name, wind } = data;

  return (
    <div className='bg-blue-600 text-white p-4 w-96 rounded-3xl'>
      {/* Location and Date */}
      <h2 className='text-lg font-bold'>
        {name}, <span className='text-sm'>{sys.country}</span>
      </h2>
      <h3 className='text-sm text-gray-200'>
        <span>{getFormattedDate()}</span>
      </h3>

      {/* Current Weather */}
      <h3 className='mt-2 mb-4 text-base font-semibold'>Current Weather</h3>
      <div className='flex justify-between items-center mb-4'>
        {/* Weather Icon */}
        <img
          className='w-24'
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
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
          <span className='block text-sm text-gray-200'>
            Feels like {Math.round(main.feels_like)}
            <sup>&deg;</sup>
          </span>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className='flex justify-between text-sm'>
        <div>
          Wind <br /> {Math.round(wind.speed)} m/s
        </div>
        <div>
          Humidity <br /> {main.humidity}%
        </div>
        <div>
          Pressure <br /> {main.pressure} mb
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
