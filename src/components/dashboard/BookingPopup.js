import { Popup } from "reactjs-popup";
import { useState } from "react";
import "./BookingPopup.css";

export const BookingPopup = ({ customerId, onDateChoosen }) => {
  const [meetingTime, setmeetingTime] = useState(Date.now());

  const onClick = () => {
    onDateChoosen(customerId, meetingTime);
  };

  return (
    <Popup
      trigger={
        <button className="btn btn-red-leaf text-white">Book Now</button>
      }
      position="left center"
    >
      {(close) => (
        <div className="custom-modal bg-white shadow-lg">
          <div className="modal-content p-3 border-0">
            <input type="datetime-local" onChange={(e) => setmeetingTime(e.target.value)} />
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-red-leaf py-0 text-white"
                onClick={() => {
                  onClick();
                  close();
                }}
              >
                Book
              </button>
              <button className="btn btn-secondary px-1 ml-auto py-0" onClick={close}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};
