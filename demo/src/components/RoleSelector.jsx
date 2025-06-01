

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function RoleSelection() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    sessionStorage.setItem('role', role);
    //sessionStorage.setItem('rideid',rideId);
    if (role === 'CUSTOMER') {
      navigate('/customer-search');
    } else if (role === 'OWNER') {
        navigate("/publish");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Select Your Role</h2>
        <button onClick={() => handleSelectRole('CUSTOMER')}>Continue as Customer</button>
        <button onClick={() => handleSelectRole('OWNER')}>Continue as Owner</button>
      </div>
    </div>
  );
}

export default RoleSelection;
