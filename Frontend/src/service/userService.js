import axios from "axios";
import { backend } from "../config/backend";
import { userInfo } from "../store/actions/userActions";

export const userLogin = (data) => {
  return (dispatch) =>
    axios.post(`${backend}/user/login`, { data }).then((res) => {
      if (res.data.status === "ok") {
        return dispatch(userInfo(res.data.user));
      }
    });
};
