import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import styles from "./Weather.module.css";
import { WEATHER_COORDS_URL } from "../constants";
import WeatherCard from "./WeatherCard";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchCoordinatesData, setError);
  }, []);

  const fetchCoordinatesData = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    fetchData(lat, long);
  };

  const setError = (error) => {
    if (error.code === 1) {
      setErrorMessage(
        "Geolocation is disabled. The app does not work without Geolocation."
      );
      return;
    }

    setErrorMessage(error.message);
  };

  const fetchData = async (lat, long) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${WEATHER_COORDS_URL}/?lat=${lat}&lon=${long}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setLoading(false);
      if (!response.ok) {
        setErrorMessage("Error in response. Try again later");
      }

      const data = await response.json();
      setWeatherData(data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage("Error in connection. Try again later");
    }
  };

  const onPlaceSelected = (place) => {
    console.log(place);
    if (!place || !place.geometry || !place.geometry.location) return;
    const lat = place.geometry.location.lat();
    const long = place.geometry.location.lng();
    console.log(lat, long);
    fetchData(lat, long);
  };

  return (
    <div>
      {errorMessage && (
        <div className={styles.error}>
          <span>{errorMessage}</span>
        </div>
      )}
      <Autocomplete
        className={styles.autocomplete}
        apiKey={GOOGLE_API_KEY}
        onPlaceSelected={onPlaceSelected}
      />
      {loading && <div className={styles.loading}>Loading...</div>}
      {weatherData && weatherData.main && <WeatherCard data={weatherData} />}
    </div>
  );
};

export default Weather;
