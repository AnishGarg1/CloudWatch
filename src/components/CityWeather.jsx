import React, { useEffect, useState } from 'react'
import WeatherInfo from './WeatherInfo';
import { fetchForecastWeather, fetchWeather } from '../utils/geoMap';

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
                setForecastedWeather(data);
            } catch (error) {
                console.log("Error:", error);
            }
            
            setLoadingForecast(false);
        }
        fetchData();
    }, [lat, lon])

  return (
    <div className='mt-4'>
        {loading || loadingForecast ? (
            <div>
                <div className='spinner'></div>
            </div>
        ) : 
        cityWeather && forecastedWeather && (
            <div className=''>
                <p>
                    City: {" "}{name},{" "}{country}
                </p>
                <WeatherInfo weatherData={cityWeather} forecastedWeatherData={forecastedWeather}/>
          </div>
        )}
    </div>
  )
}

export default CityWeather