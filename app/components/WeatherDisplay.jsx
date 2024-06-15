"use client";
import React, { useState, useEffect } from 'react';
import { MdFavorite } from "react-icons/md";

const WeatherDisplay = ({ weatherData, unit, toggleUnit, addToFavorites, removeFromFavorites, isCityFavorite }) => {
     const { name, main, weather } = weatherData;
     const [isFavorite, setIsFavorite] = useState(isCityFavorite);

     useEffect(() => {
          setIsFavorite(isCityFavorite);
     }, [isCityFavorite]);

     const handleFavoriteClick = async () => {
          try {
               if (isFavorite) {
                    await removeFromFavorites(name);
               } else {
                    await addToFavorites(name);
               }
               setIsFavorite(!isFavorite);
          } catch (error) {
               console.error('Error toggling favorite:', error);
          }
     };

     return (
          <div className="bg-gray-700 text-white p-4 rounded-md mt-8 shadow-inner">
               <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <div className="flex items-center">
                         <button onClick={toggleUnit} className="text-gray-400 hover:text-gray-200 focus:outline-none">
                              {unit === 'metric' ? '°C' : '°F'}
                         </button>
                         <button onClick={handleFavoriteClick} className="ml-2 focus:outline-none">
                              <MdFavorite className="h-6 w-6" fill={isFavorite ? 'red' : 'white'} />
                         </button>
                    </div>
               </div>
               <div className="flex items-center">
                    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={weather[0].description} className="w-12 h-12 mr-2" />
                    <div className="flex flex-col">
                         <p className="text-lg">{Math.round(main.temp)}°</p>
                         <p className="text-sm text-gray-400">{weather[0].description}</p>
                    </div>
               </div>
          </div>
     );
};

export default WeatherDisplay;
