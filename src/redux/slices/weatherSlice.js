import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weatherInfo: null,
    showUserWeather: true,
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        initialize(state, value) {
            state.weatherInfo = null;
        },
        setShowUserWeather(state, value) {
            state.showUserWeather = value.payload;
        }
    }
})

export const { initialize, setShowUserWeather } = weatherSlice.actions;
export default weatherSlice.reducer;