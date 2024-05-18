import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import CityWeather from './CityWeather';
import { useDispatch, useSelector } from 'react-redux';
import { setShowUserWeather } from '../redux/slices/weatherSlice';

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
      const API_KEY = '445ba119da654dcf83480050241805';
      const response = await axios(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${text}`
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
    fetchCityData(text);
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

  return (
    // Serach Bar Container
    <div>
      <div>
        <FaSearch/>
        <input
          placeholder='Type to search...'
          value={text}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className='bg-orange-300'>
            {cityData.map((city, index) => (
              <div 
                key={index}
                onClick={() => handleSelectCity(city)}
                className='bg-amber-200 cursor-pointer hover:bg-green-300 hover:border'
              >
                {city.name}
              </div>
            ))}
          </div>
        )
      }
      {/* Show Selected City Info */}
      {selectedCity && !showUserWeather && (
          <CityWeather name={selectedCity.name} country={selectedCity.country} lat={selectedCity.lat} lon={selectedCity.lon}/>
      )}
    </div>
  )
}

export default SearchBar