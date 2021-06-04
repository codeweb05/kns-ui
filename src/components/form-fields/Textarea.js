import { useField } from "formik";

export const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="mt-2" htmlFor={props.id || props.name}></label>
      <textarea className={`'form-control' ${(meta.touched && meta.error) ? 'outline-danger' : ''}`} {...field} {...props} />
    </>
  );
};