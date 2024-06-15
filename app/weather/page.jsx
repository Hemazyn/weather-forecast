// "use client"
// import React, { useState, useEffect } from 'react';
// import SearchComponent from '../components/SearchComponent';
// import WeatherDisplay from '../components/WeatherDisplay';
// import FavoriteComponent from '../components/FavoriteComponent';
// import ForecastDisplay from '../components/ForecastDisplay';
// import { getFavoriteCities, addFavoriteCity, deleteFavoriteCity, fetchWeatherData } from '../api';

// const WeatherDashboard = () => {
//      const [weatherData, setWeatherData] = useState(null);
//      const [forecastData, setForecastData] = useState(null);
//      const [unit, setUnit] = useState('metric');
//      const [favoriteCount, setFavoriteCount] = useState(0);
//      const [favoriteCities, setFavoriteCities] = useState([]);
//      const [isExpanded, setIsExpanded] = useState(false);

//      useEffect(() => {
//           fetchFavoriteCities();
//      }, []);

//      const fetchFavoriteCities = async () => {
//           const favorites = await getFavoriteCities();
//           setFavoriteCities(favorites);
//           setFavoriteCount(favorites.length);
//      };

//      const handleSearch = async (city) => {
//           try {
//                const { currentWeather, forecast } = await fetchWeatherData(city);
//                setWeatherData(currentWeather);
//                setForecastData(forecast);
//           } catch (error) {
//                console.error('Error fetching weather data:', error);
//           }
//      };

//      const convertTemperature = (temp, fromUnit, toUnit) => {
//           if (fromUnit === 'metric' && toUnit === 'imperial') {
//                return (temp * 9 / 5) + 32;
//           } else if (fromUnit === 'imperial' && toUnit === 'metric') {
//                return (temp - 32) * 5 / 9;
//           }
//           return temp;
//      };

//      const toggleUnit = () => {
//           const newUnit = unit === 'metric' ? 'imperial' : 'metric';
//           if (weatherData) {
//                setWeatherData({
//                     ...weatherData,
//                     main: {
//                          ...weatherData.main,
//                          temp: convertTemperature(weatherData.main.temp, unit, newUnit)
//                     }
//                });
//           }

//           if (forecastData) {
//                setForecastData({
//                     ...forecastData,
//                     list: forecastData.list.map(item => ({
//                          ...item,
//                          main: {
//                               ...item.main,
//                               temp: convertTemperature(item.main.temp, unit, newUnit)
//                          }
//                     }))
//                });
//           }
//           setUnit(newUnit);
//      };

//      const addToFavorites = async (cityName, shouldAdd) => {
//           const isFavorite = favoriteCities.some(city => city.name === cityName);

//           if (!isFavorite && shouldAdd) {
//                await addFavoriteCity({ name: cityName });
//                setFavoriteCount(prevCount => prevCount + 1);
//           } else if (isFavorite && !shouldAdd) {
//                await deleteFavoriteCity(cityName);
//                setFavoriteCount(prevCount => prevCount - 1);
//           }
//           fetchFavoriteCities();
//      };

//      const toggleExpanded = () => {
//           setIsExpanded(!isExpanded);
//      };

//      const removeFromFavorites = async (cityName) => {
//           try {
//                await deleteFavoriteCity(cityName);
//                setFavoriteCount(prevCount => prevCount - 1);
//                fetchFavoriteCities(); // Refresh favorite cities after deletion
//           } catch (error) {
//                console.error('Error removing from favorites:', error);
//           }
//      };

