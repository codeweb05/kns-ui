import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
// import { updateCustomer } from "../../services/CustomerService";
import { getUser, saveUser, logout } from "../../services/UserService";
import { Error } from "../error/Error";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../assets/man.png";
import manIcon from "../../assets/manIcon.png";
import { MyTextInput } from "../form-fields/TextInput";
import { ProfileStatsChart } from "./ProfileStats";
import Calendar from "react-calendar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.css";
import "react-calendar/dist/Calendar.css";
import { getName, isAdmin } from '../../utils/helper';

const mark = [
  '04-06-2021',
  '03-06-2021',
  '05-06-2021'
]

export const Profile = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [calendar, setCalendar] = useState(new Date());

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log({ data })
      // console.log(user)
      await saveUser(data);
      // history.push("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const validate = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Email is not valid").required("Required"),
    contactNumber: Yup.string().required("Rquired"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    userName: Yup.string().required("Required"),
    password: Yup.string()

      .min(8, "Password more than 8 characters"),
  });

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-between mt-5 px-5">
        <h4>Profile</h4>
        <div className="d-flex">
          <div className="man-wrapper-little me-3 rounded-circle d-flex justify-content-center align-items-center">
            <img className="w-75" src={logo} alt="man" />
          </div>
          <div>
            <h4 className="slots">{getName()}</h4>
            <p className="paragraph">{isAdmin() ? 'Admin' : ''}</p>
          </div>
          <button className="border-0 mx-3" onClick={logout}>Logout
          </button>
        </div>
      </div>
      <div className="col-12 col-xl-6 px-5">
        {user ? (
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              contactNumber: user.contactNumber,
              address: user.address,
              city: user.city,
              state: user.state,
              country: user.country,
              userName: user.userName,
              password: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {(formik) => (
              <div className="mt-5">
                <div className="d-flex justify-content-center">
                  <div
                    className="man-wrapper rounded-circle
                                    d-flex justify-content-center align-items-center"
                  >
                    <img src={logo} alt="man" />
                  </div>
                  <div className=" position-relative">
                    <img className="man-icon" src={manIcon} alt="man-icon" />
                  </div>
                  {error ? <Error message={error} /> : ""}
                </div>

                <Form className="row my-4">
                  <div className="col-12 col-md-6 mb-2">
                    <MyTextInput
                      label="First Name"
                      name="firstName"
                      type="text"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <MyTextInput
                      label="Last name"
                      name="lastName"
                      type="text"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <MyTextInput label="Email" name="email" type="email" />
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <MyTextInput
                      label="Contact Number"
                      name="contactNumber"
                      type="text"
                    />
                  </div>
                  <div className="col-12 mb-2">
                    <MyTextInput label="Address" name="address" type="text" />
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <MyTextInput label="City" name="city" type="text" />
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <MyTextInput label="State" name="state" type="text" />
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <MyTextInput label="Country" name="country" type="text" />
                  </div>
                  <div className="col-md-6 mb-2">
                    <MyTextInput label="Username" name="userName" type="text" />
                  </div>
                  <div className="col-md-6 mb-2">
                    <MyTextInput
                      label="Pasword"
                      name="password"
                      type="password"
                    />
                  </div>
                  <button type="submit" className="btn-red-leaf text-white px-4 py-2 rounded">
                    Save Details
                </button>
                </Form>
              </div>
            )}
          </Formik>
        ) : (
          ""
        )}
      </div>
      <div className="col-12 col-xl-6 mt-5 profile-stats">
        <div className="pie-chart-container mx-auto d-flex align-items-start px-3">
          <div className="">
            <ProfileStatsChart />
          </div>
          <div className="d-flex">
            <div className="pt-5">
              <h3 className="slots">Slots</h3>
              <div className="d-flex">
                <span className="little-circle-1 me-2 rounded-circle"></span>
                <p className="comleted">Completed: 2</p>
              </div>
              <div className="d-flex">
                <span className="little-circle-2 me-2 rounded-circle"></span>
                <p className="comleted">Pending: 18</p>
              </div>
            </div>
            <div className="ms-5 pt-5">
              <h3 className="total">Total:20</h3>
            </div>
          </div>
        </div>
        <div className="row meeting-container mb-5 mx-auto p-4">
          <h4 className="schedule">Schdule</h4>
          <div className="col-8">
            <Calendar
              className="calendar"
              onChange={setCalendar}
              value={calendar}
              onClickDay={(val, e) => {
                console.log(val)
                console.log(e)
              }}
              tileClassName={({ date, view }) => {
                if (mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
                  return 'highlight'
                }
              }}
            />
          </div>
          <div className="col-4 my-auto">
            <div className="d-flex align-items-baseline">
              <span className="meeting-spot rounded-circle me-2"></span>
              <p className="meeteng-paragraph">4: Meeting with Muhammadali</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};