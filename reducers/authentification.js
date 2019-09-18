//Il faut savoir que les reducers, permettent de savoir comment les états changents et donc ensuite de transmettre
// ces infos aux actions. On dit une action doit forcément avoir un reducer

//On importe donc les actions qui vont être utilisées pour ce reducer
import {FACEBOOK_LOGIN_ERROR, FACEBOOK_LOGIN_SUCCESS} from "../actions/actionstypes";

//Ici on initialise une constante pour dire que le token de base est indéfini
const initialstate = {
    token : undefined
}

//On exporte donc ce reducer pour l'utiliser dans notre API, on dit que notre état par défaut est donc un token
// indéfini. Puis notre deuxième paramètre va récupérer les valeurs défini dans notre fichier actiontypes.js
export default function AuthentificationReducer( state = initialstate, action ) {

    //La fonction switch nous permet d'évaluer une expression qui est dans ce cas la action.type
    switch (action.type) {

        //Si notre action.type correspond au success
        case FACEBOOK_LOGIN_SUCCESS :

            //Alors on retourne un token enregistré
            return {
                token: action.payload
            }

            //Si notre action.type correspond à une erreur
        case FACEBOOK_LOGIN_ERROR :

            //Alors on retourne un token indéfini
            return {
                token: undefined
            }

            //Sinon par défaut notre état est tel que l'on la défini au début
        default:
            return state;
    }
}