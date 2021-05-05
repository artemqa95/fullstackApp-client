import axios from "axios";
import {FETCH_CARDS_INFO} from "./actionTypes";
import {SERVER_URL} from "../../config/config";

export const getCardsInfo = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${SERVER_URL}/cardsinfo`)
            dispatch(fetchCardsInfo(response.data))
        } catch (e) {
            console.warn(e)
        }
    }
}

export const fetchCardsInfo = (payload) => {
    return {
        type: FETCH_CARDS_INFO, payload
    }
}

export const postCardInfo = data => {
    return async dispatch => {
        try {
            await axios.post(`${SERVER_URL}/addcard`, data)
            dispatch(getCardsInfo())
        } catch (e) {
            console.warn(e)
        }
    }
}

export const deleteCard = (data) => {
    return async dispatch => {
        try {
            await axios.delete(`${SERVER_URL}/removecard`, {data: data})
            dispatch(getCardsInfo())
        } catch (e) {
            console.warn(e)
        }
    }
}
