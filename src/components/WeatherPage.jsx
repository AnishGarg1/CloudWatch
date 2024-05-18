import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import { fetchWeather } from '../utils/fetchWeather';

const WeatherPage = ({lat, lon}) => {
    const [loading, setLoading] = useState(false);
    const [cityWeather, setCityWeather] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const data = await fetchWeather(lat, lon);
                setCityWeather(data)
            } catch (error) {
                console.log("Error:", error)
            }
        }

        fetchData();
        setLoading(false);
    }, [])

  return (
    <div>
        <WeatherCard weatherData={cityWeather}/>
    </div>
  )
}

export default WeatherPage