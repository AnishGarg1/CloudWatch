import React from 'react'

const WeatherCard = ({weatherData}) => {
    // console.log("Weather Data", weatherData);
  return (
    <div>
        Current Weather: {" "}
        <h1 className='inline'>{weatherData.main.temp}</h1>
    </div>
  )
}

export default WeatherCard