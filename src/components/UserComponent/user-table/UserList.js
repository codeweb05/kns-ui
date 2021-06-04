import { useEffect, useState, useCallback } from "react";
import { getAllUsers } from '../../../services/UserService';
import { Error } from "../../error/Error";
import { Pagination } from "../../utils/Pagination";

export const UserList = () => {
  const [user, setUser] = useState([]);
  const [searchText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [error, setError] = useState("");


  const getAll = useCallback(() => {
    getAllUser(1);
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  async function getAllUser(page) {
    try {
      const response = await getAllUsers(searchText, page);
      setTotal(response.data.total);
      setUser(response?.data?.userList);
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message);
    }
  }

  const onPageChange = (page) => {
    setPage(page);
    getAllUser(page);
  };

  console.log(user)
  const tableRows = user.map((cr) => (
    <tr key={cr._id}>
      <th className="p-3" scope="row">{cr.firstName}</th>
      <td className="p-3">{cr.lastName}</td>
      <td className="p-3">{cr.contactNumber}</td>
      <td className="p-3">{cr.userName}</td>
      <td className="p-3">{cr.email}</td>
    </tr>
  ));

  return (
    <div className="dashboard-table mt-4 px-4 py-3">
      {error ? <Error message={error} /> : ""}
      <table className="table mb-3">
        <thead>
          <tr key="head">
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">ContactNumber</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
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
