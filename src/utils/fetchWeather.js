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