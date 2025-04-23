import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RoleSelector from './components/RoleSelector';
import OtpRequestForm from './components/OtpRequestForm';
import OtpVerifyForm from './components/OtpVerifyForm';
import UserDetailsForm from './components/UserDetailsForm';
import PublishRideForm from "./components/PublishRideForm";
import RouteWithStopovers from './components/RouteWithStopovers';

function App() {
  const [emailSentTo, setEmailSentTo] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm email={emailSentTo} />} />
        <Route path="/select-role" element={<RoleSelector />} />
        <Route path="/publish" element={<PublishRideForm />} />
        <Route path="/route" element={<RouteWithStopovers />} />


        <Route
          path="/otp"
          element={
            !emailSentTo ? (
              <OtpRequestForm onOtpSent={setEmailSentTo} />
            ) : (
              <OtpVerifyForm email={emailSentTo} />
            )
          }
        />
       {/* <Route path="/customer/dashboard" element={<h2>Customer Dashboard</h2>} />
        <Route path="/owner/dashboard" element={<h2>Owner Dashboard</h2>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
