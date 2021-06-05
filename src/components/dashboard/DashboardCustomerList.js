import { useEffect, useState, useCallback, useRef, } from "react";
import { createBooking, getCustomers, updateCustomer, getUrl } from "../../services/CustomerService";
import { Error } from "../error/Error";
import { Pagination } from "../utils/Pagination";
import { BookingPopup } from "./BookingPopup";
import { STAGE_OPTIONS } from "./../../utils/constants/stage-options"
import { useLocation } from "react-router-dom";

export const DashboardCustomerList = ({ users }) => {
  const location = useLocation();
  const [customers, setCustomers] = useState(users);
  const [searchText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const linkRef = useRef(null);

  const onDateChoosen = async (customerId, meetingTime) => {
    try {
      let user = localStorage.getItem('red_leaf_user');
      user = JSON.parse(user);
      if (user.isGoogleLogin) {
        const data = await createBooking({
          customerId: customerId,
          time: meetingTime
        });
        getAllCustomers();
      } else {
        const url = await getUrl({
          customerId: customerId,
          time: meetingTime
        });
        setUrl(url);
      }
    } catch (e) {
      setError(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (location?.state?.error) {
      setError(location.state.error);
    }
  }, [location?.state]);

  const getAll = useCallback(() => {
    getAllCustomers(1);
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  useEffect(() => {
    if (url) {
      linkRef.current.click();
    }
  }, [url]);

  async function getAllCustomers(page) {
    try {
      const response = await getCustomers({ searchText, page, isDashboard: true });
      setTotal(response?.data?.total);
      setCustomers(response?.data?.customerList);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  const onPageChange = (page) => {
    setPage(page);
    getAllCustomers(page);
  };

  const sortOptions = (val) => {
    return STAGE_OPTIONS.map((option) => (
      <option key={option.id} value={option.id} >
        {option.value}
      </option>
    ))
  };

  const updateStage = async (stage, email) => {
    await updateCustomer({ stage, email });
  }


  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const tableRows = customers.map((cr) => (
    <tr key={cr._id}>
      <th scope="row">{cr.name}</th>
      <td><select className="btn btn-sm btn-outline-danger dashboard-select-btn"
        defaultValue={cr.stage} onChange={(e) => updateStage(e.target.value, cr.email)}>
        {sortOptions(cr.stage)}
      </select></td>
      <td>{cr.manager}</td>
      {/* <td>2 hours ago</td> */}
      <td>{cr.contactNumber}</td>
      <td>{cr.email}</td>
      <td>{cr.source}</td>
      <td>
        {cr.meetingLink ? <button
          className="btn btn-red-leaf py-1 text-white"
          onClick={() => openInNewTab(cr.meetingLink)}
        >
          Join
        </button> :
          <BookingPopup customerId={cr._id} onDateChoosen={onDateChoosen} />}
      </td>
    </tr>
  ));

  return (
    <div className="dashboard-table mt-4 px-4 py-3">
      <a ref={linkRef} href={url} />
      {error ? <Error message={error} /> : ""}
      <table className="table mb-3">
        <thead>
          <tr key="head">
            <th scope="col">Name</th>
            <th scope="col">Stage</th>
            <th scope="col">Lead Manager</th>
            {/* <th scope="col">Contacted</th> */}
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">Source</th>
            <th scope="col">Book A Slot</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div className="text-center w-100 mt-4">
        <Pagination onPageChange={onPageChange} total={total} page={page} />
      </div>
    </div>
  );
};
