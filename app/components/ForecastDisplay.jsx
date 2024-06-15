import React from 'react';
import { convertTimeTo12HourFormat } from '../utils';

const ForecastDisplay = ({ forecastData, unit }) => {
     const { list } = forecastData;

     return (
          <div className="bg-gray-700 text-white p-4 rounded-md mt-8 shadow-inner">
               <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {list.map((forecast, index) => (
                         <div key={index} className="bg-gray-800 p-4 rounded-md shadow-md">
                              <p>{convertTimeTo12HourFormat(forecast.dt)}</p>
                              <div className="flex items-center">
                                   <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt={forecast.weather[0].description} className="w-12 h-12 mr-2" />
                                   <div className="flex flex-col">
                                        <p className="text-lg">{Math.round(forecast.main.temp)}° {unit === 'metric' ? 'C' : 'F'}</p>
                                        <p className="text-sm text-gray-400">{forecast.weather[0].description}</p>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default ForecastDisplay;