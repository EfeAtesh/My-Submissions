import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(city)
      .then(response => {
        setWeather(response.data);
      })
      .catch(fetchError => {
        console.error('Error fetching weather:', fetchError);
        setError('Weather data could not be loaded.');
      });
  }, [city]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
