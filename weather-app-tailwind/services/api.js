import axios from 'axios';

const weatherUrl = 'https://api.openweathermap.org/data/2.5';
const currentWeatherUrl = `${weatherUrl}/weather`;
const forecastWeatherUrl = `${weatherUrl}/forecast`;
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeatherByCoords = async (geoData) => {
  if (!geoData?.latitude || !geoData?.longitude) return;

  const params = {
    lat: geoData.latitude,
    lon: geoData.longitude,
    appid: apiKey,
    units: 'metric',
  };

  // Use Promise.all to make both API requests in parallel
  const [currentWeatherRes, forecastRes] = await Promise.all([
    axios.get(currentWeatherUrl, { params }),
    axios.get(forecastWeatherUrl, { params }),
  ]);

  const currentWeather = currentWeatherRes.data;
  const forecast = forecastRes.data;

  return { currentWeather, forecast };
};

export const fetchWeatherByCity = async (searchQuery) => {
  if (!searchQuery) return;

  const params = {
    q: searchQuery,
    appid: apiKey,
    units: 'metric',
  };

  // Use Promise.all to make both API requests in parallel
  const [currentWeatherRes, forecastRes] = await Promise.all([
    axios.get(currentWeatherUrl, { params }),
    axios.get(forecastWeatherUrl, { params }),
  ]);

  const currentWeather = currentWeatherRes.data;
  const forecast = forecastRes.data;

  return { currentWeather, forecast };
};
