import cardsReducer from "./cardsReducer/cardsReducer";
import {combineReducers} from "redux";

export default combineReducers({
    cards: cardsReducer
})