//Ce fichier index, va nous permettre de définir des noms pour les reducers défini et de pouvoir
// ensuite les utilise dans notre librairies redux et de les combiner

//En important ce composant du package redux, nous pouvons utiliser plusieurs reducers et du coup avoir la main mise
import {combineReducers} from "redux";

//Ici nous importons le reducer que nous utilisons pour récupérer les données de temps pour la ville
import {WeatherReducer} from "./wheather";

//Ceci est le reducer pour l'authetification Facebook
import AuthentificationReducer from "./authentification";

//Nous établissons une constante qui utilise combineReducers, si nous ajoutons d'autre reducers par la suite alors
// nous devons les ajouter dans celle ci
const rootReducer = combineReducers({

    //Nous établissons donc les reducers avec leurs nom et quel composant
    weather: WeatherReducer,
    authentification : AuthentificationReducer
})

//Puis nous l'exportons pour l'appeler ensuite dans le store
export default rootReducer;