import { useEffect, useState } from 'react';
import { UserHeader } from './UserHeader';
import { UserList } from './UserList';


const UserTable = () => {
    return (
        <div className="mt-5">
            <UserHeader onSearchUser={() => { }} />
            <UserList />
        </div>
    );
};


export default UserTable;