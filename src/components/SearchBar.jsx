import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import CityWeather from './CityWeather';
import { useDispatch, useSelector } from 'react-redux';
import { setShowUserWeather } from '../redux/slices/weatherSlice';
import { MdMyLocation } from 'react-icons/md';
import MapContainer from './MapContainer';

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const { showUserWeather } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const fetchCityData = async (text) => {
    if(!text){
      setCityData([]);
      return;
    }

    setLoading(true);

    try {
      const API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY;
      const response = await axios(
        `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${text}`
      )
      const data = response.data;
      setCityData(data);
      // console.log("City", text)
      // console.log("cities response:", data);
      
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    const delayFn = setTimeout(() => {
      fetchCityData(text);
    }, 300); // set timeout for 300ms

    return () => clearTimeout(delayFn);
    // fetchCityData(text);
  }, [text])

  const handleChange = (value) => {
    setText(value)
    // setSelectedCity(null)
  }

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCityData([])
    setText("")
    dispatch(setShowUserWeather(false))
  }

  const handleClickLocation = () => {
    dispatch(setShowUserWeather(true))
  }

  return (
    // Serach Bar Container
    <div className='w-full relative flex flex-col items-center'>
      <div className='w-10/12 flex justify-center items-center gap-1'>
        <span className=''>
          <MdMyLocation
            className='text-xl cursor-pointer hover:text-teal-500'
            onClick={() => handleClickLocation()}
          />
        </span>
        <div className='w-full relative flex items-center justify-start'>
          <input
            placeholder='Type to search...'
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            className='w-10/12 
            rounded-lg bg-slate-800 p-1 px-2 text-[16px] leading-[10px] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-slate-500 focus:outline-none
            '
          />
          <FaSearch className='text-cyan-500 cursor-pointer hover:text-teal-500 -translate-x-7'/>
        </div>
      </div>
      <div className='absolute translate-x-[-8%] mt-8 w-[68%]'>
        {
          loading ? (
            <div className='w-full flex justify-center items-center bg-slate-900 bg-opacity-95 px-2 py-1 rounded-md'>
              <div className='loader'></div>
            </div>
          ) : (
            <div className={`max-h-32 overflow-y-auto bg-slate-900 px-2 py-1 rounded-md ${cityData.length !== 0 ? "bg-opacity-95": "bg-opacity-0"}`}>
              {cityData.map((city, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectCity(city)}
                  className='cursor-pointer px-2 rounded-sm hover:border'
                >
                  <p className='hover:text-teal-500'>
                    {city.display_name}
                  </p>
                </div>
              ))}
            </div>
          )
        }
      </div>
      {/* Show Selected City Info */}
      {selectedCity && !showUserWeather && (
          <div>
            <CityWeather name={selectedCity.display_name} country={selectedCity.country} lat={selectedCity.lat} lon={selectedCity.lon}/>
            <MapContainer lat={selectedCity?.lat} lon={selectedCity?.lon}/>
          </div>
      )}
    </div>
  )
}

export default SearchBar