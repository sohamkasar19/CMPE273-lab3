import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { USER_INFO, USER_LOGOUT } from "../actions/action-types/user-actions";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...action.payload };

    case USER_LOGOUT:
      storage.removeItem("persist:root");
      return (state = {});

    default:
      return state;
  }
};

export default combineReducers({ userReducer });
