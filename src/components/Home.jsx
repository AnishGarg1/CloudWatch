import React, { useEffect, useState } from 'react'
import { fetchCityInfo, fetchForecastWeather, fetchWeather } from '../utils/geoMap';
import WeatherInfo from './WeatherInfo';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
// import { MdMyLocation } from "react-icons/md";
// import { setShowUserWeather } from '../redux/slices/weatherSlice';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  // const [coordinates, setCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const { showUserWeather } = useSelector((state) => state.weather);
  const [address, setAddress] = useState(null);
  // const dispatch = useDispatch();
  
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
          setForecastedWeather(data);
      } catch (error) {
          console.log("Error:", error);
      }

      setLoadingForecast(false);
    }

      fetchData();
  }, [])
  
  return (
    <div className='border w-full border-l-cyan-200 animated-box rounded-lg px-7 py-5 flex flex-col justify-center items-center'>
      {/* <h1>Home Page</h1> */}
      <SearchBar/>
      {loading || loadingForecast ? (
        <div>
          <div className='spinner'></div>
        </div>
      ) : (
        currentWeather && showUserWeather && forecastedWeather && 
        <div className='mt-4'>
          <p>{address.county}, {address.state}, {address.country}</p>
          <WeatherInfo weatherData={currentWeather} forecastedWeatherData={forecastedWeather}/>
        </div>)
      }
    </div>
  )
}

export default Home