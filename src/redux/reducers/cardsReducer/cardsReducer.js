import {FETCH_CARDS_INFO} from "../../actions/actionTypes";

const initialState = {
    cardsInfo: null
}

const handlers = {
    DEFAULT: state => state,
    [FETCH_CARDS_INFO]: (state, action) => ({...state, cardsInfo: action.payload}),
}

const cardsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

export default cardsReducer