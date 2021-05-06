import axios from "axios";
import {SERVER_URL} from "../../config/config";
import {CHECK_REGISTRATION_STATUS, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export const sendRegistrationForm = formdata => {
    return async dispatch => {
        try {
            const response = await axios.post(`${SERVER_URL}/registration`, formdata)
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

export const sendLoginForm = formdata => {
    return async dispatch => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, formdata)
            if (response.data) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userName', response.data.username)
                localStorage.setItem('expirationDate', response.data.expirationDate)
                const {token,username} = response.data.token
                dispatch(authSuccess({token, username}))
                dispatch(autoLogout((new Date(response.data.expirationDate).getTime() - new Date().getTime())))
            }
        } catch (e) {
            console.warn(e)
        }
    }
}

export const authSuccess = info => {
    return {
        type: AUTH_SUCCESS, token:info.token, username: info.username
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}


export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('userName')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess({token, username}))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())))
            }
        }
    }
}