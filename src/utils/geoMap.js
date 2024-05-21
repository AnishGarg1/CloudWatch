import axios from 'axios';

export const fetchWeather = async (lat, lon) => {
    try {
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; 
        const response = await axios(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        return response.data;
    } catch (error) {
        console.log("Error:", error);
    }
}

export const fetchCityInfo = async (lat, lon) => {
    try {
        const API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY; 
        const response = await axios(
            `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`
        )
        return response.data;
    } catch (error) {
        console.log("Error:", error);
    }
}

export const fetchForecastWeather = async (lat, lon) => {
    try {
        const API_KEY = process.env.REACT_APP_WEATHER_API_API_KEY
        const days = 10;
        const response = await axios(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&aqi=yes&alerts=yes`
        )
        // console.log("response", response);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
    }
}