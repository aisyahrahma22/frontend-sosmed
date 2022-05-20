import Axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../Supports/Helpers/index';

export const onUserLogin = (data) => {
    return(dispatch) => {
        dispatch({
            type: 'LOADING'
        })

        if(!data.account || !data.password){
            return dispatch({
                type: 'LOGIN_ERROR',
                payload: { error: true, message:  Swal.fire({
                    title: 'Error!',
                    text: 'Fill All Data!' ,
                    icon: 'error',
                    confirmButtonText: 'Okay!',
                    timer: 1500
                })
                }
            })
        }

        Axios.post(`${API_URL}/user/login`, {account: data.account, password: data.password})
        .then((res) => {
            if(res.data.error === true){
                console.log('ini res.data.error', res.data.error)
                dispatch(
                    {
                        type: 'LOGIN_ERROR',
                        payload: Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: 'error',
                            confirmButtonText: 'Okay!',
                            timer: 1500
                        })
                    }
                )
            }else if(res.data.error === false){
                localStorage.setItem('myTkn', res.data.token)
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: { error: res.data.error, message: res.data.message, id:res.data.id }
                    }
                )
            }
        })
        .catch((err) => {
            dispatch(
                {
                    type: 'LOGIN_ERROR',
                    payload: Swal.fire({
                        title: 'Error!',
                        text:  err.response.data,
                        icon: 'error',
                        confirmButtonText: 'Okay!'
                    })// { error: err.response.data  true, message: ... }
                }
            )
        })
    }
}

export const onCheckUserLogin = () => {
    return(dispatch) => {
        let token = localStorage.getItem('myTkn')
        
        if(token){
            dispatch(
                {
                    type: 'ISLOGIN_TRUE',
                    payload: true
                }
            )
        }else{
            dispatch(
                {
                    type: 'ISLOGIN_FALSE',
                    payload: false
                }
            )
        }
    }
}

export const onCheckUserVerify = (token) => {
    return(dispatch) => {
        Axios.post(`${API_URL}/user/checkuserverify`, {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            dispatch(
                {
                    type: 'IS_CONFIRMED',
                    payload: res.data.is_confirmed
                }
            )
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const onUserLogout = () => {
    localStorage.removeItem('myTkn')
    return {
        type: 'USER_LOGOUT'
    }
}