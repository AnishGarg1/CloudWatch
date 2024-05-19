import React, { useEffect, useState } from 'react'
import { fetchCityInfo, fetchForecastWeather, fetchWeather } from '../utils/geoMap';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { MdMyLocation } from "react-icons/md";
import { setShowUserWeather } from '../redux/slices/weatherSlice';
import ForecastWeather from './ForecastWeather';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  // const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { showUserWeather } = useSelector((state) => state.weather);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();
  
  // Store into localstorage
  const setUserAddress = async (coordinates) => {
    localStorage.setItem("lat", coordinates.latitude);
    localStorage.setItem("lon", coordinates.longitude);

    const address = await fetchCityInfo(coordinates.latitude, coordinates.longitude);
    if(address){
      localStorage.setItem("address", JSON.stringify(address.address))
    }
  }

  useEffect(() => {
    const handleSuccess = async (location) => {
      // setCoordinates(location.coords);
      setUserAddress(location.coords);
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
        const address = JSON.parse(localStorage.getItem("address"))
        setAddress(address);
        
        if(!latitude || !longitude || !address){
          return
        }
  
        try {
          const data = await fetchWeather(latitude, longitude);
          setCurrentWeather(data);
        } catch (error) {
          console.log("Error", error);
        }
        
        setLoading(false)
      }
      
      fetchData();
    }, [])
    
  const handleClickLocation = () => {
    dispatch(setShowUserWeather(true))
  }
  
  // Forecast Weather Info
  const [forecastedWeather, setForecastedWeather] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingForecast(true);

      const latitude = localStorage.getItem("lat");
      const longitude = localStorage.getItem("lon");
  
      if(!latitude || !longitude){
        return;
      }
      
      try {
        const data = await fetchForecastWeather(latitude, longitude);
          setForecastedWeather(data.forecast.forecastday);
      } catch (error) {
          console.log("Error:", error);
      }

      setLoadingForecast(false);
    }

      fetchData();
  }, [])
  
  return (
    <div>
      <h1>Home Page</h1>
      <span>
        <MdMyLocation
          onClick={() => handleClickLocation()}
        />
      </span>
      <SearchBar/>
      {loading || loadingForecast ? (
        <div>Loading...</div>
      ) : (
        currentWeather && showUserWeather && forecastedWeather && <div>
          <p>{address.county}, {address.state}, {address.country}</p>
          <WeatherCard weatherData={currentWeather}/>
          <ForecastWeather forecastWeatherInfo={forecastedWeather}/>
        </div>)
      }
    </div>
  )
}

export default Home