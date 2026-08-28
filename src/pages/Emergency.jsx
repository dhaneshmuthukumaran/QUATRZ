import { useNavigate } from "react-router-dom";

function Emergency() {
  const navigate = useNavigate();

  return (
    <div className="emergency-page">
      <h1>🚨 Emergency Assistance</h1>

      <p>
        You are about to send an emergency alert.
      </p>

      <button
        className="emergency-confirm"
        onClick={() => {
          alert("Emergency alert sent!");
          navigate("/home");
        }}
      >
        CONFIRM EMERGENCY
      </button>

      <button onClick={() => navigate("/home")}>
        Cancel
      </button>
    </div>
  );
}

export default Emergency;