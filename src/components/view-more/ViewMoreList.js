import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ViewMoreTabs from "./ViewMoreTabs";

export const ViewMoreList = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.data) {
      setData([location.state.data]);
    }
  }, [location?.state]);

  const tableRows = data.map((cr) => (
    <tr key={cr._id}>
      <th scope="row">{cr.name}</th>
      <td>{cr.stage}</td>
      <td>{cr.manager}</td>
      <td>{cr.contactNumber}</td>
      <td>{cr.email}</td>
      <td>{cr.source}</td>
      <td>
        <button
          className="btn btn-red-leaf py-1 text-white"
          onClick={() => openInNewTab(cr.meetingLink)}
        >
          Join
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="dashboard-table mt-4 px-4 py-3">
        <table className="table mb-3">
          <thead>
            <tr key="head">
              <th scope="col">Name</th>
              <th scope="col">Stage</th>
              <th scope="col">Lead Manager</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Source</th>
              <th scope="col">Join Meeting</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
      <div className="dashboard-table mt-4 px-4 py-3">
        <ViewMoreTabs />
      </div>
    </>
  );
};
