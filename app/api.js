import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_APP_ID;
const API_URL = 'http://localhost:5000';

export async function fetchWeatherData(city) {
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

export async function getFavoriteCities() {
     try {
          const response = await axios.get(`${API_URL}/favoriteCities`);
          return response.data;
     } catch (error) {
          console.error('Error fetching favorite cities:', error);
          throw error;
     }
};

export async function addFavoriteCity(city) {
     try {
          const response = await axios.post(`${API_URL}/favoriteCities`, city);
          return response.data;
     } catch (error) {
          console.error('Error adding favorite city:', error);
          throw error;
     }
};

export async function deleteFavoriteCity(cityId) {
     try {
          const response = await axios.delete(`${API_URL}/favoriteCities/${cityId}`);
          // return response.data;
          console.log('City deleted successfully:', response.data);
          Notiflix.Notify.success();
     } catch (error) {
          console.error('Error deleting favorite city:', error);
          Notiflix.Notify.failure();
     }
}