import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import { WEATHER_COORDS_URL, WEATHER_IMAGES_URL } from "../constants";

const getFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return currentDate.toLocaleString("en-US", options);
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
    try {
      const response = await fetch(
        `${WEATHER_COORDS_URL}/?lat=${lat}&lon=${long}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      if (!response.ok) {
        setErrorMessage("Error in response. Try again later");
      }

      const data = await response.json();
      setWeatherData(data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error in connection. Try again later");
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className={styles.error}>
          <span>{errorMessage}</span>
        </div>
      )}
      {weatherData && weatherData.main && (
        <div className={styles.container}>
          <h2>
            {weatherData.name}, <span>{weatherData.sys.country}</span>
          </h2>
          <h3>
            <span>{getFormattedDate()}</span>
          </h3>
          <h3 className={styles.current}>Current Weather</h3>
          <div className={styles.row}>
            <img
              className={styles.image}
              src={`${WEATHER_IMAGES_URL}/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <span className={styles.temperature}>
              {Math.round(weatherData.main.temp)}
              <sup>&deg;c</sup>
            </span>

            <div className={styles.description}>
              <span>{weatherData.weather[0].main}</span>
              <br />
              <span>
                Feels like {Math.round(weatherData.main.feels_like)}
                <sup>&deg;</sup>
              </span>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              Wind <br /> {Math.round(weatherData.wind.speed)} m/s
            </div>
            <div>
              Humidity <br /> {weatherData.main.humidity}%
            </div>
            <div>
              Pressure <br /> {weatherData.main.pressure} mb
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
