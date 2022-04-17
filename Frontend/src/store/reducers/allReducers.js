import { combineReducers } from "redux";
import { USER_LOGOUT } from "../actions/action-types/user-actions";
import userReducer from "./userReducer";
import currencyReducer from "./currencyReducer";
import cartReducer from "./cartReducer";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    userReducer, currencyReducer, cartReducer
})

const allReducers = (state, action) => {
    if(action.type === USER_LOGOUT) {
        storage.removeItem('persist:root');
        state = undefined;
    }
    return rootReducer(state, action);
}

export default allReducers;