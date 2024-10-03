import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../../services/api';

export default function useFetchWeather(geoData, searchQuery) {
  // Use React Query to fetch weather data using either geolocation or city name
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', searchQuery || geoData],
    queryFn: () =>
      searchQuery
        ? fetchWeatherByCity(searchQuery)
        : fetchWeatherByCoords(geoData),
    enabled: (!!geoData?.latitude && !!geoData?.longitude) || !!searchQuery,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return { data, error, isLoading };
}
