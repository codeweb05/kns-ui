import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const login = (data) => {
  return axios.post(`${apiURL}/auth/login`, data);
};

export const getUser = () => {
  return axios.get(`${apiURL}/user`)
}

export const saveUser = (data) => {
  return axios.post(`${apiURL}/user`, data);
}

export const createUser = (data) => {
  return axios.post(`${apiURL}/auth/register`, data);
}

export const logout = async () => {
  axios.post(`${apiURL}/auth/logout`);
  localStorage.clear();
  window.location.reload();
}

export const getAllUsers = (searchText, page = 1, limit = 10) => {
  return axios.get(`${apiURL}/user/all`, {
    params: { searchText: searchText, page: page, limit: limit },
  });
};

export const getAnalytics = () => {
  return axios.get(`${apiURL}/user/analytics`,);
};
