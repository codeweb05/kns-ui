import React from 'react';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SearchUser = ({onSearchUser}) => {

    const onInputChange = (e) =>{
        onSearchUser(e.target.value)
    }

    return (
        <div className="input-group py-3 dashboard-search">
            <span className="dashboard-form-icon input-group-text ps-4" id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></span>
            <input
                onChange = {onInputChange}
                type="text" 
                className="dashboard-input form-control" 
                placeholder="Username" 
                aria-label="Username" 
                aria-describedby="basic-addon1" 
            /> 
        </div>
    )
};

export default SearchUser;