import axios from 'axios';
import jwt from 'jsonwebtoken';
import { notify } from 'react-notify-toast';

import instance from './AxiosInstance';
import { ROOT_URL, REGISTER, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATED_ERROR } from '../constants';
import { deactivateLoading } from './loaders';

// action creator for signing in user
export const login = (res) => {
    return {
        type: AUTHENTICATED, 
        user: jwt.decode(res.data.auth_token),
        payload: res
    }
}



export const signInAction = ({ email, password }, history) => {
    return async (dispatch) => {
        const request = await axios.post(`${ROOT_URL}/auth/login`, { email, password })
        .then((response) => {
            dispatch({ 
                type: AUTHENTICATED, 
                user: jwt.decode(response.data.auth_token),
            });
            localStorage.setItem('current_user', response.data.auth_token);
            history.push('/dashboard');
            notify.show('Successfully logged in!', 'success', 5000);
            dispatch(deactivateLoading());
        })
        .catch((error) => {
            dispatch({
                type: AUTHENTICATED_ERROR,
                payload: 'Invalid email or password'
            });
           notify.show(error.response.data.message, 'error', 5000);
           dispatch(deactivateLoading());
        });
    }
}


export const signUpAction = (values, callback) => {
    return async (dispatch) => {
        try {
            const request = await axios.post(`${ROOT_URL}/auth/register`, values);

            dispatch({
                type: REGISTER,
                payload: {message: "Successfully registered", status: "success"}
            });
            callback();
            notify.show('Successfully registered, please login!', 'success', 5000);
        }catch(error) {
            if(error.response.data.message){
                notify.show(error.response.data.message, 'error', 5000);
            }else{
                notify.show(error.response.data.Error, 'error', 5000);
            }
            
        }
    }
}

// logging/signing out user
export const signOutAction = () => {
    return async (dispatch) => {
        try {
            const request = await instance.post(`${ROOT_URL}/auth/logout`);
            localStorage.clear();
            dispatch({
                type: UNAUTHENTICATED,
                payload: {
                    message: "User has logged out successfully.",
                    status: "success"
                }
            });
        }catch(error){
            dispatch({
                type: AUTHENTICATED_ERROR,
                payload: 'Invalid token, please login again!'
            });
        }
    }
}
