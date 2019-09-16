//Voici notr fichier qui permet de créer la librairie redux pour l'api

//Nous importons les composants necessaires de redux
import {createStore, applyMiddleware} from "redux";

//Importation de composants pour renforcer notre librairies
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

//importation de nos reducers qui ont été définis dans index.js
import reducers from "./reducers";

//Ici on applique le renforcement de notre librairies
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

//Création de notre librairies
const store = createStore(reducers, {}, composedEnhancer);

//Exportation
export default store;
