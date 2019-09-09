import {SET_CURRENT_WEATHER, SET_FORECAST_WEATHER} from "../actions/actionstypes";

const initialState = {
    CurrentWeather: undefined
}
export function WeatherReducer(state = initialState, action) {
    if (action.type === SET_CURRENT_WEATHER) {
        return {
            ...state,
            CurrentWeather: action.payload
        }
    }else if (action.type === SET_FORECAST_WEATHER) {
        return {
            ...state,
            ForecastWeather: action.payload
        }
    }

    return state
}