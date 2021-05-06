import cardsReducer from "./cardsReducer/cardsReducer";
import {combineReducers} from "redux";
import authReducer from "./authReducer/authReducer";

export default combineReducers({
    cards: cardsReducer,
    auth: authReducer
})