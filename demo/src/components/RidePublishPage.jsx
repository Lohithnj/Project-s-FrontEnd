import { useNavigate } from "react-router-dom";
import "./RidePublishPage.css"; // Import the CSS file

const RidePublishPage = () => {
  const navigate = useNavigate();

  const userEmail = sessionStorage.getItem("userEmail");
  const from = sessionStorage.getItem("fromLocation");
  const to = sessionStorage.getItem("toLocation");
  const rideDate = sessionStorage.getItem("rideDate");
  const rideTime = sessionStorage.getItem("rideTime");
  const seats = sessionStorage.getItem("seats");
  const fare = sessionStorage.getItem("baseFare");
  //const vehicleModel = sessionStorage.getItem("vehicleData");
  const licensePlate = sessionStorage.getItem("licensePlate");
  const fareSegments = JSON.parse(sessionStorage.getItem("fareSegments") || "[]");

  const stopovers = JSON.parse(sessionStorage.getItem("stopovers") || "[]");

  const vehicleData = JSON.parse(sessionStorage.getItem("vehicleData") || "{}");

  const genderPreference = sessionStorage.getItem("genderPreference");
const petFree = sessionStorage.getItem("petFree") === "true";
const smokeFree = sessionStorage.getItem("smokeFree") === "true";
const handicapFriendly = sessionStorage.getItem("handicapFriendly") === "true";

const totalAdjustedFare = fareSegments.reduce((sum, segment) => sum + segment.adjusted_fare, 0);
  const handlePublish = () => {
    alert("🚗 Ride Published Successfully!");
    console.log(fareSegments);
    navigate("/home");
  };

  return (
    <div className="ride-confirmation-container">
      <h2 className="ride-confirmation-title">✅ Confirm & Publish Ride</h2>
      <div className="ride-details">
        <span className="ride-detail-label">From:</span>
        <span className="ride-detail-value">{from}</span>
        
        <span className="ride-detail-label">To:</span>
        <span className="ride-detail-value">{to}</span>
        
        <span className="ride-detail-label">Date:</span>
        <span className="ride-detail-value">{rideDate}</span>
        
        <span className="ride-detail-label">Time:</span>
        <span className="ride-detail-value">{rideTime}</span>
        
        <span className="ride-detail-label">Seats:</span>
        <span className="ride-detail-value">{seats}</span>
        
        <span className="ride-detail-label">Fare:</span>
        <span className="ride-detail-value">₹{totalAdjustedFare.toFixed(2)}</span>
        
        <span className="ride-detail-label">Vehicle:</span>
        <span className="ride-detail-value">Swift</span>
        
        <span className="ride-detail-label">Stopovers:</span>
        <span className="ride-detail-value">{stopovers.join(", ") || "None"}</span>
        
        <span className="ride-detail-label">Gender Preference:</span>
        <span className="ride-detail-value">{genderPreference}</span>
        
        <span className="ride-detail-label">Pet Free:</span>
        <span className={petFree ? "status-true" : "status-false"}>
          {petFree ? "✅ Yes" : "❌ No"}
        </span>
        
        <span className="ride-detail-label">Smoke Free:</span>
        <span className={smokeFree ? "status-true" : "status-false"}>
          {smokeFree ? "✅ Yes" : "❌ No"}
        </span>
        
        <span className="ride-detail-label">Handicap Friendly:</span>
        <span className={handicapFriendly ? "status-true" : "status-false"}>
          {handicapFriendly ? "✅ Yes" : "❌ No"}
        </span>
      </div>

      <button onClick={handlePublish} className="publish-button">
        🚀 PUBLISH RIDE
      </button>
    </div>
  );
};

export default RidePublishPage;