"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'animate.css';
import Notiflix from 'notiflix';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Notiflix.Loading.remove();
      router.push('/weather');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-400 mb-4">Welcome to Weather Forecast</h1>
        <p className="text-lg text-gray-500 mb-8">Your go-to app for weather forecasts</p>
        <button onClick={handleClick} disabled={loading}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}  >
          {loading ? 'Loading...' : 'Go to Dashboard'}
        </button>
      </header>
    </div>
  );
};

export default Home;
