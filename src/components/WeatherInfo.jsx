import React from 'react'
import ForecastWeather from "./ForecastWeather"

const WeatherInfo = ({weatherData, forecastedWeatherData}) => {
    // console.log("Weather Data", weatherData);
    // console.log("Forecast Weather Data", forecastedWeatherData);
  return (
    <div className='border-2 border-blue-50'>
      <div>
        Current Weather: {" "}
        <h1 className='inline'>{weatherData.main.temp}</h1>
      </div>
      <div>
        <ForecastWeather forecastWeatherInfo={forecastedWeatherData.forecast.forecastday}/>
      </div>
    </div>
  )
}

export default WeatherInfo