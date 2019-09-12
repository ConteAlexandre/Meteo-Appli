import axios from "axios";
import {API_KEY} from "../constant";
import {FACEBOOK_LOGIN_ERROR, FACEBOOK_LOGIN_SUCCESS, SET_CURRENT_WEATHER, SET_FORECAST_WEATHER} from "./actionstypes";
import * as Facebook from "expo-facebook";
import {AsyncStorage} from "react-native";

const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";


export const getCurrentWeatherByCity = city =>
    async dispatch => {
        const response = await axios.get(`${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
        dispatch({ type: SET_CURRENT_WEATHER, payload: response.data })
    }

export const getForecastWeatherByCity = city =>
    async dispatch => {
        const response = await axios.get(`${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
        dispatch({ type: SET_FORECAST_WEATHER, payload: response.data })
    }

export const facebookLogin = (onSucces, onError) => dispatch => {
    Facebook.logInWithReadPermissionsAsync(378196729748045, {
        permission: ["public_profil"]
    }).then(fbResponse => {
        if (fbResponse.type === "success") {
            //Dispatcher success fbResponse.token
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload : fbResponse.token })
            AsyncStorage.setItem("fbtoken", fbResponse.token)
            console.log(fbResponse)
            onSucces && onSucces();
        } else {
            //Dispatcher erreur
            dispatch({ type: FACEBOOK_LOGIN_ERROR })
            onError && onError();
        }
    }).catch( error => {
        //Si eereur au niveau api dispatcher erreur aussi
        dispatch({ type: FACEBOOK_LOGIN_ERROR })
        onError && onError();
    })
}
