import { CHANGE_CURRENCY } from "../actions/action-types/user-actions";
import { combineReducers } from "redux";

const initState = {
  currency: "USD",
};

const currencyReducer = (state = initState, action) => {
  if (action.type === CHANGE_CURRENCY) {
    return {
      currency: action.payload,
    };
  }
  else {
      return state;
  }
};

export default combineReducers({ currencyReducer });
