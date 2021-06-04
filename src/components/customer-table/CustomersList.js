import { useEffect, useState, useCallback } from "react";
import { getCustomers } from "../../services/CustomerService";
import { Error } from "../error/Error";
import { Pagination } from "../utils/Pagination";



export const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [error, setError] = useState("");


  const getAll = useCallback(() => {
    getAllCustomers(1);
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  async function getAllCustomers(page) {
    try {
      const response = await getCustomers({searchText, page});
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

  const tableRows = customers.map((cr) => (
    <tr key={cr._id}>
      <th className="p-3" scope="row">{cr.name}</th>
      <td className="p-3">{cr.stage}</td>
      <td className="p-3">{cr.manager}</td>
      {/* <td className="p-3">2 hours ago</td> */}
      <td className="p-3">{cr.contactNumber}</td>
      <td className="p-3">{cr.email}</td>
      <td className="p-3">{cr.source}</td>
    </tr>
  ));

  return (
    <div className="dashboard-table mt-4 px-4 py-3">
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
