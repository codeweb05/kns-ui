
import { useField } from "formik";
import "./CustomerInput.css";


export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>   
        <label className="my-label mt-2" htmlFor={props.id || props.name}>
            {label}
        </label>
        <input autoComplete="off" className={`form-control ${(meta.touched && meta.error) ? 'outline-danger' : ''}`}   {...field} {...props} />
    </>
  );
};