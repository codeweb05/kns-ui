import "./Home.css";
import { useState } from "react";
import menu from "../assets/hamburg.png";
import { Redirect, Route, Switch } from "react-router";
import DashboardButton from './dashboard/DashboardButton'
import logo from '.././assets/largeLogo.png'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripHorizontal, faUser, faChartPie, faCog, faUserCircle, faQuestionCircle, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from "./dashboard/Dashboard";
import { Profile } from './profile/Profile'
import { Analytics } from "./analytics/Analytics";
import Customers from "./customer-table/Customers";
import UserTable from "./UserComponent/user-table/UserTable";
import UserAdd from "./UserComponent/user-add/UserAdd";
import { getName, isAdmin } from '../utils/helper';

export const HomeComponent = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  function showMenu() {
    setIsMenuShown(!isMenuShown);
  }

  return (
    <div className="row m-0">
      <div
        className={`dashbord-container col-md-4 col-xl-3 d-none side-bar bg-red-leaf  d-md-flex flex-column 
         ${isMenuShown ? "active-menu" : ""}`}
      >

        <button
          className="btn-close bg-transparent btn d-md-none position-absolute"
          onClick={showMenu}
        >

        </button>
        <div className="sidebar-wrapper mx-auto">
          <img className="w-100 large-logo" src={logo} alt="logo" />
          <div className="btn-wrapper d-flex flex-column">
            <DashboardButton exact link="/home/dashboard" btnName="Dashboard" icons={faGripHorizontal} />
            <DashboardButton link="/home/profile" btnName="Profile" icons={faUser} />
            <DashboardButton link="/home/analytics" btnName="Analytics" icons={faChartPie} />
            <DashboardButton link="/home/customers" btnName="Customers" icons={faUserCircle} />
            {isAdmin() ? <DashboardButton link="/home/user-list" btnName="User" icons={faCog} /> : null}
          </div>
          <div className="d-flex flex-column">
            <NavLink className="helpBtn text-decoration-none bg-white my-2 ps-3 mb-3 pe-4 py-2" to="/">
              <FontAwesomeIcon className="sidebar-icon me-3" icon={faQuestionCircle} />
              Help & Support
          </NavLink>
            <NavLink className="helpBtn text-decoration-none bg-white my-2 ps-3 pe-4 py-2" to="/">
              <FontAwesomeIcon className="sidebar-icon me-3" icon={faCommentAlt} />
            FAQs
          </NavLink>
          </div>
        </div>
      </div>
      <div className="main-content px-5 col-12 col-md-8 col-xl-9">
        <button
          className="btn bg-transparent position-absolute m-2  btn-menu d-md-none"
          onClick={showMenu}
        >
          <img src={menu} alt="menu icon" />
        </button>
        {/* main content */}

        <Switch>
          <Route path="/home/dashboard" component={Dashboard}></Route>
          <Route path="/home/profile" component={Profile}></Route>
          <Route path="/home/analytics" component={Analytics}></Route>
          <Route path="/home/customers" component={Customers}></Route>
          {isAdmin() ? <Route path="/home/user-list" component={UserTable}></Route> : null}
          {isAdmin() ? <Route path="/home/user-add" component={UserAdd}></Route> : null}
          <Route path="/home">
            <Redirect to="/home/dashboard" />
          </Route>
        </Switch>
      </div>
    </div>


  );
};
