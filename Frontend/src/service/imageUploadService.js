import axios from "axios";
import { backend } from "../config/backend";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token") ? localStorage.getItem("token") : ''
  }

  export const uploadImage = (data) => {
    const formData = new FormData();
    formData.append("image", data);
    return axios.post(`${backend}/images/`, formData, {headers: headers}  )
  };