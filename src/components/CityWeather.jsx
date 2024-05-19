import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import { fetchForecastWeather, fetchWeather } from '../utils/geoMap';
import ForecastWeather from './ForecastWeather';

const CityWeather = ({ name, country, lat, lon}) => {
    const [loading, setLoading] = useState(false);
    const [loadingForecast, setLoadingForecast] = useState(false);
    const [cityWeather, setCityWeather] = useState(null);
    const [forecastedWeather, setForecastedWeather] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchWeather(lat, lon);
                setCityWeather(data)
            } catch (error) {
                console.log("Error:", error)
            }
            setLoading(false);
        }

        fetchData();
    }, [lat, lon])

    useEffect(() => {
        const fetchData = async () => {
            setLoadingForecast(true);
            
            try {
                const data = await fetchForecastWeather(lat, lon);
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
        {loading || loadingForecast ? (
            <div>Loading...</div>
        ) : 
        cityWeather && forecastedWeather && (
            <div className='bg-blue-400'>
                <p>
                    City: {" "}{name},{" "}{country}
                </p>
                <WeatherCard weatherData={cityWeather}/>
                <ForecastWeather forecastWeatherInfo={forecastedWeather}/>
          </div>
        )}
    </div>
  )
}

export default CityWeather