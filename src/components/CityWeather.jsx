import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import { fetchWeather } from '../utils/fetchWeather';

const CityWeather = ({ name, country, lat, lon}) => {
    const [loading, setLoading] = useState(false);
    const [cityWeather, setCityWeather] = useState(null);

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


  return (
    <div>
        {loading ? (
            <div>Loading...</div>
        ) : 
        cityWeather && (
            <div className='bg-blue-400'>
                <p>
                    City: {" "}{name},{" "}{country}
                </p>
                <WeatherCard weatherData={cityWeather}/>
          </div>
        )}
    </div>
  )
}

export default CityWeather