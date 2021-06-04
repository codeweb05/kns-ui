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
  let user = localStorage.getItem('red_leaf_user');
  user = JSON.parse(user);
  if (user.isGoogleLogin) {
    return axios.post(`${apiURL}/book`, data);
  } else {
    const res = await axios.post(`${apiURL}/google`, data);
    return res.data.url;
  }
};

export const createFirstBooking = (url) => {
  return axios.get(`${apiURL}/google/callback${url}`);
};
