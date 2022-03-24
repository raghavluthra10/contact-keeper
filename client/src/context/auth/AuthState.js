import React, { useReducer, useCallback } from 'react'
import AuthContext from './authContext';
import axios from 'axios';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';
import setAuthToken from '../../utils/setAuthToken';

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
    const loadUser = useCallback(async () => {
        // load token into global headers
        setAuthToken(localStorage.token);
        

        try {
            const res = await axios.get('/api/auth');
            dispatch({ 
                type: USER_LOADED, 
                payload: res.data // res.data is the user information stored in an object
            })
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    },[]);

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

            loadUser();

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
