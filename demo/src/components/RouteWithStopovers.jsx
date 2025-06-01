import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RouteWithStopovers.css";

const libraries = ["places"];
const center = { lat: 13.0827, lng: 80.2707 };

const RouteWithStopovers = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmdEqBjyXByaQE5d7E14dU_gm1yeqZaXs",
    libraries,
  });

  const navigate = useNavigate();
  const [directions, setDirections] = useState(null);
  const [stopovers, setStopovers] = useState([""]);
  const stopoverRefs = useRef([]);
  const from = sessionStorage.getItem("fromLocation");
  const to = sessionStorage.getItem("toLocation");
  const rideId = sessionStorage.getItem("rideId");
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from,
          destination: to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [isLoaded, from, to]);

  const handleAddStopover = () => {
    if (stopovers.length < 4) {
      setStopovers([...stopovers, ""]);
    }
  };

  const handleStopoverChange = (index, place) => {
    const updated = [...stopovers];
    updated[index] = place.formatted_address || place.name;
    setStopovers(updated);
  };

  const handleSubmit = async () => {
    if (!rideId) {
      alert("Ride ID not found. Please publish the ride first.");
      return;
    }

    console.log("rideId:", rideId);
    console.log("ridedetails:", rideDate);
    const payload = stopovers.filter(s => s); // Remove empty entries
     console.log(payload);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/ride/addStopovers?rideId=${rideId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Stopovers added successfully!");
        sessionStorage.setItem("stopovers", JSON.stringify(stopovers.filter(s => s)));
        navigate("/calculateFare");
      } else {
        alert("Failed to add stopovers");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding stopovers");
    }
  };

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <div className="route-container">
      <h2>Route with Stopovers</h2>
      <GoogleMap zoom={8} center={center} mapContainerClassName="route-map">
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div className="stopover-section">
        <h4>Add Stopovers (max 4):</h4>
        {stopovers.map((_, index) => (
          <div key={index} className="stopover-input">
            <Autocomplete
              onLoad={(ref) => (stopoverRefs.current[index] = ref)}
              onPlaceChanged={() =>
                handleStopoverChange(index, stopoverRefs.current[index].getPlace())
              }
            >
              <input type="text" placeholder={`Stopover ${index + 1}`} />
            </Autocomplete>
          </div>
        ))}
        {stopovers.length < 4 && (
          <button onClick={handleAddStopover}>+ Add Stopover</button>
        )}

        <button onClick={handleSubmit} className="submit-btn">
          Submit Stopovers
        </button>
      </div>
    </div>
  );
};
export default RouteWithStopovers;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   GoogleMap,
//   DirectionsRenderer,
//   Autocomplete,
//   useLoadScript,
// } from "@react-google-maps/api";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./RouteWithStopovers.css";

// const libraries = ["places"];
// const center = { lat: 13.0827, lng: 80.2707 };

// const RouteWithStopovers = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDmdEqBjyXByaQE5d7E14dU_gm1yeqZaXs",
//     libraries,
//   });

//   const navigate = useNavigate();
//   const [directions, setDirections] = useState(null);
//   const [stopovers, setStopovers] = useState([""]);
//   const stopoverRefs = useRef([]);
//   const from = sessionStorage.getItem("fromLocation");
//   const to = sessionStorage.getItem("toLocation");
//   const rideId = sessionStorage.getItem("rideId");
//   const [adjustmentPercent, setAdjustmentPercent] = useState(0); // For fare adjustment

//   useEffect(() => {
//     if (isLoaded) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: from,
//           destination: to,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           }
//         }
//       );
//     }
//   }, [isLoaded, from, to]);

//   const handleAddStopover = () => {
//     if (stopovers.length < 4) {
//       setStopovers([...stopovers, ""]);
//     }
//   };

//   const handleStopoverChange = (index, place) => {
//     const updated = [...stopovers];
//     updated[index] = place.formatted_address || place.name;
//     setStopovers(updated);
//   };

//   const handleNext = async () => {
//     try {
//       // Collect data for fare calculation
//       const fareData = {
//         fromLocation: from,
//         toLocation: to,
//         adjustmentPercent: adjustmentPercent, // +30 or -30
//       };

//       const response = await axios.post("/api/ride/calculateFare", fareData);
//       const { baseFare, adjustedFare } = response.data;

//       // Save the base and adjusted fare in state or send to next page
//       console.log("Base Fare:", baseFare);
//       console.log("Adjusted Fare:", adjustedFare);

//       // Navigate to the next page with fare info
//       navigate({
//         pathname: "/nextPage",
//         state: { baseFare, adjustedFare }, // Pass data to next page
//       });
//     } catch (error) {
//       console.error("Error calculating fare:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!rideId) {
//       alert("Ride ID not found. Please publish the ride first.");
//       return;
//     }

//     console.log("rideId:", rideId);
//     const payload = stopovers.filter((s) => s); // Remove empty entries
//     console.log(payload);

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/ride/addStopovers?rideId=${rideId}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.status === 200) {
//         alert("Stopovers added successfully!");
//         // Call the fare calculation after stopovers are added
//         handleNext();
//       } else {
//         alert("Failed to add stopovers");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while adding stopovers");
//     }
//   };

//   return !isLoaded ? (
//     <div>Loading...</div>
//   ) : (
//     <div className="route-container">
//       <h2>Route with Stopovers</h2>
//       <GoogleMap zoom={8} center={center} mapContainerClassName="route-map">
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>

//       <div className="stopover-section">
//         <h4>Add Stopovers (max 4):</h4>
//         {stopovers.map((_, index) => (
//           <div key={index} className="stopover-input">
//             <Autocomplete
//               onLoad={(ref) => (stopoverRefs.current[index] = ref)}
//               onPlaceChanged={() =>
//                 handleStopoverChange(index, stopoverRefs.current[index].getPlace())
//               }
//             >
//               <input type="text" placeholder={`Stopover ${index + 1}`} />
//             </Autocomplete>
//           </div>
//         ))}
//         {stopovers.length < 4 && (
//           <button onClick={handleAddStopover}>+ Add Stopover</button>
//         )}

//         <button onClick={handleSubmit} className="submit-btn">
//           Submit Stopovers
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RouteWithStopovers;
