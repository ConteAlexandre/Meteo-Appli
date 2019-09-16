//Voici notre fichier pour définir le reducer Weaher dans le fichier index.js

//Nous importons nos actions qui va le définir
import {SET_CURRENT_WEATHER, SET_FORECAST_WEATHER} from "../actions/actionstypes";

//Ici nous disons que par défaut la météo actuelle est non défini
const initialState = {
    CurrentWeather: undefined
}

//Nous créons notre fonction pour le reducer, on dit que son état par défaut revient à la constante établit plus haut
// et le deuxième paramètres se prénomme action pour suivre la logique de l'api
export function WeatherReducer(state = initialState, action) {

    //Si le type d'action est SET_CURRENT_WEATHER
    if (action.type === SET_CURRENT_WEATHER) {

        //Alors on garde l'état précédent grâce à ...state, puis on y ajoute les données du payload qui ont été
        // défini dans le fichier d'action
        return {
            ...state,
            CurrentWeather: action.payload
        }

        //Sinon si le type d'action est SET_FORECAST_WEATHER
    }else if (action.type === SET_FORECAST_WEATHER) {

        //Alors on garde l'état précédent grâce à ...state, puis on y ajoute ForecastWeather avec le payload qui a été
        // défini dans le fichier action
        return {
            ...state,
            ForecastWeather: action.payload
        }
    }

    //Sinon l'état reste par défaut celui que l'on a defini entre parenthèse
    return state
}