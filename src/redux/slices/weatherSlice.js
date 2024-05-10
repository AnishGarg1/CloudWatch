import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weatherInfo: null,
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        initialize: {
            weatherInfo: null,
        },
    }
})

export const { initialize } = weatherSlice.actions;
export default weatherSlice.reducer;