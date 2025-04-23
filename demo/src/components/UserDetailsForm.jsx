// import React, { useState } from 'react';
// import './LoginForm.css';

// function UserDetailsForm({ email, onRegisterSuccess }) {
//   const [user, setUser] = useState({
//     email: email,
//     name: '',
//     dob: '',
//     gender: '',
//     phone: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple alphanumeric 6-char password check
//     const pwdPattern = /^[a-zA-Z0-9]{6}$/;
//     if (!pwdPattern.test(user.password)) {
//       setError('Password must be alphanumeric and exactly 6 characters.');
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user)
//       });

//       if (res.ok) {
//         setSuccess("User registered successfully!");
//         setError('');
//         onRegisterSuccess(); // callback to parent
//       } else {
//         const data = await res.text();
//         setError(data);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Something went wrong.");
//     }
//   };

//   return (
//     <div className="login-form-container">
//       <h2 className="form-title">Complete Your Registration</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
//         <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
        
//         <select name="gender" onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password (6 char alphanumeric)" onChange={handleChange} required />

//         <button type="submit">Register</button>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </form>
//     </div>
//   );
// }

// export default UserDetailsForm;
import React, { useState } from 'react';
import './LoginForm.css';

function UserDetailsForm({ email, onRegisterSuccess }) {
  const [user, setUser] = useState({
    email: email,
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pwdPattern = /^[a-zA-Z0-9]{6}$/;
    if (!pwdPattern.test(user.password)) {
      setError('Password must be alphanumeric and exactly 6 characters.');
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      if (res.ok) {
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userEmail', user.email);
        setSuccess("User registered successfully!");
        setError('');
        onRegisterSuccess(); // redirect to login
      } else {
        const data = await res.text();
        setError(data);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="form-title">Complete Your Registration</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
        
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (6 char alphanumeric)" onChange={handleChange} required />

        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}

export default UserDetailsForm;
