import React, { useEffect, useState } from 'react'
import { fetchWeather } from '../utils/fetchWeather';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  
  useEffect(() => {
    const handleSuccess = async (location) => {
      setLoading(true);

      const { latitude, longitude } = location.coords;

      try {
        const data = await fetchWeather(latitude, longitude);
        setCurrentWeather(data);
      } catch (error) {
        console.log("Error", error);
      }
      
      setLoading(false)
    }
    

    const handleError = (error) => {
      console.log("Error:", error);
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [])
  
  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar/>
      {loading ? (
        <div>Loading...</div>
      ) : (
        currentWeather && <WeatherCard weatherData={currentWeather}/>)
      }
    </div>
  )
}

export default Home