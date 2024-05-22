import React, { useEffect, useState } from 'react'

const ForecastWeather = ({ forecastWeatherInfo }) => {
    // console.log("forecast weather:",forecastWeatherInfo)
    
  return (
    <div className='m-3 flex w-full max-w-4xl flex-wrap-reverse gap-2'>
        {forecastWeatherInfo.map((info, index) => (
            <div
                key={index} 
                className='border border-black max-w-xs rounded-md p-2 bg-slate-700 bg-opacity-80'
            >
                {info.date}{" => "}{info.day.maxtemp_c}
            </div>
        ))}
    </div>
  )
}

export default ForecastWeather