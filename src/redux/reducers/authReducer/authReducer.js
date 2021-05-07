import {AUTH_FAILED, AUTH_LOGOUT, AUTH_SUCCESS, CHECK_REGISTRATION_STATUS} from "../../actions/actionTypes";


const initialState = {
    regPreventedInfo: null,
    isLoginFailed: null,
    token: null,
    username: null
}

const handlers = {
    DEFAULT: state => state,
    [CHECK_REGISTRATION_STATUS]: (state, action) => ({...state, regPreventedInfo: action.payload}),
    [AUTH_SUCCESS] : (state, action) => ({...state, token: action.token, username: action.username, isLoginFailed: false}),
    [AUTH_LOGOUT] : state => ({...state, token: null, username: null}),
    [AUTH_FAILED] : state => ({...state, isLoginFailed: true})
}

const authReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}

export default authReducer
