import { NavLink } from "react-router-dom";
import logo from "../../assets/man.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SORT_OPTIONS } from "./../../utils/constants/sort-options";
import { FILTER_OPTIONS } from "./../../utils/constants/filter-options";
import SearchCustomers from "./SearchCustomer";
import { getName, isAdmin } from '../../utils/helper';
import { logout } from "../../services/UserService";

export const CustomerHeader = ({ onSearchCustomers }) => {
  const sortOptions = () => {
    return SORT_OPTIONS.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  };

  const filterOptions = () => {
    return FILTER_OPTIONS.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline my-5">
        <SearchCustomers onSearchCustomers={onSearchCustomers} />
        <div className="d-flex">
          <div className="dashboard-logo-wrapper me-3 rounded-circle d-flex justify-content-center align-items-center">
            <img className="w-75" src={logo} alt="man" />
          </div>
          <div>
            <h4 className="slots">{getName()}</h4>
            <p className="paragraph">{isAdmin() ? 'Admin' : ''}</p>
          </div>
          <button className="border-0 mx-3" onClick={logout}>Logout
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-baseline">
          <h4 className="slots">Current Leads Overview</h4>
        </div>
        <div>
          <select className="btn btn-sm btn-outline-danger dashboard-select-btn">
            {sortOptions()}
          </select>
          <select className="btn btn-sm btn-outline-danger ms-3 dashboard-select-btn">
            {filterOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};
