import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/UserService';
import { CustomerHeader } from './CusomerHeader';
import { CustomersList } from './CustomersList';


const Customers = () => {

    //     const [staff, setStaff] = useState([]);

    //   const onSearchCustomers = (text) => {
    //       getAllUsers(text)
    //       .then(response => {
    //           setStaff(response.data)
    //       })
    //       .catch(err => console.log(err))
    //   };

    //   useEffect(() => {
    //       onSearchCustomers('')
    //   }, []); 

    return (
        <div className="mt-5">
            <CustomerHeader onSearchCustomers={() => { }} />
            <CustomersList />
        </div>
    );
};


export default Customers;



// onSearchCustomers = {onSearchCustomers}