import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, DirectionsRenderer, Autocomplete, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import './RouteWithStopovers.css';

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
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");
  const ownerEmail = sessionStorage.getItem("userName");
  const seatsAvailable = sessionStorage.getItem("seats");

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
    const payload = {
      fromLocation: from,
      toLocation: to,
      rideDate,
      rideTime,
      seatsAvailable,
      ownerEmail,
      stopovers,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/ride/publishWithStops", payload);
      if (res.status === 200) {
        alert("Ride with stopovers published successfully!");
        navigate("/dashboard"); // or wherever you want to redirect
      } else {
        alert("Failed to publish ride with stopovers");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while publishing ride with stopovers");
    }
  };

  return !isLoaded ? <div>Loading...</div> : (
    <div className="route-container">
      <h2>Route with Stopovers</h2>
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerClassName="route-map"
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div className="stopover-section">
        <h4>Add Stopovers (max 4):</h4>
        {stopovers.map((_, index) => (
          <div key={index} className="stopover-input">
            <Autocomplete
              onLoad={(ref) => stopoverRefs.current[index] = ref}
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

        <button onClick={handleSubmit} className="submit-btn">Publish Ride with Stopovers</button>
      </div>
    </div>
  );
};

export default RouteWithStopovers;
