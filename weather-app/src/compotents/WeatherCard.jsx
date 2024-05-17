import { WEATHER_IMAGES_URL } from "../constants";
import { getFormattedDate } from "../utils";
import styles from "./WeatherCard.module.css";

const WeatherCard = ({ data }) => {
  const { sys, main, weather, name, wind } = data;
  return (
    <div>
      <div className={styles.container}>
        <h2>
          {name}, <span>{sys.country}</span>
        </h2>
        <h3>
          <span>{getFormattedDate()}</span>
        </h3>
        <h3 className={styles.current}>Current Weather</h3>
        <div className={styles.row}>
          <img
            className={styles.image}
            src={`${WEATHER_IMAGES_URL}/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
          />
          <span className={styles.temperature}>
            {Math.round(main.temp)}
            <sup>&deg;c</sup>
          </span>

          <div className={styles.description}>
            <span>{weather[0].main}</span>
            <br />
            <span>
              Feels like {Math.round(main.feels_like)}
              <sup>&deg;</sup>
            </span>
          </div>
        </div>

        <div className={styles.row}>
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
    </div>
  );
};

export default WeatherCard;
