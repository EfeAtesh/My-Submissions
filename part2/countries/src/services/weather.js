import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_API_KEY;

const getWeather = (city) => {
  if (!apiKey) {
    return Promise.reject(new Error('VITE_API_KEY is not configured.'));
  }

  return axios.get(`${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
};

export default { getWeather };