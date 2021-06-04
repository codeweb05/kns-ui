import { NavLink } from "react-router-dom";
import logo from "../../../assets/man.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchUser from "./SearchUser";
import { logout } from '../../../services/UserService';
import { getName, isAdmin, } from "../../../utils/helper";

export const UserHeader = ({ onSearchUser }) => {

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline my-5">
        <SearchUser onSearchUser={onSearchUser} />
        <div className="d-flex">
          <div className="dashboard-logo-wrapper me-3 rounded-circle d-flex justify-content-center align-items-center">
            <img className="w-75" src={logo} alt="man" />
          </div>
          <div>
            <h4 className="slots">{getName()}</h4>
            <p className="paragraph">{isAdmin() ? "Admin" : ""}</p>
          </div>
          <button className="border-0 mx-3" onClick={logout}>Logout
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-baseline">
          <h4 className="slots">Current Users</h4>
          <NavLink
            className="btn btn-table px-3 px-md-4 ms-3 text-white"
            to="/home/user-add"
          >
            Add New
					</NavLink>
        </div>
      </div>
    </div>
  );
};
