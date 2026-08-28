import { useNavigate } from "react-router-dom";

function SOSButton() {
  const navigate = useNavigate();

  const triggerSOS = () => {
    navigate("/emergency", {
      state: {
        autoStart: true,
      },
    });
  };

  return (
    <div className="sos-container">
      <button
        className="sos-button"
        onClick={triggerSOS}
      >
        SOS
      </button>

      <p>Emergency? Press SOS</p>
    </div>
  );
}

export default SOSButton;