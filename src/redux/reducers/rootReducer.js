import menuReducer from "./menuReducer/menuReducer";
import {combineReducers} from "redux";

export default combineReducers({
    menu: menuReducer
})