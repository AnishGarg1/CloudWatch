import React, { useEffect, useState } from 'react'
import { fetchWeather } from '../utils/fetchWeather';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdMyLocation } from "react-icons/md";
import { setShowUserWeather } from '../redux/slices/weatherSlice';

const Home = () => {
  const [loading, setLoading] = useState(false);
  // const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { showUserWeather } = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  
  // Store into localstorage
  const setLocalCoordinates = (coordinates) => {
    localStorage.setItem("lat", coordinates.latitude);
    localStorage.setItem("lon", coordinates.longitude);
  }

  useEffect(() => {
    const handleSuccess = async (location) => {
      // setCoordinates(location.coords);
      setLocalCoordinates(location.coords);
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
        // if(!coordinates){
        //   return
        // }
        
        setLoading(true);
        // const { latitude, longitude } = coordinates;
        
        const latitude = localStorage.getItem("lat");
        const longitude = localStorage.getItem("lon");
        if(!latitude || !longitude){
          return
        }
  
        try {
          const data = await fetchWeather(latitude, longitude);
          setCurrentWeather(data);
        } catch (error) {
          console.log("Error", error);
        }
      }

      fetchData();
      setLoading(false)
  }, [])

  const handleClickLocation = () => {
    dispatch(setShowUserWeather(true))
  }
  
  return (
    <div>
      <h1>Home Page</h1>
      <span>
        <MdMyLocation
          onClick={() => handleClickLocation()}
        />
      </span>
      <SearchBar/>
      {loading ? (
        <div>Loading...</div>
      ) : (
        currentWeather && showUserWeather && <WeatherCard weatherData={currentWeather}/>)
      }
    </div>
  )
}

export default Home