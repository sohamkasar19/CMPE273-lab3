import axios from "axios";
import { backend } from "../config/backend";
import { userInfo } from "../store/actions/userActions";

export const userLogin = (data) => {
  return dispatch =>
    axios.post(`${backend}/user/login`, { data }).then((res) => {
      if (res.data.status === "ok") {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        res.data.user["token"] = res.data.token;
        return dispatch(userInfo(res.data.user));
      }
    });
};

export const userSignup = (data) => {
  return dispatch => 
  axios.post(`${backend}/user/signup`, { data }).then((res) => {
    if (res.data.status === "ok") {
      console.log(res.data.token); 
      return dispatch(userInfo(res.data.user));
    }
  });
}
