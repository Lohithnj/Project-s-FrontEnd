// import React, { useState } from "react";
// import axios from "axios";
// import "./LoginForm.css";
// import { useNavigate } from "react-router-dom";
// import UserDetailsForm from './UserDetailsForm';

// function RegisterForm() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1); // Step 1 = email + OTP, Step 2 = full form

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [sentOtp, setSentOtp] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     password: "",
//     phone: "",
//   });

//   const handleSendOtp = async () => {
//     // if (!email) {
//     //   setError("Please enter an email.");
//     //   return;
//     // }

//       try {
//         const response = await axios.post("http://localhost:8080/api/auth/send-otp", { email }); // ensure correct port
//         console.log("OTP sent:", response.data);
//         setSentOtp(true);
//         setError("");
//       } catch (error) {
//         console.error("Send OTP error:", error.response?.data || error.message);
//         setError(error.response?.data || "Failed to send OTP");
//       }
//     };
    


//     const handleVerifyOtp = async () => {
//       try {
//         const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
//           email,
//           otp,
//         });
    
//         console.log("Verification success:", response.data);
//         setOtpVerified(true);
//       } catch (error) {
//         console.error("OTP verification failed:", error.response?.data || error.message);
//         setError("OTP verification failed");
//       }
//     };
//     if (step === 'details' && otpVerified) {
//       return <UserDetailsForm email={email} onRegisterSuccess={() => setStep('done')} />;
//     }
    

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const passwordRegex = /^[a-zA-Z0-9]{6}$/;
//     if (!passwordRegex.test(formData.password)) {
//       setError("Password must be exactly 6 alphanumeric characters.");
//       return;
//     }

//     try {
//       await axios.post("/api/auth/register", { email, ...formData });
//       alert("Registration successful! Please login.");
//       navigate("/");
//     } catch (err) {
//       setError("Registration failed.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <h2>Register</h2>

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             {!sentOtp ? (
//               <button onClick={handleSendOtp}>Send OTP</button>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//                 <button onClick={handleVerifyOtp}>Verify OTP</button>
//               </>
//             )}
//           </>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleRegister}>
//             <input type="email" value={email} readOnly className="readonly-input" />

//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleFormChange}
//               required
//             />

//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleFormChange}
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="6-character Alphanumeric Password"
//               value={formData.password}
//               onChange={handleFormChange}
//               required
//             />

//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number (optional)"
//               value={formData.phone}
//               onChange={handleFormChange}
//             />

//             <button type="submit">Register</button>
//           </form>
//         )}

//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;

import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import UserDetailsForm from "./UserDetailsForm";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter an email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/send-otp", { email });
      console.log("OTP sent:", response.data);
      setSentOtp(true);
      setError("");
    } catch (error) {
      console.error("Send OTP error:", error.response?.data || error.message);
      setError(error.response?.data || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
        email,
        otp,
      });
      console.log("OTP verified:", response.data);
      setOtpVerified(true);
      setError("");
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error.message);
      setError("OTP verification failed. Please try again.");
    }
  };

  const handleRegisterSuccess = () => {
    alert("Registration successful! Please login.");
    navigate("/"); // Redirect to login page
  };

  if (otpVerified) {
    return <UserDetailsForm email={email} onRegisterSuccess={handleRegisterSuccess} />;
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {sentOtp && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        {!sentOtp ? (
          <button onClick={handleSendOtp}>Send OTP</button>
        ) : (
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;

