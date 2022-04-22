import Axios from 'axios';

export const onUserRegister = (username, email, password) => {
    return(dispatch) => {
        dispatch(
            {
                type: 'LOADING'
            }
        )

        if(!username || !email || !password){
            return dispatch(
                {
                    type: 'REGISTER_ERROR',
                    payload: { error: true, message: 'Fill All Data!' }
                }
            )
        }

        Axios.post('http://localhost:5000/user/register', {username, email, password})
        .then((res) => {
            console.log(res)
            dispatch(
                {
                    type: 'REGISTER_SUCCESS',
                    payload: res.data
                }
            )
        })
        .catch((err) => {
            dispatch(
                {
                    type: 'REGISTER_ERROR',
                    payload: err.response.data
                }
            )
        })
    }
}

export const onUserLogin = (data) => {
    return(dispatch) => {
        dispatch({
            type: 'LOADING'
        })

        if(!data.email || !data.password){
            return dispatch({
                type: 'LOGIN_ERROR',
                payload: { error: true, message: 'Fill All Data!' }
            })
        }

        Axios.post('http://localhost:5000/user/login', {email: data.email, password: data.password})
        .then((res) => {
            if(res.data.error === true){
                dispatch(
                    {
                        type: 'LOGIN_ERROR',
                        payload: res.data
                    }
                )
            }else if(res.data.error === false){
                localStorage.setItem('myTkn', res.data.token)
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: { error: res.data.error, message: res.data.message }
                    }
                )
            }
        })
        .catch((err) => {
            dispatch(
                {
                    type: 'LOGIN_ERROR',
                    payload: err.response.data // { error: true, message: ... }
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
        Axios.post('http://localhost:5000/user/checkuserverify', {}, {headers: {
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