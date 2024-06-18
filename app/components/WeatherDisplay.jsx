import React, { useState, useEffect } from 'react';
import { MdFavorite } from "react-icons/md";
import Notiflix from 'notiflix';

const WeatherDisplay = ({ weatherData, unit, toggleUnit, addToFavorites, removeFromFavorites, isCityFavorite }) => {
     const { id, name, main, weather } = weatherData;
     const [isFavorite, setIsFavorite] = useState(isCityFavorite(name));
     const [error, setError] = useState(null);

     useEffect(() => {
          setIsFavorite(isCityFavorite(name));
     }, [isCityFavorite, name]);

     const handleFavoriteClick = async () => {
          try {
               Notiflix.Loading.standard('Processing...');
               if (isFavorite) {
                    await removeFromFavorites(id, name);
                    Notiflix.Notify.success('Removed from favorites');
               } else {
                    await addToFavorites({ id, name, main, weather });
                    Notiflix.Notify.success('Added to favorites');
               }
               setIsFavorite(!isFavorite);
               Notiflix.Loading.remove();
          } catch (error) {
               setError('Error toggling favorite. Please try again.');
               Notiflix.Loading.remove();
               Notiflix.Notify.failure('Failed to update favorites');
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