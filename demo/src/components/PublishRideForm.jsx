// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
// import { useNavigate } from "react-router-dom";
// import './PublishRideForm.css';

// const libraries = ["places"];
// const center = { lat: 13.0827, lng: 80.2707 }; // Default to Chennai

// function PublishRideForm() {
//   const navigate = useNavigate();
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDmdEqBjyXByaQE5d7E14dU_gm1yeqZaXs",
//     libraries,
//   });

//   const [username, setUsername] = useState('');
//   const [rideDate, setRideDate] = useState("");
//   const [rideTime, setRideTime] = useState("");
//   const [seats, setSeats] = useState(1);

//   const fromRef = useRef();
//   const toRef = useRef();

//   useEffect(() => {
//     const storedUsername = sessionStorage.getItem('userName');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const fromLocation = fromRef.current?.getPlace()?.formatted_address || fromRef.current?.getPlace()?.name;
//     const toLocation = toRef.current?.getPlace()?.formatted_address || toRef.current?.getPlace()?.name;
  

//     console.log("From Location:", fromLocation);
//     console.log("To Location:", toLocation);
//     console.log("Ride Date:", rideDate);
//     console.log("Ride Time:", rideTime);
//     console.log("Seats Available:", seats);
//     console.log("Owner Email:", username);

//     const payload = {
//       ownerEmail: username,
//       fromLocation,
//       toLocation,
//       rideDate,
//       rideTime,
//       seatsAvailable: seats,
//       stopovers: []
//     };
//     console.log("Payload to be sent:", payload);
  
//     try {
//       const res = await axios.post("http://localhost:8080/api/ride/publish", payload);
//       if (res.status === 200) {
//         // ✅ Save data for next page
//         sessionStorage.setItem("fromLocation", fromLocation);
//         sessionStorage.setItem("toLocation", toLocation);
//         sessionStorage.setItem("rideDate", rideDate);
//         sessionStorage.setItem("rideTime", rideTime);
//         sessionStorage.setItem("seats", seats);
//         sessionStorage.setItem("rideId", res.data.rideId); // This is useful if you want to link stopovers to rideId
  
//         navigate("/route");  // Navigate to the route map page
//       } else {
//         alert("Failed to publish ride");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred while publishing the ride");
//     }
//   };
  

//   if (!isLoaded) return <div className="loading">Loading Maps...</div>;

//   return (
//     <div className="publish-ride-container">
//       <div className="form-section">
//         <h2>Publish Your Ride</h2>
//         {username && <p className="welcome-message">Welcome, <strong>{username}</strong></p>}
        
//         <form className="ride-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>From Location</label>
//             <div className="autocomplete-input">
//               <Autocomplete onLoad={autocomplete => (fromRef.current = autocomplete)}>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter starting point"
//                   required
//                 />
//               </Autocomplete>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>To Location</label>
//             <div className="autocomplete-input">
//               <Autocomplete onLoad={autocomplete => (toRef.current = autocomplete)}>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter destination"
//                   required
//                 />
//               </Autocomplete>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               className="form-control"
//               value={rideDate}
//               onChange={(e) => setRideDate(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Time</label>
//             <input
//               type="time"
//               className="form-control"
//               value={rideTime}
//               onChange={(e) => setRideTime(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Available Seats</label>
//             <input
//               type="number"
//               className="form-control"
//               value={seats}
//               onChange={(e) => setSeats(e.target.value)}
//               min={1}
//               max={4}
//               required
//             />
//           </div>

//           <button type="submit" className="submit-btn">Next</button>
//         </form>
//       </div>

//       <div className="map-section">
//         <GoogleMap
//           zoom={8}
//           center={center}
//           mapContainerClassName="map-container"
//         />
//       </div>
//     </div>
//   );
// }

// export default PublishRideForm;




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import './PublishRideForm.css';

const libraries = ["places"];
const center = { lat: 13.0827, lng: 80.2707 }; // Default to Chennai

function PublishRideForm() {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmdEqBjyXByaQE5d7E14dU_gm1yeqZaXs",
    libraries,
  });

  const [userEmail, setUserEmail] = useState('');
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [seats, setSeats] = useState(1);

  const fromRef = useRef();
  const toRef = useRef();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail'); // Changed from userName to userEmail
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fromLocation = fromRef.current?.getPlace()?.formatted_address || fromRef.current?.getPlace()?.name;
    const toLocation = toRef.current?.getPlace()?.formatted_address || toRef.current?.getPlace()?.name;
  
    console.log("From Location:", fromLocation);
    console.log("To Location:", toLocation);
    console.log("Ride Date:", rideDate);
    console.log("Ride Time:", rideTime);
    console.log("Seats Available:", seats);
    console.log("Owner Email:", userEmail);
    
    const payload = {
      ownerEmail: userEmail, // Using userEmail instead of username
      fromLocation,
      toLocation,
      rideDate,
      rideTime,
      seatsAvailable: seats,
      stopovers: []
    };
    
    console.log("Payload to be sent:", payload);
  
    try {
      const res = await axios.post("http://localhost:8080/api/ride/publish", payload);
      if (res.status === 200) {
        sessionStorage.setItem("fromLocation", fromLocation);
        sessionStorage.setItem("toLocation", toLocation);
        sessionStorage.setItem("rideDate", rideDate);
        sessionStorage.setItem("rideTime", rideTime);
        sessionStorage.setItem("seats", seats);
        sessionStorage.setItem("rideId", res.data.rideId);
  
        navigate("/route");
      } else {
        alert("Failed to publish ride");
      }
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      alert("An error occurred while publishing the ride");
    }
  };

  if (!isLoaded) return <div className="loading">Loading Maps...</div>;

  return (
    <div className="publish-ride-container">
      <div className="form-section">
        <h2>Publish Your Ride</h2>
        {userEmail && <p className="welcome-message">Welcome, <strong>{userEmail}</strong></p>}
        
        <form className="ride-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From Location</label>
            <div className="autocomplete-input">
              <Autocomplete 
                onLoad={autocomplete => (fromRef.current = autocomplete)}
                restrictions={{country: "in"}} // Restrict to India
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter starting point"
                  required
                />
              </Autocomplete>
            </div>
          </div>

          <div className="form-group">
            <label>To Location</label>
            <div className="autocomplete-input">
              <Autocomplete 
                onLoad={autocomplete => (toRef.current = autocomplete)}
                restrictions={{country: "in"}}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter destination"
                  required
                />
              </Autocomplete>
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={rideDate}
              onChange={(e) => setRideDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              value={rideTime}
              onChange={(e) => setRideTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Available Seats</label>
            <input
              type="number"
              className="form-control"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))} // Ensure number type
              min={1}
              max={10}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Next</button>
        </form>
      </div>

      <div className="map-section">
        <GoogleMap
          zoom={8}
          center={center}
          mapContainerClassName="map-container"
        />
      </div>
    </div>
  );
}

export default PublishRideForm;
