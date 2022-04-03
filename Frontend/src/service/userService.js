import axios from "axios";
import { backend } from "../config/backend";
import { userInfo } from "../store/actions/userActions";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem("token") ? localStorage.getItem("token") : ''
}

export const userLogin = (data) => {
  return (dispatch) =>
    axios.post(`${backend}/user/login`, { data }).then((res) => {
      if (res.data.status === "ok") {
        localStorage.setItem("token", res.data.token);
        res.data.user["token"] = res.data.token;
        return dispatch(userInfo(res.data.user));
      }
    });
};

export const userSignup = (data) => {
  return (dispatch) =>
    axios.post(`${backend}/user/signup`, { data }).then((res) => {
      if (res.data.status === "ok") {
        localStorage.setItem("token", res.data.token);
        res.data.user["token"] = res.data.token;
        return dispatch(userInfo(res.data.user));
      }
    });
};

export const userEditProfile = (data) => {
  return (dispatch) =>
    axios.post(`${backend}/user/edit-profile`, { data }, {
      headers: headers })
      .then((res) => {
      if (res.data.status === "ok") {
        return dispatch(userInfo(res.data.user));
      }
    });
};
