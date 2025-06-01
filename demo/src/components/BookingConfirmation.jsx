import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./BookingConfirmation.css";

const BookingSuccessPage = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <FaCheckCircle className="confirmation-icon" />
        <h2>Booking Confirmed!</h2>
        <p>Your ride from {ride?.fromLocation} to {ride?.toLocation} has been successfully booked.</p>
        <button className="confirmation-button" onClick={() => window.location.href = "/"}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
