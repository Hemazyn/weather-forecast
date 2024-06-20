# Weather Info & Forecast
Welcome to the Weather Info & Forecast web application. This project provides users with real-time weather information and forecasts for their selected cities. Users can also mark cities as favorites for quick access to weather data.

## Table of Contents
- [Preview](#preview)
- [Links](#links)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [APIs Used](#apis-used)
- [Public Info](#public-info)
- [Acknowledgments](#acknowledgments)

### Preview
![](/public/preview.png)

### Links

- Solution URL: [Github Repository](https://github.com/Hemazyn/weather-forecast)
- Live Site URL: [Vercel Link](https://wforecast.vercel.app/)

### Features
- Search Weather Data: Users can search for current weather and forecast information by city name.
- Favorite Cities: Users can add cities to their favorites list and easily access weather data for these cities.
- Temperature Unit Conversion: Users can switch between Celsius and Fahrenheit.
- Responsive Design: The application is designed to be responsive and user-friendly on various devices.

### Technologies Used
- Frontend: React, Next.js, Tailwind CSS
- API Integration: Axios for making API requests
- State Management: React hooks for managing state
- Notifications: Notiflix for displaying notifications

### Installation
To run this project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Hemazyn/weather-forecast.git
cd weather-info-forecast
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:

Create a .env.local file in the root directory and add your OpenWeatherMap API key:
```bash
NEXT_PUBLIC_WEATHER_APP_ID=your_openweathermap_api_key
```
4. Run the development server:
```bash
npm run dev
```
5. Open your browser and navigate to http://localhost:3000.

Usage
- Search for Weather: Use the search bar to enter a city name and fetch current weather and forecast data.
- Add to Favorites: Click the favorite icon next to a city to add it to your favorites list.
- View Favorites: Access your favorite cities from the sidebar and view their weather data.
- Toggle Temperature Units: Click the unit toggle button to switch between Celsius and Fahrenheit.

### Project Structure
```bash
├── 📁app
│   ├── api.js                 # API functions for fetching weather data
│   ├── components
│   │   ├── FavoriteComponent.jsx  # Component for displaying favorite cities
│   │   ├── ForecastDisplay.jsx    # Component for displaying weather forecast
│   │   ├── SearchComponent.jsx    # Search bar component
│   │   ├── WeatherDisplay.jsx     # Component for displaying current weather
│   ├── globals.css            # Global CSS styles
│   ├── layout.js              # Root layout component
│   ├── page.js                # Main page component
│   ├── utils.js               # Utility functions
│   ├── weather
│       └── page.jsx           # Weather page component
├── public
│   ├── next.svg
│   ├── vercel.svg
│   ├── weather.png
├── .env.example               # Example environment variables
├── .env.local                 # Local environment variables
├── .gitignore                 # Git ignore file
├── README.md                  # Project README file
├── jsconfig.json              # JavaScript configuration file
├── next.config.mjs            # Next.js configuration file
├── package-lock.json          # Package lock file
├── package.json               # Package file
├── postcss.config.mjs         # PostCSS configuration file
├── tailwind.config.js         # Tailwind CSS configuration file
```
### APIs Used
- OpenWeatherMap API: Provides weather data and forecasts. - [OpenWeatherMap API](https://openweathermap.org/)
### Public Info
- Website - [Emmanuel Tofumi](https://devemma.netlify.app)
- Twitter - [@imanuel_tofunmi](https://twitter.com/imanuel_tofunmi)

### Acknowledgments
- Special thanks to the creators of [Nextjs](https://nextjs.org/), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com/), and [OpenWeatherMap](https://openweathermap.org).

Feel free to customize the `README.md` as needed to better fit your project specifics and personal preferences.
