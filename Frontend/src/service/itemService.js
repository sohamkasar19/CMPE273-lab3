import axios from "axios";
import { backend } from "../config/backend";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "",
};

export const itemUploadImage = (data) => {
  return axios.post(`${backend}/images/`, data, { headers: headers });
};

export const itemAddNew = (data) => {
  return axios.post(`${backend}/item/add-new`, { data }, { headers: headers });
};

export const itemEdit = (data) => {
  return axios.post(`${backend}/item/edit`, { data }, { headers: headers });
};

export const getAllItems = () => {
  return axios.get(`${backend}/item/all`);
};

export const getItemData = (data) => {
  const params = new URLSearchParams([['itemId', data]]);
  return axios.get(`${backend}/item/details`, {params});
};

export const getSearchResults = (data) => {
  const params = new URLSearchParams([['searchWord', data]]);
  return axios.get(`${backend}/item/search`, {params});
};