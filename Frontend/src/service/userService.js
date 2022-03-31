import axios from "axios";
import { backend } from "../config/backend";

export function userLogin(data) {
  return axios.post(`${backend}/user/login`, { data })
//   .then((res) => {
//     console.log(res.data);
//   });
}
