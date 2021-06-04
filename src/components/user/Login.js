import { useHistory } from "react-router";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { MyCheckBox } from "../form-fields/CheckBox";
import { Formik, Form } from "formik";
import { Error } from "../error/Error";
import { userContext } from "../../context/UserContext";
import building from "../../assets/building.svg";
import logo from "../../assets/logo.png";
import user from "../../assets/user.svg";
import key from "../../assets/key.svg";
import "./Login.css";
import { NavLink } from "react-router-dom";
import TextInputGroup from "../form-fields/TextInputGroup";
import { login } from "./../../services/UserService";

export const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { setCurrentUser } = useContext(userContext);
  const [error, setError] = useState("");
  const history = useHistory();

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await login(data);
      const { token, ...rest } = response.data;
      localStorage.setItem("red_leaf_user", JSON.stringify(rest));
      localStorage.setItem("red_leaf_token", token);
      setCurrentUser(user);
      history.push("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={logo} className="mt-5 logo-top" alt="logo" />
          <div className="logo-container mt-5">
            <h3 className="login-title mb-4">Login</h3>
            {error ? <Error message={error} /> : ""}

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string().required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={async (values) => {
                onSubmit(values);
              }}
            >
              <Form className="form-width">
                <TextInputGroup
                  icon={user}
                  className="form-control border-0 login-outline"
                  name="email"
                  type="email"
                  placeholder="Username"
                />
                <TextInputGroup
                  icon={key}
                  className="form-control border-0 login-outline"
                  name="password"
                  type="password"
                  placeholder="Pin"
                />
                {/* <MyCheckBox
                  name="keepMeLoggeIn"
                  type="checkbox"
                  label="Keep me logged in"
                /> */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    disabled={submitting}
                    className="btn btn-red-leaf text-light flex-grow-1"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mt-4">
                  <NavLink className="text-danger" to="/">
                    Forgot Password?
                  </NavLink>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="logo-bg col-12 d-none col-md-6 d-md-flex flex-column mt-5 mt-md-0">
          <img
            src={building}
            className="img-fluid my-auto mx-4 building"
            alt="background two people"
          />
          <img src={logo} className="img-fluid logo" alt="logo" />
        </div>
      </div>
    </div>
  );
};
