import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";

const MySelect = ({ label, icon, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="mb-3" htmlFor={props.id || props.name}>
       <FontAwesomeIcon icon={icon} />
        <span className="customer-icon">{label}</span>
      </label>
      <select {...field} {...props} className = {`form-select mb-4 ${(meta.touched && meta.error) ? 'outline-danger' : ''}`}>
        {options}
      </select>
    </>
  );
};
export default MySelect;