import axios from "axios";
const apiURL = `${process.env.REACT_APP_API_URL}/customer`;

export const createCustomer = (data) => {
  return axios.post(apiURL, data);
};

export const getCustomers = ({ searchText, page = 1, limit = 10, isDashboard = false }) => {
  return axios.get(apiURL, {
    params: { searchText: searchText, page: page, limit: limit, isDashboard },
  });
};

export const updateCustomer = ({ stage, email }) => {
  return axios.post(`${apiURL}/update`, { stage, email });
};

export const createBooking = async (data) => {
  return await axios.post(`${apiURL}/book`, data);
};

export const getUrl = async (data) => {
  const res = await axios.post(`${apiURL}/google`, data);
  return res.data.url;
};

export const createFirstBooking = (url) => {
  return axios.get(`${apiURL}/google/callback${url}`);
};

export const getManagerData = (url) => {
  return axios.get(`${apiURL}/manager`);
};
