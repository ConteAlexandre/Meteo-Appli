import {SET_CURRENT_WEATHER} from "../actions/actionstypes";

const initialState = {
    CurrentWeather: undefined
}
export function WeatherReducer(state = initialState, action) {
    if (action.type === SET_CURRENT_WEATHER) {
        return {
            CurrentWeather: action.payload
        }
    }

    return state
}