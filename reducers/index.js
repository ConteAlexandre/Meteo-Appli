import {combineReducers} from "redux";


const rootReducer = combineReducers({
    todo: () => {
        return {data: "blabla"}
    }
})

export default rootReducer;