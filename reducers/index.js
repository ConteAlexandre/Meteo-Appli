import {combineReducers} from "redux";
import {WeatherReducer} from "./wheather";


const rootReducer = combineReducers({
    weather: WeatherReducer
})

export default rootReducer;