import React, { useReducer } from 'react'
import AuthContext from './authContext';
import axios from 'axios';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [ state, dispatch ] = useReducer( authReducer, initialState );

    // Load User to check which user is logged in.
    const loadUser = () => console.log('Load User');

    // Register User to sign user up and get token back
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data // res over here is the token 
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //login user
    const loginUser = () => console.log('Login User');

    // logout user
    const logoutUser = () => console.log('Logout User');

    // clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });


    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
