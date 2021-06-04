import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Dashboards.css'

const DashboardButton = ({link, btnName, icons}) => {
    return (
        <NavLink className="btn-sidebar text-decoration-none my-2 ps-4 pe-5 py-3 text-white" activeClassName="btn-active" to={link}>
            <FontAwesomeIcon className="sidebar-icon" icon={icons} />    
            <span className="ms-3">{btnName}</span>
        </NavLink>
    );
};



export default DashboardButton;