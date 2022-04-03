import { CHANGE_CURRENCY, USER_INFO, USER_LOGOUT } from "./action-types/user-actions";

export function userInfo(values){
    return{
        type:USER_INFO,
        payload:values
    }
}

export function userLogout(){
    return{
        type:USER_LOGOUT      
    }
}

export const changeCurrency = (currency) => {
    return {
        type: CHANGE_CURRENCY,
        payload:currency
    };
};



