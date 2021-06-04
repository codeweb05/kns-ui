import React, { useState, useEffect } from 'react'
import "./Dashboards.css";
import { DashboardCustomerList } from "./DashboardCustomerList";
import { DashboardHeader } from "./DashboardHeader";
import { getAllUsers } from '../../services/UserService'

export const Dashboard = () => {

  const [users, setUsers] = useState([]);

  // const onSearch = (text) => {
  //     getAllUsers(text)
  //     .then(response => {
  //         setUsers(response.data)
  //     })
  //     .catch(err => console.log(err))
  // };

  // useEffect(() => {
  //     onSearch('')
  // }, []); 


  return (
    <div className="mt-5">
      <DashboardHeader onSearch={() => { }} />
      <DashboardCustomerList users={users} />
    </div>
  );
};
