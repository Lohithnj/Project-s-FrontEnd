import React, { useState } from "react";
import "./Otp.css";

const OtpVerifyForm = ({ email }) => {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert("OTP Verified!");
        // Proceed with registration or login
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="otp-box">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter the OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpVerifyForm;
