import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GenderPreferenceForm.css"; // Optional: style it as needed

const GenderPreferenceForm = () => {
    const navigate = useNavigate();
  const [genderPreference, setGenderPreference] = useState("");
  const [petFree, setPetFree] = useState(false);
  const [smokeFree, setSmokeFree] = useState(false);
  const [handicapFriendly, setHandicapFriendly] = useState(false);

  const userEmail = sessionStorage.getItem("userEmail");
  const fromLocation = sessionStorage.getItem("fromLocation");
  const toLocation = sessionStorage.getItem("toLocation");
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");
  const seats = sessionStorage.getItem("seats");
  const stopovers = JSON.parse(sessionStorage.getItem("stopovers") || "[]");
  const email = sessionStorage.getItem("userEmail"); // or pass as prop
const id=1;
const vehicleData = JSON.parse(sessionStorage.getItem("vehicleData") || "{}");
const fareSegments = JSON.parse(sessionStorage.getItem("fareSegments") || "[]");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionData = {
      email,
      genderPreference,
      petFree,
      smokeFree,
      handicapFriendly,
    };

    console.log("From Location:", fromLocation);
    console.log("To Location:", toLocation);
    console.log("Ride Date:", rideDate);
    console.log("Ride Time:", rideTime);
    console.log("Seats Available:", seats);
    console.log("Owner Email:", userEmail);
    console.log("Stepover:", stopovers);
    //console.log(vehicleData.model);
    console.log("THIS PAGE",descriptionData);

    try {
      //await axios.post("http://localhost:8080/api/ride/description/save", descriptionData);
      await axios.post("http://localhost:8080/api/ride/description/save", descriptionData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      sessionStorage.setItem("fareSegments", JSON.stringify(fareSegments));

      sessionStorage.setItem("genderPreference", genderPreference);
      sessionStorage.setItem("petFree", petFree);
      sessionStorage.setItem("smokeFree", smokeFree);
      sessionStorage.setItem("handicapFriendly", handicapFriendly);
      sessionStorage.setItem("vehicleData", JSON.stringify(vehicleData));
// then navigate to the next page

      alert("Preferences saved successfully!");
      navigate('/done');
      // Optionally redirect to next page here
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Failed to save preferences. Try again.");
    }
  };

  return (
    <div className="gender-preference-form-container">
      <h2>Choose Gender and Ride Preferences</h2>
      <form onSubmit={handleSubmit} className="gender-preference-form">
        {/* Gender Preference */}
        <div className="form-group">
          <label>Gender Preference:</label>
          <div>
            <label>
              <input
                type="radio"
                value="MALE"
                checked={genderPreference === "MALE"}
                onChange={(e) => setGenderPreference(e.target.value)}
              />
              Male 👨
            </label>
            <label>
              <input
                type="radio"
                value="FEMALE"
                checked={genderPreference === "FEMALE"}
                onChange={(e) => setGenderPreference(e.target.value)}
              />
              Female 👩
            </label>
            <label>
              <input
                type="radio"
                value="BOTH"
                checked={genderPreference === "BOTH"}
                onChange={(e) => setGenderPreference(e.target.value)}
              />
              Both 🧑‍🤝‍🧑
            </label>
          </div>
        </div>

        {/* Description Preferences */}
        <div className="form-group">
          <label>Additional Preferences:</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={petFree}
                onChange={(e) => setPetFree(e.target.checked)}
              />
              Pet Free 🐶🚫
            </label>
            <label>
              <input
                type="checkbox"
                checked={smokeFree}
                onChange={(e) => setSmokeFree(e.target.checked)}
              />
              Smoke Free 🚭
            </label>
            <label>
              <input
                type="checkbox"
                checked={handicapFriendly}
                onChange={(e) => setHandicapFriendly(e.target.checked)}
              />
              Handicap Friendly ♿
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default GenderPreferenceForm;
