import { combineReducers } from "redux";

// Import Reducer
import userReducer from './userReducer';

const allReducer = combineReducers({
    user: userReducer
})

export default allReducer