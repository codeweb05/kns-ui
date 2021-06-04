import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import "./Pagination.css";
export const Pagination = ({ onPageChange, total, page, limit = 10 }) => {
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i++);
    }
    return range;
  };

  const [numbers] = useState([...range(page, total / limit)]);

  useEffect(() => {}, []);

  const pageNumbers = numbers.map((number) => (
    <li
      className={`page-item mx-2 ${number === page ? "active" : ""}`}
      key={number}
      onClick={() => onPageChange(number)}
    >
      <span className="page-link rounded-circle">{number}</span>
    </li>
  ));

  return (
    <>
      <nav className="d-flex justify-content-center">
        <ul className="pagination border-0">
          {page > 1 ? (
            <li className="page-item mx-2" onClick={() => onPageChange(--page)}>
              <span className="page-link border-0 rounded-circle" tabIndex="-1">
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            </li>
          ) : (
            ""
          )}
          {/* numbers */}
          {pageNumbers}

          {/* right icon */}
          {page < total / limit ? (
            <li className="page-item mx-2" onClick={() => onPageChange(++page)}>
              <span className="page-link rounded-circle">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </>
  );
};
