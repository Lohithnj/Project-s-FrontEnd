// import { useState } from "react";
// import axios from "axios";
// import './VehicleDetailsForm.css'; // Create this CSS file

// const VehicleDetailsForm = () => {
//   const [model, setModel] = useState("");
//   const [licensePlate, setLicensePlate] = useState("");
//   const [rcNumber, setRcNumber] = useState("");
//   const [carImage, setCarImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//    // const userId = sessionStorage.getItem("userId");
//     const userId=26;
//     const vehicleData = {
//       model,
//       licensePlate,
//       rcNumber,
//       carImageUrl: carImage ? `/uploads/${carImage.name}` : null,
//     };


//     console.log("Id",userId);
//     console.log("Data",vehicleData);
//     try {
//       await axios.post(`http://localhost:8080/api/vehicle/save?userId=${userId}`, vehicleData, {
//         headers: { "Content-Type": "application/json" }
//       });
//       alert("Vehicle details saved successfully!");
//     } catch (error) {
//       console.error("Error saving vehicle:", error);
//       alert("Failed to save vehicle details. Please try again.");
//     }
//   };

//   return (
//     <div className="vehicle-form-container">
//       <h2 className="form-title">Add Vehicle Details</h2>
//       <form onSubmit={handleSubmit} className="vehicle-form">
//         <div className="form-group">
//           <label className="form-label">Vehicle Model</label>
//           <input
//             type="text"
//             className="form-input"
//             placeholder="e.g., Swift DZire"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">License Plate Number</label>
//           <input
//             type="text"
//             className="form-input"
//             placeholder="e.g., TN-09-AB-1234"
//             value={licensePlate}
//             onChange={(e) => setLicensePlate(e.target.value)}
//             pattern="^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$"
//             title="Format: TN-09-AB-1234"
//             required
//           />
//           <small className="input-hint">Format: TN-09-AB-1234 (State-Code - District-Code - Series - Number)</small>
//         </div>

//         <div className="form-group">
//           <label className="form-label">RC Number</label>
//           <input
//             type="text"
//             className="form-input"
//             placeholder="e.g., DL04C1234567890"
//             value={rcNumber}
//             onChange={(e) => setRcNumber(e.target.value)}
//             pattern="^[A-Z]{2}\d{2}[A-Z]{1}\d{10}$"
//             title="Format: DL04C1234567890"
//             required
//           />
//           <small className="input-hint">Format: DL04C1234567890 (State + Code + Letter + 10-digit number)</small>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Vehicle Image</label>
//           <div className="file-upload-wrapper">
//             <label className="file-upload-label">
//               {carImage ? carImage.name : "Choose an image..."}
//               <input
//                 type="file"
//                 className="file-upload-input"
//                 accept="image/*"
//                 onChange={(e) => setCarImage(e.target.files[0])}
//               />
//             </label>
//           </div>
//         </div>

//         <button type="submit" className="submit-button">
//           Save Vehicle Details
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VehicleDetailsForm;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import './VehicleDetailsForm.css'; // Make sure this CSS file exists

const VehicleDetailsForm = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [carImage, setCarImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

  const userEmail = sessionStorage.getItem("userEmail");
  const fromLocation = sessionStorage.getItem("fromLocation");
  const toLocation = sessionStorage.getItem("toLocation");
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");
  const seats = sessionStorage.getItem("seats");
  const stopovers = JSON.parse(sessionStorage.getItem("stopovers") || "[]");
  const email = sessionStorage.getItem("userEmail");  // Ensure email is stored in sessionStorage during login/OTP step

    //const fareSegments = JSON.parse(sessionStorage.getItem("fareSegments"));
    const fareSegments = JSON.parse(sessionStorage.getItem("fareSegments") || "[]");

    if (!email) {
      toast.error("User email not found. Please login again.");
      return;
    }

    const vehicleData = {
      model,
      licensePlate,
      rcNumber,
      carImageUrl: carImage ? `/uploads/${carImage.name}` : null, // you can improve this later
    };

    console.log("Email:", email);
    console.log("Vehicle Data:", vehicleData);
    console.log("Fares",fareSegments);

    try {
      await axios.post(`http://localhost:8080/api/vehicle/save?email=${email}`, vehicleData, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Vehicle details saved successfully!");
      sessionStorage.setItem("fareSegments", JSON.stringify(fareSegments));
      sessionStorage.setItem('vehicleData', JSON.stringify(vehicleData));
      navigate("/gender-preference");
      //navigate()
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Failed to save vehicle details. Please try again.");
    }
  };

  return (
    <div className="vehicle-form-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
      <h2 className="form-title">Add Vehicle Details</h2>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-group">
          <label className="form-label">Vehicle Model</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Swift DZire"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">License Plate Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., TN-09-AB-1234"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            pattern="^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$"
            title="Format: TN-09-AB-1234"
            required
          />
          <small className="input-hint">Format: TN-09-AB-1234 (State-Code - District-Code - Series - Number)</small>
        </div>

        <div className="form-group">
          <label className="form-label">RC Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., DL04C1234567890"
            value={rcNumber}
            onChange={(e) => setRcNumber(e.target.value)}
            pattern="^[A-Z]{2}\d{2}[A-Z]{1}\d{10}$"
            title="Format: DL04C1234567890"
            required
          />
          <small className="input-hint">Format: DL04C1234567890 (State + Code + Letter + 10-digit number)</small>
        </div>

        <div className="form-group">
          <label className="form-label">Vehicle Image</label>
          <div className="file-upload-wrapper">
            <label className="file-upload-label">
              {carImage ? carImage.name : "Choose an image..."}
              <input
                type="file"
                className="file-upload-input"
                accept="image/*"
                onChange={(e) => setCarImage(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Vehicle Details
        </button>
      </form>
    </div>
  );
};

export default VehicleDetailsForm;
