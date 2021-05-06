import {CHECK_REGISTRATION_STATUS} from "../../actions/actionTypes";

const initialState = {
    regPreventedInfo: null
}

const handlers = {
    DEFAULT: state => state,
    [CHECK_REGISTRATION_STATUS]: (state, action) => ({...state, regPreventedInfo: action.payload})
}

const cardsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

export default cardsReducer