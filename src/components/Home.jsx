import React, { useEffect, useState } from 'react'
import { fetchWeather } from '../utils/fetchWeather';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  
  useEffect(() => {
    const handleSuccess = async (location) => {
      setCoordinates(location.coords);
    }

    const handleError = (error) => {
      console.log("Error:", error);
    }

    // const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);
    // return () => {
    //   navigator.geolocation.clearWatch(watchId)
    // };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [])

  useEffect(() => {
      const fetchData = async () => {
        if(!coordinates){
          return
        }
        
        setLoading(true);
        const { latitude, longitude } = coordinates;
  
        try {
          const data = await fetchWeather(latitude, longitude);
          setCurrentWeather(data);
        } catch (error) {
          console.log("Error", error);
        }
      }

      fetchData();
      setLoading(false)
  }, [coordinates])
  
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