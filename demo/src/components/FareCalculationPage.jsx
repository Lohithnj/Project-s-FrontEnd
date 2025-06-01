import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './FareCalculationPage.css';

const FareCalculationPage = () => {
  const navigate = useNavigate();
  const [fareSegments, setFareSegments] = useState([]);
  const [adjustments, setAdjustments] = useState({});

  // Get details from sessionStorage
  const userEmail = sessionStorage.getItem("userEmail");
  const fromLocation = sessionStorage.getItem("fromLocation");
  const toLocation = sessionStorage.getItem("toLocation");
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");
  const seats = sessionStorage.getItem("seats");

  const stopovers = JSON.parse(sessionStorage.getItem("stopovers") || "[]");

  const payload = {
    fromLocation: fromLocation,
    toLocation: toLocation,
    stopovers: stopovers.filter(s => s),
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/fare/calculateFareWithStopovers", payload)
      .then((response) => {
        setFareSegments(response.data);

        // Default 30% adjustment
        const defaultAdjustments = {};
        response.data.forEach((segment, index) => {
          defaultAdjustments[index] = 30;
        });
        setAdjustments(defaultAdjustments);
      })
      .catch((error) => {
        console.error("Error calculating fare:", error);
      });
  }, []);

  const handleIncrement = (index) => {
    setAdjustments((prev) => ({
      ...prev,
      [index]: prev[index] + 1,
    }));
  };

  const handleDecrement = (index) => {
    setAdjustments((prev) => ({
      ...prev,
      [index]: prev[index] > 0 ? prev[index] - 1 : 0,
    }));
  };

  const calculateAdjustedFare = (baseFare, adjustmentPercent) => {
    return (baseFare + (baseFare * adjustmentPercent) / 100).toFixed(2);
  };

  // 🆕 Save button function
  const handleSaveFares = async () => {
    const rideId = sessionStorage.getItem("rideId");
    if (!rideId) {
      alert("Ride ID not found. Please create a ride first.");
      return;
    }
    //working part
    // const finalSegmentFares = fareSegments.map((segment, index) => ({
    //   fromLocation: segment.fromLocation,
    //   toLocation: segment.toLocation,
    //   adjustedFare: parseFloat(calculateAdjustedFare(segment.fare, adjustments[index]))
    // }));

    const finalSegmentFares = fareSegments.map((segment, index) => ({
      fromLocation: segment.fromLocation,
      toLocation: segment.toLocation,
      baseFare: segment.baseFare,  // add this
      adjustedFare: parseFloat(calculateAdjustedFare(segment.baseFare, adjustments[index]))
    }));
    

    //console.log("Saving fares:", finalSegmentFares);
    const fareRequest = {
      rideId: rideId,        // Include the rideId
      fareSegments: finalSegmentFares   // Include the fare segments
  };
  console.log("FAREREQUEST: ",fareRequest);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/fare/saveSegmentFares",
        fareRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        alert("Fare segments saved successfully!");
        //sessionStorage.setItem(rideId);
        //console.log(finalSegmentFares);
        sessionStorage.setItem("fareSegments", JSON.stringify(fareSegments));
        navigate("/vehicle");
      } else {
        alert("Failed to save fares");
      }
    } catch (error) {
      console.error("Error saving fares:", error);
      alert("An error occurred while saving fares");
    }
  };

  return (
    <div className="fare-calculation-container">
      <h2>Fare Calculation</h2>

      <div className="user-details">
        <p><strong>User Email:</strong> {userEmail}</p>
        <p><strong>From:</strong> {fromLocation}</p>
        <p><strong>To:</strong> {toLocation}</p>
        <p><strong>Date:</strong> {rideDate}</p>
        <p><strong>Time:</strong> {rideTime}</p>
        <p><strong>Seats:</strong> {seats}</p>
        <p><strong>Stopovers:</strong> {stopovers.join(": ")}</p>
      </div>

      <h3>Fare Segments</h3>
      {fareSegments.length > 0 ? (
        <ul>
          {fareSegments.map((segment, index) => (
            <li key={index} className="fare-segment">
              <div>
                <strong>{segment.fromLocation} ➔ {segment.toLocation}</strong><br />
                Base Fare: ₹{segment.baseFare ?? "N/A"}
              </div>

              <div className="adjustment-section">
                <button onClick={() => handleDecrement(index)}>-</button>
                <span>{adjustments[index]}%</span>
                <button onClick={() => handleIncrement(index)}>+</button>
              </div>

              <div>
                <strong>Adjusted Fare:</strong> ₹{calculateAdjustedFare(segment.baseFare, adjustments[index])}
              </div>

              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading fare segments...</p>
      )}

      {/* 🆕 Save Button */}
      <button onClick={handleSaveFares} className="save-btn">
        Save Fares
      </button>
    </div>
  );
};

export default FareCalculationPage;
