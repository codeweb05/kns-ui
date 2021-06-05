import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
// import { updateCustomer } from "../../services/CustomerService";
import { getUser, saveUser } from "../../services/UserService";
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
import Logout from "../Logout";

export const Profile = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [meetingData, setMeetingData] = useState([]);
  const [meetingDayList, setMeetingDayList] = useState([]);
  const [slotData, setSlotData] = useState();
  const [calendar, setCalendar] = useState(new Date());

  useEffect(() => {
    getUser().then((res) => {
      setUser(res?.data?.user);
      setMeetingData(res?.data?.meetingData);
      setSlotData(res?.data?.slotData);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      await saveUser(data);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const meetings = meetingData.filter(meetingDay => moment(meetingDay.meetingStart).format("DD-MM-YYYY") === moment(calendar).format("DD-MM-YYYY"))
    setMeetingDayList(meetings);
  }, [calendar, meetingData])

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
          <Logout />
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
          <div className="pt-5 w-100">
            <div className="d-flex justify-content-between pb-2">
              <h3 className="slots">Slots</h3>
              <h3 className="total">Total:{slotData?.total || 0}</h3>
            </div>
            <div className="d-flex">
              <span className="little-circle-1 me-2 rounded-circle"></span>
              <p className="comleted">Completed: {slotData?.completed || 0}</p>
            </div>
            <div className="d-flex">
              <span className="little-circle-2 me-2 rounded-circle"></span>
              <p className="comleted">Pending: {slotData?.pending || 0}</p>
            </div>
          </div>
        </div>
        <div className="row meeting-container mb-5 mx-auto p-4">
          <h4 className="schedule">Schdule</h4>
          <div className="col-12 d-flex justify-content-center">
            <Calendar
              className="calendar"
              onChange={setCalendar}
              value={calendar}
              tileClassName={({ date, view }) => {
                if (meetingData.find(x => moment(x.meetingStart).format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY"))) {
                  return 'highlight'
                }
              }}
            />
          </div>
          <div className="col-12 my-auto pt-2">
            {meetingDayList.map((meeting, index) =>
            (
              <div key={index} className="d-flex align-items-baseline justify-content-center w-100">
                <span className="meeting-spot rounded-circle me-2"></span>
                <p className="meeteng-paragraph">{moment(meeting.meetingStart).format("hh:mm a")}: Meeting with {meeting.name}</p>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};