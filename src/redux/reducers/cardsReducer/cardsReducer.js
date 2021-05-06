import {CHANGE_EDIT_ITEM, FETCH_CARDS_INFO} from "../../actions/actionTypes";

const initialState = {
    cardsInfo: null,
    editItemId: null
}

const handlers = {
    DEFAULT: state => state,
    [FETCH_CARDS_INFO]: (state, action) => ({...state, cardsInfo: action.payload}),
    [CHANGE_EDIT_ITEM]: (state, action) => ({...state, editItemId: action.payload})
}

const cardsReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

export default cardsReducer