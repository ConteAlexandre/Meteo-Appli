import {combineReducers} from "redux";
import {WeatherReducer} from "./wheather";
import AuthentificationReducer from "./authentification";


const rootReducer = combineReducers({
    weather: WeatherReducer,
    authentification : AuthentificationReducer
})

export default rootReducer;