import {SET_CURRENT_WEATHER} from "../actions/actionstypes";

export function WeatherReducer(state, action) {
    if (action.type === SET_CURRENT_WEATHER) {
        return {
            data: action.payload
        }
    }

    return state
}