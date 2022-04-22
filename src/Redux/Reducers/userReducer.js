let initialState = {
    loading: false, 
    error: false, 
    message: '',
    is_redirect: false,
    is_login: false,
    is_confirmed: 0,
    token: '',
    authChecked: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return { ...state, loading: true, error: false, message: '' }
        case 'REGISTER_ERROR':
            return { ...state, loading: false, error: action.payload.error, message: action.payload.message }
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, error: action.payload.error, message: action.payload.message }
        case 'LOGIN_ERROR':
            return { ...state, loading: false, error: action.payload.error, message: action.payload.message }
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false,  authChecked: true, error: action.payload.error, message: action.payload.message, is_redirect: true, is_login: true }
        case 'ISLOGIN_TRUE':
            return { ...state, is_login: true }
        case 'ISLOGIN_FALSE':
            return { ...state, is_login: false }
        case 'IS_CONFIRMED':
            return { ...state, is_confirmed: action.payload }
        case 'USER_LOGOUT' :
                return { ...state, is_login: false, authChecked: true}
        default : return state
    }
}

export default userReducer