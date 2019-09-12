import {FACEBOOK_LOGIN_ERROR, FACEBOOK_LOGIN_SUCCESS} from "../actions/actionstypes";

const initialstate = {
    token : undefined
}

export default function AuthentificationReducer( state = initialstate, action ) {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS :
            return {
                token: action.payload
            }

        case FACEBOOK_LOGIN_ERROR :
            return {
                token: undefined
            }

        default:
            return state;
    }
}