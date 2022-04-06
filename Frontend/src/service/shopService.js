import axios from "axios";
import { backend } from "../config/backend";
import { userInfo } from "../store/actions/userActions";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "",
};

export const shopCheckName = (data) => {
  return axios.post(`${backend}/shop/check-shop-name`, { data }, { headers: headers })
};

export const addNewShop = (data) => {
  return (dispatch) => 
  axios.post(`${backend}/shop/add-new-shop`, { data }, { headers: headers })
    .then((res) => {
      if(res.data.status === 'ok') {
        return dispatch(userInfo(res.data.shop));
      }
    })
  // return axios.post(`${backend}/shop/check-shop-name`, { data })
};
