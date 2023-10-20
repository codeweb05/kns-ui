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
    console.log('hi');
    const { origin } = new URL(config.url);
    const token = localStorage.getItem("red_leaf_token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {

  }
);

function App() {

  return (
    <BrowserRouter history={browserHistory}>
    </BrowserRouter>

  );
}

export default App;
