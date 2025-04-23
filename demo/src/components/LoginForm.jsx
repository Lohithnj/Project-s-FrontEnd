import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      
      // Save user email or ID for session if needed
      sessionStorage.setItem('userEmail', formData.email);
  
      // 👇 REDIRECT to role selection after login
      window.location.href = '/select-role';
  
    } catch (err) {
      alert("Login failed: " + err.response.data);
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-box">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <p>New here? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}

export default LoginForm;
