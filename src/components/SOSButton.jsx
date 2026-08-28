import { useNavigate } from "react-router-dom";

function SOSButton() {
  const navigate = useNavigate();

  return (
    <div className="sos-container">
      <button
        className="sos-button"
        onClick={() => navigate("/emergency")}
      >
        SOS
      </button>

      <p>Emergency? Press SOS</p>
    </div>
  );
}

export default SOSButton;