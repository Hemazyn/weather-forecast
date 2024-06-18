"use client";
import React, { useState, useEffect } from 'react';
import SearchComponent from '../components/SearchComponent';
import WeatherDisplay from '../components/WeatherDisplay';
import FavoriteComponent from '../components/FavoriteComponent';
import ForecastDisplay from '../components/ForecastDisplay';
import { getFavoriteCities, addFavoriteCity, deleteFavoriteCity, fetchWeatherData } from '../api';
import Notiflix from 'notiflix';

const WeatherDashboard = () => {
     const [weatherData, setWeatherData] = useState(null);
     const [forecastData, setForecastData] = useState(null);
     const [unit, setUnit] = useState('metric');
     const [favoriteCount, setFavoriteCount] = useState(0);
     const [favoriteCities, setFavoriteCities] = useState([]);
     const [isExpanded, setIsExpanded] = useState(false);

     useEffect(() => {
          fetchFavoriteCities();
     }, []);

     const fetchFavoriteCities = async () => {
          try {
               const favorites = await getFavoriteCities();
               setFavoriteCities(favorites.map(city => ({ ...city, isFavorite: true })));
               setFavoriteCount(favorites.length);
          } catch (error) {
               console.error('Error fetching favorite cities:', error);
          }
     };

     const handleSearch = async (city) => {
          try {
               const { currentWeather, forecast } = await fetchWeatherData(city);
               setWeatherData(currentWeather);
               setForecastData(forecast);
          } catch (error) {
               console.error('Error fetching weather data:', error);
          }
     };

     const convertTemperature = (temp, fromUnit, toUnit) => {
          if (fromUnit === 'metric' && toUnit === 'imperial') {
               return (temp * 9 / 5) + 32;
          } else if (fromUnit === 'imperial' && toUnit === 'metric') {
               return (temp - 32) * 5 / 9;
          }
          return temp;
     };

     const toggleUnit = () => {
          const newUnit = unit === 'metric' ? 'imperial' : 'metric';
          if (weatherData) {
               setWeatherData({
                    ...weatherData, main: { ...weatherData.main, temp: convertTemperature(weatherData.main.temp, unit, newUnit) }
               });
          }

          if (forecastData) {
               setForecastData({
                    ...forecastData,
                    list: forecastData.list.map(item => ({
                         ...item,
                         main: { ...item.main, temp: convertTemperature(item.main.temp, unit, newUnit) }
                    }))
               });
          }
          setUnit(newUnit);
     };

     const addToFavorites = async (city) => {
          const isFavorite = favoriteCities.some(favCity => favCity.name === city.name);

          if (!isFavorite) {
               try {
                    await addFavoriteCity(city);
                    setFavoriteCities(prevCities => [...prevCities, { ...city, isFavorite: true }]);
                    setFavoriteCount(prevCount => prevCount + 1);
               } catch (error) {
                    console.error('Error adding favorite city:', error);
               }
          }
     };

     const handleRemoveFavorite = async (cityId, cityName) => {
          try {
               await deleteFavoriteCity(cityId);
               setFavoriteCities(prevCities => prevCities.filter(city => city.id !== cityId));
               setFavoriteCount(prevCount => prevCount - 1);
               Notiflix.Notify.success(`Successfully removed ${cityName} from favorites`);
          } catch (error) {
               console.error('Error removing favorite city:', error);
               Notiflix.Notify.failure(`Failed to remove ${cityName}`);
          }
     };

     const isCityFavorite = (cityName) => {
          return favoriteCities.some(city => city.name === cityName);
     };

     const handleFavoriteClick = async (cityName) => {
          await handleSearch(cityName);
          setIsExpanded(false);
     };

     const toggleExpanded = () => {
          setIsExpanded(!isExpanded);
     };

     return (
          <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center px-5">
               <div className="relative z-10 flex flex-col justify-center items-center px-5">
                    <FavoriteComponent favoriteCount={favoriteCount} unit={unit} isExpanded={isExpanded} toggleExpanded={toggleExpanded} favoriteCities={favoriteCities} handleRemoveFavorite={handleRemoveFavorite} onFavoriteClick={handleFavoriteClick} />
                    <header className="text-center pt-10">
                         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Weather Dashboard</h1>
                         <p className="text-lg text-gray-300 mb-8">Your go-to app for weather forecasts & info</p>
                         <div className="container mx-auto px-4 py-8 mb-10 shadow bg-gray-800 bg-opacity-75 rounded-md">
                              <SearchComponent onSearch={handleSearch} />
                              {weatherData && (
                                   <WeatherDisplay weatherData={weatherData} unit={unit} toggleUnit={toggleUnit} addToFavorites={addToFavorites} removeFromFavorites={handleRemoveFavorite} isCityFavorite={isCityFavorite} />
                              )}
                              {forecastData && (
                                   <ForecastDisplay forecastData={forecastData} unit={unit} />
                              )}
                         </div>
                    </header>
               </div>
          </div>
     );
};

export default WeatherDashboard;