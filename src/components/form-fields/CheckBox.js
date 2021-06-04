import { useField } from "formik";

export const MyCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-check d-flex align-items-end my-4">
     <input className="form-check-input" style={{width:'20px', height:'20px'}} {...field} {...props}  />
        <label className="form-check-label ms-3 position-relative" style={{"top": "2px"}}  htmlFor={props.id || props.name}>
            {label}
        </label>
        {meta.touched && meta.error ? (
        <div className="mt-1 alert alert-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};