//      return (
//           <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center px-5">
//                <FavoriteComponent favoriteCount={favoriteCount} isExpanded={isExpanded} toggleExpanded={toggleExpanded} favoriteCities={favoriteCities} />
//                <header className="text-center pt-10">
//                     <h1 className="text-3xl md:text-5xl font-bold text-gray-400 mb-4">Welcome to Weather Dashboard</h1>
//                     <p className="text-lg text-gray-500 mb-8">Your go-to app for weather forecasts & info</p>
//                     <div className="container mx-auto px-4 py-8 mb-10 shadow bg-gray-800 rounded-md">
//                          <SearchComponent onSearch={handleSearch} />
//                          {weatherData && (
//                               <WeatherDisplay
//                                    weatherData={weatherData}
//                                    unit={unit}
//                                    toggleUnit={toggleUnit}
//                                    addToFavorites={addToFavorites}
//                                    removeFromFavorites={removeFromFavorites}
//                                    isCityFavorite={favoriteCities.some(city => city.name === weatherData.name)}
//                               />
//                          )}
//                          {forecastData && (
//                               <ForecastDisplay forecastData={forecastData} unit={unit} />
//                          )}
//                     </div>
//                </header>
//           </div>
//      );
// };

// export default WeatherDashboard;

"use client";
import React, { useState, useEffect } from 'react';
import SearchComponent from '../components/SearchComponent';
import WeatherDisplay from '../components/WeatherDisplay';
import FavoriteComponent from '../components/FavoriteComponent';
import ForecastDisplay from '../components/ForecastDisplay';
import { getFavoriteCities, addFavoriteCity, deleteFavoriteCity, fetchWeatherData } from '../api';

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
          const favorites = await getFavoriteCities();
          setFavoriteCities(favorites.map(city => ({ ...city, isFavorite: true }))); // Initialize isFavorite property
          setFavoriteCount(favorites.length);
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
                    ...weatherData,
                    main: {
                         ...weatherData.main,
                         temp: convertTemperature(weatherData.main.temp, unit, newUnit)
                    }
               });
          }

          if (forecastData) {
               setForecastData({
                    ...forecastData,
                    list: forecastData.list.map(item => ({
                         ...item,
                         main: {
                              ...item.main,
                              temp: convertTemperature(item.main.temp, unit, newUnit)
                         }
                    }))
               });
          }
          setUnit(newUnit);
     };

     const addToFavorites = async (cityName, shouldAdd) => {
          const isFavorite = favoriteCities.some(city => city.name === cityName);

          if (!isFavorite && shouldAdd) {
               await addFavoriteCity({ name: cityName });
               setFavoriteCities(prevCities => [...prevCities, { name: cityName, isFavorite: true }]);
               setFavoriteCount(prevCount => prevCount + 1);
          } else if (isFavorite && !shouldAdd) {
               await deleteFavoriteCity(cityName);
               setFavoriteCities(prevCities => prevCities.filter(city => city.name !== cityName));
               setFavoriteCount(prevCount => prevCount - 1);
          }
     };

     const toggleExpanded = () => {
          setIsExpanded(!isExpanded);
     };

     const handleRemoveFavorite = async (cityName) => {
          await deleteFavoriteCity(cityName);
          setFavoriteCities(prevCities => prevCities.filter(city => city.name !== cityName));
          setFavoriteCount(prevCount => prevCount - 1);
     };

     return (
          <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center px-5">
               <FavoriteComponent favoriteCount={favoriteCount} isExpanded={isExpanded} toggleExpanded={toggleExpanded} favoriteCities={favoriteCities} handleRemoveFavorite={handleRemoveFavorite} />
               <header className="text-center pt-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-400 mb-4">Welcome to Weather Dashboard</h1>
                    <p className="text-lg text-gray-500 mb-8">Your go-to app for weather forecasts & info</p>
                    <div className="container mx-auto px-4 py-8 mb-10 shadow bg-gray-800 rounded-md">
                         <SearchComponent onSearch={handleSearch} />
                         {weatherData && (
                              <WeatherDisplay weatherData={weatherData} unit={unit} toggleUnit={toggleUnit} addToFavorites={addToFavorites} isCityFavorite={favoriteCities.some(city => city.name === weatherData.name)} />
                         )}
                         {forecastData && (
                              <ForecastDisplay forecastData={forecastData} unit={unit} />
                         )}
                    </div>
               </header>
          </div>
     );
};

export default WeatherDashboard;
