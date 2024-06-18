import React from 'react';
import { MdFavorite } from "react-icons/md";

const FavoriteComponent = ({ favoriteCount, unit, isExpanded, toggleExpanded, favoriteCities, handleRemoveFavorite, onFavoriteClick }) => {
     return (
          <div className={`fixed left-0 top-0 transform transition-transform ${isExpanded ? 'translate-x-0 h-screen' : '-translate-x-full h-screen'}`}>
               <div className="w-10 relative">
                    <button onClick={toggleExpanded} className="fixed top-3 left-12 flex flex-row items-start focus:outline-none">
                         <MdFavorite fill="white" size={25} />
                         <span className="text-white text-xs">{favoriteCount}</span>
                    </button>
               </div>
               {isExpanded && (
                    <div className="bg-gray-800 h-full text-white p-4 pt-10 rounded-e-md shadow-lg w-64 overflow-scroll">
                         <h3 className="text-lg mt-5 mb-3 font-semibold text-gray-300">Favorite Cities</h3>
                         <ul>
                              {favoriteCities.map((city, index) => (
                                   <li key={index} className="mb-4 shadow p-3">
                                        <div className="flex items-start justify-between">
                                             <div className="flex flex-col gap-2 cursor-pointer" onClick={() => onFavoriteClick(city.name)}>
                                                  <h4 className="text-gray-200">{city.name}</h4>
                                                  {city.weather && city.weather.length > 0 && (
                                                       <div className="flex items-center">
                                                            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt={city.weather[0].description} className="w-12 h-12 mr-2" />
                                                            <div className="flex flex-col">
                                                                 <p className="text-sm text-gray-400">{city.weather[0].description}</p>
                                                                 <p className="text-lg">{city.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                                                            </div>
                                                       </div>
                                                  )}
                                             </div>
                                             <button onClick={() => handleRemoveFavorite(city.id, city.name)} className="ml-2 focus:outline-none">
                                                  <MdFavorite className="h-6 w-6" fill="red" />
                                             </button>
                                        </div>
                                   </li>
                              ))}
                         </ul>
                    </div>
               )}
          </div>
     );
};

export default FavoriteComponent;