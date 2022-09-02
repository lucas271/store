import {LOGIN_FAIL,LOGIN_REQUEST, LOGIN_SUCCESS} from '../constants/userConstants'
import {REGISTER_FAIL,REGISTER_REQUEST, REGISTER_SUCCESS} from '../constants/userConstants'

import axios from 'axios'

const config = {
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: 'include',
}

export const loginAction = (email, password) => {
    return async dispatch => {
        try {
            dispatch({type: LOGIN_REQUEST, payload: {loading: true}})

            //create artificial delay
            setTimeout(async () => {
                const {data} = await axios.post(
                    'http://localhost:3001/login',
                     {email, password},
                    config
                )

                if(data.errors && data.errors.length > 0) return dispatch({type: LOGIN_FAIL, payload: {loading: false, message: {error: data.errors}}})
                dispatch({type: LOGIN_SUCCESS, payload: {loading: false, message: {success: 'success'}}})

                localStorage.setItem("userInfo", JSON.stringify(data.user))
            }, 1000)

        } catch (error) {
            dispatch({type: LOGIN_FAIL, payload: {loading: false, message: {error: ['server_error']}}})
        }
    }
}

export const registerAction = (email, password, repeatePassword) => {
    return async dispatch => {
        try {
            dispatch({type: REGISTER_REQUEST, payload: {loading: true}})

            //create artificial delay
            setTimeout(async () => {
                const {data} = await axios.post('http://localhost:3001/register', {email, password, repeatePassword}, config)
                
                if(data.errors && data.errors.length > 0) {
                    return dispatch({type: REGISTER_FAIL, payload: {loading: false, message: {error: data.errors}}})
                }

                dispatch({type: REGISTER_SUCCESS, payload: {loading: false, message: {success: 'success'}}})
                localStorage.setItem("userInfo", JSON.stringify(data.user))
            }, 1000)   
                     
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: {loading: false, message: {error: ['database_error']}}})
        }
    }
}