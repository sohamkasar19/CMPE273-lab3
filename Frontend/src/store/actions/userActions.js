import {
  ADD_GIFT_WRAP,
    ADD_MESSAGE,
    ADD_QUANTITY,
  ADD_TO_CART,
  CHANGE_CURRENCY,
  CHECKOUT_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  USER_INFO,
  USER_LOGOUT,
} from "./action-types/user-actions";

export function userInfo(values) {
  return {
    type: USER_INFO,
    payload: values,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};

export const addToCart = (values) => {
  return {
    type: ADD_TO_CART,
    payload: values,
  };
};

export const checkoutCart = () => {
  return {
    type: CHECKOUT_CART
  };
};

export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        payload: id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        payload: id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        payload: id
    }
}

export function addGiftWrap(values) {
  return {
    type: ADD_GIFT_WRAP,
    payload: values,
  };
}

export function addMessage(values) {
  return {
    type: ADD_MESSAGE,
    payload: values,
  };
}