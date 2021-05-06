import axios from "axios";
import {SERVER_URL} from "../../config/config";
import {CHECK_REGISTRATION_STATUS} from "./actionTypes";

export const sendRegistrationForm = formdata => {
    return async dispatch => {
        try {
            const response = await axios.post(`${SERVER_URL}/registration`, formdata)
            console.log(response.data)
            if (Object.keys(response.data)) dispatch(changeRegStatus(response.data))
            else dispatch(changeRegStatus(null))
        } catch (e) {
            console.warn(e)
        }
    }
}

export const changeRegStatus = data => {
    return {
        type: CHECK_REGISTRATION_STATUS, payload: data
    }
}
