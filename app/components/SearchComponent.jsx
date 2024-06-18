import React, { useState } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';

const SearchComponent = ({ onSearch }) => {
     const [city, setCity] = useState('');

     const handleSubmit = async (event) => {
          event.preventDefault();
          if (city.trim() === '') {
               Notiflix.Notify.warning('Please enter a city name.');
               return;
          }
          Notiflix.Loading.standard();
          const isValidCity = await validateCity(city.trim());
          if (isValidCity) {
               onSearch(city.trim());
               Notiflix.Notify.success('City fetched successfully!');
               setCity("");
          } else {
               Notiflix.Notify.failure('Invalid city name. Please enter a valid city.');
          }
          Notiflix.Loading.remove();
     };

     const validateCity = async (cityName) => {
          const apiKey = process.env.NEXT_PUBLIC_WEATHER_APP_ID;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
          try {
               const response = await axios.get(url);
               if (response.data && response.data.name) {
                    return true;
               } else {
                    return false;
               }
          } catch (error) {
               console.error('Error validating city:', error);
               return false;
          }
     };

     return (
          <>
               <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" className="w-full md:w-3/5 border p-2 rounded focus:outline-none" />
                    <button type="submit" className="w-full md:w-2/5 p-2 bg-blue-500 text-white rounded">Search</button>
               </form>
          </>
     );
};

export default SearchComponent;