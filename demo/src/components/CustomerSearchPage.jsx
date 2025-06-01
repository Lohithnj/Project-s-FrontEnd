
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import './CustomerSearchPage.css';

const GOOGLE_MAPS_API_KEY = "AIzaSyDmdEqBjyXByaQE5d7E14dU_gm1yeqZaXs"; // Replace with your actual API key

const libraries = ["places"];

const knownDistricts = [
  "ariyalur", "chengalpattu", "chennai", "coimbatore", "cuddalore", "dharmapuri",
  "dindigul", "erode", "kallakurichi", "kancheepuram", "kanniyakumari", "karur",
  "krishnagiri", "madurai", "mayiladuthurai", "nagapattinam", "namakkal",
  "perambalur", "pudukkottai", "ramanathapuram", "ranipet", "salem", "sivaganga",
  "tenkasi", "thanjavur", "theni", "the nilgiris", "thoothukudi", "tiruchirappalli",
  "tirunelveli", "tirupattur", "tiruppur", "tiruvallur", "tiruvannamalai",
  "tiruvarur", "vellore", "viluppuram", "virudhunagar"
];

const extractDistrict = (location) => {
  const lowerLocation = location.toLowerCase();
  for (let district of knownDistricts) {
    if (lowerLocation.includes(district)) {
      return district;
    }
  }
  return lowerLocation; // fallback if no known district matched
};


const CustomerSearchPage = () => {
    const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [results, setResults] = useState([]);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleSearch = async () => {
    try {
      const fromDistrict = extractDistrict(from);
    const toDistrict = extractDistrict(to);
      const response = await axios.post("http://localhost:8080/api/rides/search", {
        customerFrom: from,
        customerTo: to,
        fromDistrict,
        toDistrict,
        rideDate: date,
        passengerCount: passengers
      });
  
      if (response.data.length > 0) {
        console.log("Search response data:", response.data);
        
        //navigate("/searchResults", { state: { rides: response.data } });
        navigate("/searchResults", {
          state: {
            rides: response.data,
            customerFrom: from,
            customerTo: to
          }
        });
      } else {
        alert("No rides found for the given criteria.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Network error. Please ensure the backend is running.");
    }
  };

  const handlePlaceSelect = (ref, setter) => {
    if (ref.current) {
      const place = ref.current.getPlace();
      setter(place.formatted_address || place.name);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
    <div className="search-container">
      <h2>Search for a Ride</h2>
  
      <div className="search-form">
        <div className="search-input-group autocomplete-input">
          <label>From</label>
          <Autocomplete
            onLoad={(autocomplete) => (fromRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceSelect(fromRef, setFrom)}
          >
            <input
              type="text"
              placeholder="Leaving from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="search-input"
            />
          </Autocomplete>
        </div>
  
        <div className="search-input-group autocomplete-input">
          <label>To</label>
          <Autocomplete
            onLoad={(autocomplete) => (toRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceSelect(toRef, setTo)}
          >
            <input
              type="text"
              placeholder="Going To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="search-input"
            />
          </Autocomplete>
        </div>
  
        <div className="search-input-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="search-input"
          />
        </div>
  
        <div className="search-input-group">
          <label>Passengers</label>
          <input
            type="number"
            min="1"
            max="4"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="search-input"
          />
        </div>
  
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
  
      <div className="results-container">
        <h3>Available Rides</h3>
        {results.map((ride, index) => (
          <div key={index} className="ride-card">
            <p><strong>From:</strong> {ride.from_location}</p>
            <p><strong>To:</strong> {ride.to_location}</p>
            <p><strong>Date:</strong> {ride.ride_date}</p>
            <p><strong>Time:</strong> {ride.ride_time}</p>
            <p><strong>Seats:</strong> {ride.seats_available}</p>
            <p><strong>Owner:</strong> {ride.owner_email}</p>
            <button className="book-button">Book Ride</button>
          </div>
        ))}
      </div>
    </div>
  </LoadScript>
  );
};

export default CustomerSearchPage;
