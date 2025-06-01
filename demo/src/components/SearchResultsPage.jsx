
// import React from "react";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaCar, FaUser, FaClock, FaRoad } from "react-icons/fa";
// import "./SearchResultsPage.css";

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const rides = Array.isArray(location?.state?.rides) ? location.state.rides : [];

//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [bookedRide, setBookedRide] = useState(null);
//   const calculateEndTime = (startTime, distanceKm) => {
//     const averageSpeed = 60; // km/h
//     const travelMinutes = Math.round((distanceKm / averageSpeed) * 60) + 30; // Adding 30 minutes buffer
//     const [hours, minutes] = startTime.split(":").map(Number);
//     const endDate = new Date();
//     endDate.setHours(hours);
//     endDate.setMinutes(minutes + travelMinutes);
//     return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const handleBookClick = (ride) => {
//     // Here you would typically make an API call to book the ride
//     setBookedRide(ride);
//     setShowConfirmation(true);
    
//     // Example API call:
//     // axios.post('/api/bookings', { rideId: ride.id })
//     //   .then(() => setShowConfirmation(true))
//     //   .catch(error => console.error('Booking failed:', error));
//   };

//   return (
//     <div className="search-results-container">
//       <div className="search-header">
//         <h2>Available Rides</h2>
//       </div>

//       {rides.length === 0 ? (
//         <div className="no-rides">
//           <p>No rides available matching your criteria</p>
//         </div>
//       ) : (
//         rides.map((ride, index) => (
//           <div className="ride-card" key={index}>
//             <div className="ride-header">
//               <img 
//                 src={ride.profile_icon_url || "https://via.placeholder.com/50"} 
//                 alt="Driver" 
//                 className="profile-img"
//               />
//               <div className="driver-info">
//                 <div className="driver-name">{ride.ownerName}</div>
//                 <div className="rating">★★★★☆ (21 reviews)</div>
//               </div>
//             </div>

//             <div className="route-summary">
//               <div className="route-time">
//                 <span className="time">{ride.rideTime.split(':').slice(0, 2).join(':')}</span>
//                 <FaCar className="car-icon" />
//                 <span className="time">{calculateEndTime(ride.rideTime, ride.customerDistance)}</span>
//               </div>
//               <div className="route-location">
//                 <span className="location">{ride.fromLocation}</span>
//                 <span className="separator">→</span>
//                 <span className="location">{ride.toLocation}</span>
//               </div>
//             </div>

//             <div className="ride-footer">
//               <div className="ride-meta">
//                 <div className="meta-item">
//                   <FaClock className="meta-icon" />
//                   <span>{Math.round(ride.customerDistance / 60 * 60 + 30)} min</span>
//                 </div>
//                 <div className="meta-item">
//                   <FaRoad className="meta-icon" />
//                   <span>{ride.customerDistance.toFixed(2)} km</span>
//                 </div>
//                 <div className="meta-item">
//                   <FaUser className="meta-icon" />
//                   <span>2 seats left</span>
//                 </div>
//               </div>
//               <div className="ride-actions">
//                 <div className="ride-price">₹{ride.customerFare.toFixed(2)}</div>
//                 <button className="book-button" onClick={() => handleBookClick(ride)}>Book Now</button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaCar, FaUser, FaClock, FaRoad, FaCheckCircle } from "react-icons/fa";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const rides = Array.isArray(location?.state?.rides) ? location.state.rides : [];
  const navigate = useNavigate();

  

  const calculateEndTime = (startTime, distanceKm) => {
    const averageSpeed = 60; // km/h
    const travelMinutes = Math.round((distanceKm / averageSpeed) * 60) + 30;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(hours);
    endDate.setMinutes(minutes + travelMinutes);
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  };


    
    // In a real app, you would make an API call here:
    const handleBookClick = (ride) => {
      // Simulate API call or logic
      navigate("/bookingSuccess", { state: { ride } });
    };
    

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h2>Available Rides</h2>
      </div>

      {rides.length === 0 ? (
        <div className="no-rides">
          <p>No rides available matching your criteria</p>
        </div>
      ) : (
        rides.map((ride, index) => (
          <div className="ride-card" key={index}>
            <div className="ride-header">
              <img 
                src={ride.profile_icon_url || "https://via.placeholder.com/50"} 
                alt="Driver" 
                className="profile-img"
              />
              <div className="driver-info">
                <div className="driver-name">{ride.ownerName}</div>
                <div className="rating">★★★★☆ (21 reviews)</div>
              </div>
            </div>

            <div className="route-summary">
              <div className="route-time">
                <span className="time">{ride.rideTime.split(':').slice(0, 2).join(':')}</span>
                <FaCar className="car-icon" />
                <span className="time">{calculateEndTime(ride.rideTime, ride.customerDistance)}</span>
              </div>
              <div className="route-location">
                <span className="location">{ride.fromLocation}</span>
                <span className="separator">→</span>
                <span className="location">{ride.toLocation}</span>
              </div>
            </div>

            <div className="ride-footer">
              <div className="ride-meta">
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <span>{Math.round(ride.customerDistance / 60 * 60 + 30)} min</span>
                </div>
                <div className="meta-item">
                  <FaRoad className="meta-icon" />
                  <span>{ride.customerDistance.toFixed(2)} km</span>
                </div>
                <div className="meta-item">
                  <FaUser className="meta-icon" />
                  <span>2 seats left</span>
                </div>
              </div>
              <div className="ride-actions">
                <div className="ride-price">₹{ride.customerFare.toFixed(2)}</div>
                <button className="book-button" onClick={() => handleBookClick(ride)}>Book Now</button>
              </div>
            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default SearchResultsPage;