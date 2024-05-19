import axios from 'axios';

export const fetchWeather = async (lat, lon) => {
    try {
        const API_KEY = 'bf1e9e852b7d7a4f904d7913f2707bc2'; 
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
        const API_KEY = 'pk.672dd60bd8d342502c352b6ac84597d4'; 
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
        const API_KEY = '445ba119da654dcf83480050241805'
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