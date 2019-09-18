//Ceci est le fichier initial pour les actions, c'est ici que l'on définit et auquel on donne le nom qui a été
//défini dans le fichier actiontypes.js

//Voici le package axios, celui nous permet de faire des requetes http au sein de notre api
import axios from "axios";

//Ici on importante une constante qui a défini dans un fichier où tout est regroupé
import {API_KEY} from "../constant";

//Voici les actions que l'on a défini dans le fichier actiontypes.js
import {FACEBOOK_LOGIN_ERROR, FACEBOOK_LOGIN_SUCCESS, SET_CURRENT_WEATHER, SET_FORECAST_WEATHER} from "./actionstypes";

//Package Facebook qui nous permet d'utiliser la connexion par facebook sur l'api
import * as Facebook from "expo-facebook";

//Package nous permettant de stocker des données au sein de l'api
import {AsyncStorage} from "react-native";

//Ici on défini les urls de l'api weather qui va nous permettres de récupérer les données à exploiter
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";


//Ceci est une action qui va nous permettre de récupérer les données de l'api selon l'url avec les paramètres dans l'url
//city est le paramètre qui doit être donner par défaut sinon l'action ne fonctionnera pas
export const getCurrentWeatherByCity = city =>

    //Ensuite on défini une fonction pour nous permettre de récupérer la réponse de l'url par l'api weather
    async rutel => {

        //Nous définissons la réponse en utilisant axios qui permet de faire appel à des urls, puis l'url demande des
        //paramètres qui sont la ville ${city}, puis notre constante ${API_KEY} qui nous permet d'utiliser l'api correctement
        const response = await axios.get(`${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);
        // console.log(response)

        //Ici nous définissons les propriétés de dispatch
        rutel({ type: SET_CURRENT_WEATHER, payload: response.data })
    };

//Cet action nous permet de récupérer les détails de plusieurs jours pour une ville spécifique, grâce à une url
//différentes de l'api.
export const getForecastWeatherByCity = city =>

    //Ensuite nous définissons une fonction nous permettant de récupérer une réponse avec le package axios et l'url
//de l'api et les différents paramètres qui la constitue
    async dispatch => {

    //Nous définissons la constante réponse pour pouvoir utiliser les données par la suite,
        //les paramètres sont toujours les mêmes avec notre ville et notre clé api
        const response = await axios.get(`${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`);

        //Nous établissons les propriétés de notre fonction avec son type et quelles sont les données(payload)
        dispatch({ type: SET_FORECAST_WEATHER, payload: response.data })
    };

//voici l'action qui va nous permettre de se loger via notre compte facebook, du coup nous avons du au préalable créer
//une api facebook sur leur site de devéloppeur pour avoir une id. Ici on lui donne deux paramètres (onSuccess et onError)
export const facebookLogin = (onSucces, onError) => dispatch => {

    //On fait appel à notre package Facebook et une de ces fonctionnalités qui nous permet de de se connecter et de
    //savoir si ce compte existe, d'enregistrer un token et d'autoriser l'api a accéder au profil de l'utilisateurs
    Facebook.logInWithReadPermissionsAsync(378196729748045, {

        //Ceci est une option qui autorise un certain niveau de permission, on a soit public_profil soit email
        permission: ["public_profil"]

        //Maintenant nous établissons les règles et le déroulement de l'action
    }).then(fbResponse => {

        //Si la réponse est ok, alors on suit le processus normal
        if (fbResponse.type === "success") {

            //On appel notre fonction de stockage token dans le store et on met en paramètre notre token si success
            setToken(fbResponse.token)

            //Ici on utilise la donnée isolé juste au dessus pour sauvegarder le token dans le storage de l'api
            AsyncStorage.setItem("fbtoken", fbResponse.token)
            // console.log(fbResponse)

            //Ici on défini notre paramètre onSuccess en fonction pour permettre de lancer la procédure et ne pas juste
            //s'arreter a un message de success
            onSucces && onSucces();

            //Si la connexiono n'as pas abouti, alors on execute l'action FACEBOOK_LOGIN_ERROR
        } else {

            //On définit juste le type d'erreur et aucune données car cela est inutile
            //Dispatcher erreur
            dispatch({ type: FACEBOOK_LOGIN_ERROR })

            //Ici on défini notre paramètre onError en fonction pour permettre de lancer la procédure et ne pas juste
            //s'arreter a un message d'erreur
            onError && onError();
        }
    }).catch( error => {
        //Si eereur au niveau api dispatcher erreur aussi
        dispatch({ type: FACEBOOK_LOGIN_ERROR })
        onError && onError();
    })
}

//Petit fonction qui va nous permettre de stocker le token dans le store lorsque l'on arrive sur l'API
export const setToken = (token) => dispatch => {
    //On dispatch l'action pour nous permettre d'enregistrer les données dans un payload que l'on puisse réutiliser après
    //Dispatcher success fbResponse.token
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload : token })
}
