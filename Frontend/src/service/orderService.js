import axios from "axios";
import { backend } from "../config/backend";
import { checkoutCart } from "../store/actions/userActions";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "",
};

export const checkout = (data) => {
  return (dispatch) =>
    axios
      .post(`${backend}/order/add`, { data }, { headers: headers })
      .then((res) => {
        if (res.data.status === "ok") {
          return dispatch(checkoutCart());
        }
      });
};

export const getOrderHistory = (data) => {
  const params = new URLSearchParams([['userId', data]]);
  return axios.get(`${backend}/order/get`, {params}, { headers: headers })
}
