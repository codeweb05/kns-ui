import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { userContext } from "./context/UserContext";
import axios from 'axios';

import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';;

const browserHistory = createBrowserHistory();

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const token = localStorage.getItem("red_leaf_token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {

  return (
    <BrowserRouter history={browserHistory}>
      <Routes />
    </BrowserRouter>

  );
}

export default App;
