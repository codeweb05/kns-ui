import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
// import { updateCustomer } from "../../services/CustomerService";
import { createUser } from "../../../services/UserService";
import { Error } from "../../error/Error";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../../../assets/man.png";
import manIcon from "../../../assets/manIcon.png";
import { MyTextInput } from "../../form-fields/TextInput";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./user.css";
import "react-calendar/dist/Calendar.css";
import { getName, isAdmin } from '../../../utils/helper';
import Logout from "../../Logout";

const digitsOnly = (value) => /^\d+$/.test(value)

const UserAdd = () => {
	const [error, setError] = useState("");
	const history = useHistory();
	const [user, setUser] = useState(null);
	const [calendar, setCalendar] = useState(new Date());


	const onSubmit = async (data) => {
		try {
			await createUser(data);
			history.push("/home/user-list");
		} catch (error) {
			setError(error?.response?.data?.message);
		}
	};

	const validate = Yup.object({
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
		email: Yup.string().email("Email is not valid").required("Required"),
		contactNumber: Yup.string().min(10).max(10).test('Digits only', 'The field should have digits only', digitsOnly),
		address: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		state: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
		userName: Yup.string().required("Required"),
		password: Yup.string().required()
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
			<div className="col-12">
				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						email: "",
						contactNumber: "",
						address: "",
						city: "",
						state: "",
						country: "",
						userName: "",
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

			</div>
		</div>
	);
};

export default UserAdd;