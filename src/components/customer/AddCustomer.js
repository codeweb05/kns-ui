import { useCallback, useEffect, useState } from 'react';
import { Formik, Form } from "formik"
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Error } from '../error/Error'
import * as Yup from 'yup'
import CustomerInput from '../form-fields/CustomerInput';
import MySelect from '../form-fields/Select'
import { createCustomer, getManagerData } from '../../services/CustomerService'
import logo from '../../assets/logo.png'
import './AddCustomer.css'
// import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import { faStream, faUserClock, faLink, faPhone, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
// '@fortawesome/free-regular-svg-icons
import { STAGE_OPTIONS } from "./../../utils/constants/stage-options";
import { SOURCE_OPTIONS } from "./../../utils/constants/source-options";
import { getName, isAdmin } from '../../utils/helper';

const digitsOnly = (value) => /^\d+$/.test(value)

export const AddCustomer = () => {
  const [error, setError] = useState("");
  const [managerData, setManagerData] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const history = useHistory();

  const validate = isAdmin() ? Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email()
      .required(),
    stage: Yup.string().required(),
    manager: Yup.string().required(),
    contactNumber: Yup.string().min(10).max(10).test('Digits only', 'The field should have digits only', digitsOnly),
    source: Yup.string().required(),
  }) : Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email()
      .required(),
    stage: Yup.string().required(),
    contactNumber: Yup.string().min(10).max(10).test('Digits only', 'The field should have digits only', digitsOnly),
    source: Yup.string().required(),
  });

  const stageOptions = () => {
    return STAGE_OPTIONS.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  };

  const sourceOptions = () => {
    return SOURCE_OPTIONS.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  }

  const getAll = useCallback(() => {
    getManager();
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  async function getManager() {
    try {
      const response = await getManagerData();
      setManagerData(response.data)
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    setManagerOptions(managerData.map((option) => (
      <option key={option.email} value={option.email}>
        {option.email}
      </option>
    )));
  }, [managerData]);

  const onSubmit = async (data) => {
    try {
      await createCustomer(data);
      history.push("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="multiple-bg position-relative container-fluid d-flex flex-column justify-content-center align-items-center">

      <Formik
        initialValues={{
          name: "",
          email: "",
          stage: STAGE_OPTIONS[0].id,
          manager: "",
          contactNumber: "",
          source: SOURCE_OPTIONS[0].id,
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(formik) => (
          <div className="row h-75 w-100 mb-5">
            <div className="customer-form col-md-10 offset-md-1 col-12 d-flex flex-column">
              <h3 className="customer-header my-4 ps-5">Add New Customer</h3>
              {error ? <Error message={error} /> : ""}
              <div>
                <Form className="row">
                  <div className="col-12 col-md-6 pb-0 px-md-5 py-md-4">
                    <CustomerInput
                      icon={faUser}
                      className="form-control mb-4"
                      label="Customer Name*"
                      name="name"
                      type="text"
                    />
                    <CustomerInput
                      icon={faEnvelope}
                      className="form-control mb-4"
                      label="Email"
                      name="email"
                      type="email"
                    />
                    <MySelect
                      options={stageOptions()}
                      icon={faStream}
                      label="Stage*"
                      name="stage"
                    />
                    {isAdmin() ? (
                      <MySelect
                        options={managerOptions}
                        icon={faUserClock}
                        label="Customer Manager*"
                        name="manager"
                      />
                    ) : null}
                  </div>
                  <div className="col-12 col-md-6 pb-0 px-md-5 py-md-4">
                    <CustomerInput
                      icon={faPhone}
                      className="form-control mb-4"
                      label="Mobile"
                      name="contactNumber"
                      type="text"
                    />

                    <MySelect
                      options={sourceOptions()}
                      icon={faLink}
                      label="Source*"
                      name="source"
                    />
                  </div>
                  <div className="d-flex row justify-content-between pt-md-0 p-md-5 px-2 py-3">
                    <div className="col-9 col-md-8">
                      <button
                        className="btn-red-leaf text-light py-2 px-md-4 px-2 rounded"
                        type="submit"
                      >
                        Save Contact
                      </button>
                      <button type="button" className="customer-btn ms-md-4 ms-2 rounded px-md-5 p-1">
                        <NavLink className="cancel text-decoration-none" to="/">
                          Cancel
                        </NavLink>
                      </button>
                    </div>
                    <div className="col-md-4 col-3 mt-2 pe-0 pe-md-4 text-end">
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <img className="logo d-none d-md-block" src={logo} alt="logo" />
    </div>
  );
};
