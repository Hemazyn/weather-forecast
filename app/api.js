import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_APP_ID;

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
          const favorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
          return favorites;
     } catch (error) {
          console.error('Error fetching favorite cities:', error);
          throw error;
     }
};

export async function addFavoriteCity(city) {
     try {
          const favorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
          favorites.push(city);
          localStorage.setItem('favoriteCities', JSON.stringify(favorites));
          return city;
     } catch (error) {
          console.error('Error adding favorite city:', error);
          throw error;
     }
};

export async function deleteFavoriteCity(cityId) {
     try {
          let favorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
          favorites = favorites.filter(city => city.id !== cityId);
          localStorage.setItem('favoriteCities', JSON.stringify(favorites));
          Notiflix.Notify.success('City deleted successfully');
          return favorites;
     } catch (error) {
          console.error('Error deleting favorite city:', error);
          Notiflix.Notify.failure('Failed to delete city');
          throw error;
     }
}