import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_RECORDING_DURATION = 30; // seconds

export default function EmergencyCapture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startedRef = useRef(false);
  const timerRef = useRef(null);

  const navigate = useNavigate();

  const [status, setStatus] = useState("Starting emergency system...");
  const [error, setError] = useState("");

  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] =
    useState("Getting your location...");

  const [secondsLeft, setSecondsLeft] = useState(
    MAX_RECORDING_DURATION
  );

  const [isRecording, setIsRecording] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);

  // ================= LOCATION =================

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setLocation(userLocation);
        setLocationStatus("Location captured successfully");
      },
      (locationError) => {
        console.error("Location error:", locationError);

        setLocationStatus(
          "Location unavailable - recording will continue"
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ================= STOP RECORDING =================

  const stopRecording = () => {
    if (
      recorderRef.current &&
      recorderRef.current.state !== "inactive"
    ) {
      recorderRef.current.stop();
    }

    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  // ================= SAVE EMERGENCY =================

  const saveEmergencyReport = (recordingBlob) => {
    const reportId =
      "SOS-" + Math.floor(100000 + Math.random() * 900000);

    const report = {
      id: reportId,

      type: "SOS Emergency",

      status: "Submitted",

      createdAt: new Date().toISOString(),

      location: location,

      recording: recordingBlob
        ? {
            name: "sos-emergency-recording.webm",
            type: recordingBlob.type,
            size: recordingBlob.size,
          }
        : null,
    };

    const oldReports = JSON.parse(
      localStorage.getItem("campusSafeReports") || "[]"
    );

    localStorage.setItem(
      "campusSafeReports",
      JSON.stringify([report, ...oldReports])
    );

    console.log("Emergency report saved:", report);

    setStatus(
      `🚨 Emergency sent successfully — Report ID: ${reportId}`
    );

    setRecordingStopped(true);
  };

  // ================= START RECORDING =================

  const startRecording = (stream) => {
    if (!window.MediaRecorder) {
      setStatus(
        "Camera is active, but recording is not supported in this browser"
      );
      return;
    }

    try {
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordingBlob = new Blob(
          chunksRef.current,
          {
            type: recorder.mimeType || "video/webm",
          }
        );

        saveEmergencyReport(recordingBlob);

        // Stop camera and microphone after recording
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });

          streamRef.current = null;
        }
      };

      recorder.start();

      setIsRecording(true);

      setStatus(
        "🔴 SOS ACTIVE — Camera and microphone are recording"
      );

      // ================= TIMER =================

      let remaining = MAX_RECORDING_DURATION;

      setSecondsLeft(remaining);

      timerRef.current = setInterval(() => {
        remaining -= 1;

        setSecondsLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timerRef.current);

          stopRecording();
        }
      }, 1000);
    } catch (recordError) {
      console.error("Recording error:", recordError);

      setError(
        `${recordError.name}: ${recordError.message}`
      );
    }
  };

  // ================= START CAMERA =================

  useEffect(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    async function startEmergencySystem() {
      try {
        setStatus(
          "Requesting camera and microphone access..."
        );

        // Start location request
        getLocation();

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
            },
            audio: true,
          });

        streamRef.current = stream;

        // Show live camera preview
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          try {
            await videoRef.current.play();
          } catch (playError) {
            console.log(
              "Video play warning:",
              playError
            );
          }
        }

        // Start recording automatically
        startRecording(stream);
      } catch (err) {
        console.error("Camera error:", err);

        setError(`${err.name}: ${err.message}`);

        setStatus(
          "Camera or microphone could not start"
        );
      }
    }

    startEmergencySystem();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // ================= STOP EVERYTHING =================

  const stopEverything = () => {
    clearInterval(timerRef.current);

    if (
      recorderRef.current &&
      recorderRef.current.state !== "inactive"
    ) {
      recorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }
  };

  const goHome = () => {
    stopEverything();

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>🚨 SOS EMERGENCY ACTIVE</h1>

      <p
        style={{
          color: isRecording ? "#ef4444" : "#94a3b8",
          fontWeight: "bold",
        }}
      >
        {status}
      </p>

      {/* TIMER */}

      {!recordingStopped && (
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: "20px",
          }}
        >
          ⏱ Recording time remaining: {secondsLeft}s
        </div>
      )}

      {/* LIVE CAMERA */}

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          background: "black",
          borderRadius: "15px",
          overflow: "hidden",
          minHeight: "400px",
          border: isRecording
            ? "3px solid #ef4444"
            : "3px solid #334155",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            minHeight: "400px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* SYSTEM STATUS */}

      <div
        style={{
          maxWidth: "700px",
          margin: "20px auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "18px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontSize: "28px" }}>
            📹
          </div>

          <strong>Camera</strong>

          <p>
            {recordingStopped
              ? "Stopped"
              : "Live and recording"}
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "18px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontSize: "28px" }}>
            🎤
          </div>

          <strong>Microphone</strong>

          <p>
            {recordingStopped
              ? "Stopped"
              : "Recording audio"}
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "18px",
            borderRadius: "12px",
          }}
        >
          <div style={{ fontSize: "28px" }}>
            📍
          </div>

          <strong>Location</strong>

          <p>{locationStatus}</p>

          {location && (
            <small>
              {location.latitude.toFixed(5)},
              {" "}
              {location.longitude.toFixed(5)}
            </small>
          )}
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            maxWidth: "700px",
            margin: "20px auto",
            padding: "20px",
            background: "#7f1d1d",
            borderRadius: "10px",
          }}
        >
          <h3>Error</h3>

          <p>{error}</p>
        </div>
      )}

      {/* STOP BUTTON */}

      <button
        onClick={goHome}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "10px",
          border: "none",
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Stop Emergency & Return Home
      </button>
    </div>
  );
}