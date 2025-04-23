import React, { useState } from "react";
import "./Otp.css";

const OtpRequestForm = ({ onOtpSent }) => {
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP sent to your email!");
        onOtpSent(email); // pass email to next step
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="otp-box">
      <h2>Enter Email</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default OtpRequestForm;
