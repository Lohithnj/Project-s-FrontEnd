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
import FareCalculationPage from './components/FareCalculationPage'; // Import the page
import VehicleDetailsForm from './components/VehicleDetailsForm';
import GenderPreferenceForm from './components/GenderPreferenceForm';
import RidePublishPage from './components/RidePublishPage';
import CustomerSearchPage from './components/CustomerSearchPage';
import SearchResultsPage from './components/SearchResultsPage';
import BookingSuccessPage from './components/BookingConfirmation';
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
        <Route path="/calculateFare" element={<FareCalculationPage />} />
        <Route path="/vehicle" element={<VehicleDetailsForm />} />
        <Route path="/gender-preference" element={<GenderPreferenceForm />} />
        <Route path="/done" element={<RidePublishPage />} />
        <Route path="/customer-search" element={<CustomerSearchPage />} />
        <Route path="/searchResults" element={<SearchResultsPage />} />

<Route path="/bookingSuccess" element={<BookingSuccessPage />} />
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
