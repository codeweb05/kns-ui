import React from "react";
import { useField } from "formik";
import "./CustomerInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerInput = ({ label, icon,className, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="mb-3" htmlFor={props.id || props.name}>
        <FontAwesomeIcon icon={icon} />
        <span className="customer-icon">{label}</span>
      </label>
      <input
        className={`${className} ${(meta.touched && meta.error) ? "outline-danger" : ""}`}
        {...field}
        {...props}
      />
    </>
  );
};

export default CustomerInput;
