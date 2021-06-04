import React from 'react';
import { useField } from "formik";


const TextInputGroup = ({ icon, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
           <div className={`login-input input-group ${(meta.touched && meta.error) ? 'outline-danger' : ''}`}>
                <img src={icon} className="ps-3" alt="img" />
                    <input
                        {...field} {...props}
                    />
             </div> 
        </div>
    );
};



export default TextInputGroup;