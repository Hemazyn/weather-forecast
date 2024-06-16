import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_APP_ID;
const API_URL = 'http://localhost:5000';

export const fetchWeatherData = async (city) => {
     try {
          const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

          const [currentWeatherResponse, forecastResponse] = await Promise.all([
               axios.get(currentWeatherUrl),
               axios.get(forecastUrl),
          ]);

          return {
               currentWeather: currentWeatherResponse.data,
               forecast: forecastResponse.data,
          };
     } catch (error) {
          console.error('Error fetching weather data:', error);
          throw error;
     }
};

export const getFavoriteCities = async () => {
     try {
          const response = await axios.get(`${API_URL}/favoriteCities`);
          return response.data;
     } catch (error) {
          console.error('Error fetching favorite cities:', error);
          throw error;
     }
};

export const addFavoriteCity = async (city) => {
     try {
          const response = await axios.post(`${API_URL}/favoriteCities`, city);
          return response.data;
     } catch (error) {
          console.error('Error adding favorite city:', error);
          throw error;
     }
};

export const deleteFavoriteCity = async (cityName) => {
     try {
          const response = await axios.delete(`${API_URL}/favoriteCities`, {
               data: { name: cityName }
          });
          return response.data;
     } catch (error) {
          console.error('Error deleting favorite city:', error);
          throw error;
     }
};