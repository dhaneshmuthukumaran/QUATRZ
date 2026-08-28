import { useEffect, useRef, useState } from "react";

function EmergencyCapture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const transcriptRef = useRef("");
  const locationRef = useRef(null);

  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);

  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [emergencyPackage, setEmergencyPackage] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const shouldContinueListeningRef = useRef(false);

  // Start camera and microphone
  useEffect(() => {
    startCameraAndMicrophone();
    getLocation();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // Recording timer
  useEffect(() => {
    let timer;

    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [recording]);

  // CAMERA + MICROPHONE
  const startCameraAndMicrophone = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraPermission(true);
      setMicPermission(true);
    } catch (err) {
      console.error(err);
      setError(
        "Camera and microphone permission is required."
      );
    }
  };

  // START RECORDING
  const startRecording = () => {
    if (!streamRef.current) {
      setError("Camera and microphone are not ready.");
      return;
    }

    chunksRef.current = [];

    // Find a format supported by this browser
    let mimeType = "";

    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")) {
      mimeType = "video/webm;codecs=vp9,opus";
    } else if (
      MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
    ) {
      mimeType = "video/webm;codecs=vp8,opus";
    } else if (MediaRecorder.isTypeSupported("video/webm")) {
      mimeType = "video/webm";
    }

    let recorder;

    try {
      recorder = mimeType
        ? new MediaRecorder(streamRef.current, { mimeType })
        : new MediaRecorder(streamRef.current);
    } catch (err) {
      console.error(err);
      setError("Your browser does not support video recording.");
      return;
    }

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onerror = (event) => {
      console.error("Recording error:", event);
      setError("Recording failed. Please try again.");
      setRecording(false);
    };

    recorder.onstop = () => {
      if (chunksRef.current.length === 0) {
        setError("No recording data was captured.");
        return;
      }

      const blob = new Blob(chunksRef.current, {
        type: mimeType || "video/webm",
      });

      const videoURL = URL.createObjectURL(blob);

      setRecordedVideo(videoURL);
      setRecordedBlob(blob);

      // =====================================
      // CREATE EMERGENCY PACKAGE
      // =====================================

      const emergencyData = {
        type: "SOS",

        emergencyType: "SOS",

        timestamp: new Date().toISOString(),

        location: locationRef.current
          ? {
              latitude: locationRef.current.latitude,
              longitude: locationRef.current.longitude,
            }
          : null,

        transcript: transcriptRef.current.trim(),

        anonymous: true,

        evidence: {
          type: blob.type,
          size: blob.size,
        },
      };

      setEmergencyPackage(emergencyData);

      console.log("================================");
      console.log("🚨 EMERGENCY PACKAGE CREATED");
      console.log("================================");

      console.log(emergencyData);
      console.log("🎥 Evidence Blob:", blob);
    };

    // Collect data every 1 second
    recorder.start(1000);

    setRecording(true);
    setRecordingTime(0);
    setError("");

    // Automatically start voice-to-text
    setTranscript("");

    startVoiceRecognition();
  };

  // STOP RECORDING
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    // Stop voice-to-text
    stopVoiceRecognition();

    // Stop video/audio recording
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    setRecording(false);

    console.log("Recording stopped.");
  };

  // RECORD AGAIN
  const recordAgain = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }

    setRecordedVideo(null);
    setRecordingTime(0);
    setError("");

    // Restart camera preview
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  };

  // TIMER
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        locationRef.current = {
          latitude,
          longitude,
        };

        setLocationLoading(false);

        console.log("Student location:", {
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error(error);

        setLocationLoading(false);

        setError(
          "Unable to get your location. Please allow location access."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice-to-text started");
    };

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript;
      }

      if (text.trim()) {
        setTranscript((previous) => {
          const updated = previous + " " + text;

          transcriptRef.current = updated;

          return updated;
        });
      }
    };

    recognition.onerror = (event) => {
      console.log(
        "Speech recognition:",
        event.error
      );
    };

    recognition.onend = () => {
      setIsListening(false);

      // Chrome may stop recognition automatically.
      // Restart it while video recording is still active.
      if (shouldContinueListeningRef.current) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log("Recognition restart:", error);
          }
        }, 300);
      }
    };

    recognitionRef.current = recognition;

    shouldContinueListeningRef.current = true;

    try {
      recognition.start();
    } catch (error) {
      console.log("Recognition start:", error);
    }
  };

  const stopVoiceRecognition = () => {
    shouldContinueListeningRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition stop:", error);
      }
    }

    setIsListening(false);
  };

  return (
    <div className="emergency-capture">

      {/* HEADER */}
      <div className="capture-header">

        <div className="emergency-badge">
          🚨 EMERGENCY MODE
        </div>

        <h1>Emergency Evidence</h1>

        <p>
          Your camera and microphone can capture evidence
          to help campus responders understand the situation.
        </p>

      </div>

      {/* PERMISSIONS */}
      <div className="permission-status">

        <div
          className={
            cameraPermission
              ? "permission active"
              : "permission"
          }
        >
          📷 Camera
          <span>
            {cameraPermission ? "✓ Ready" : "Waiting"}
          </span>
        </div>

        <div
          className={
            micPermission
              ? "permission active"
              : "permission"
          }
        >
          🎤 Microphone
          <span>
            {micPermission ? "✓ Ready" : "Waiting"}
          </span>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="capture-error">
          ⚠️ {error}

          <button onClick={startCameraAndMicrophone}>
            Allow Camera & Microphone
          </button>
        </div>
      )}

      {/* LIVE CAMERA */}
      {!recordedVideo && (
        <div className="video-container">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />

          {recording && (
            <div className="recording-indicator">
              <span className="recording-dot"></span>

              RECORDING

              <strong>
                {formatTime(recordingTime)}
              </strong>
            </div>
          )}

        </div>
      )}

      {/* RECORDED VIDEO */}
      {recordedVideo && (
        <div className="recorded-section">

          <h2>🎥 Evidence Preview</h2>

          <video
            key={recordedVideo}
            src={recordedVideo}
            controls
            playsInline
            preload="auto"
            className="recorded-video"
          />

          {transcript.trim() && (
            <div className="transcript-preview">

              <h3>📝 Emergency Description</h3>

              <p>{transcript.trim()}</p>

            </div>
          )}

          <div className="record-controls">

            <button
              className="record-again"
              onClick={recordAgain}
            >
              🔄 Record Again
            </button>

            {/* SEND EVIDENCE */}
            <button
              className="send-evidence"
              onClick={() => {
                if (!recordedBlob) {
                  alert("No evidence recorded.");
                  return;
                }

                console.log("Sending evidence to backend...");
                console.log(recordedBlob);

                alert(
                  "Evidence ready to be sent to the emergency response system."
                );
              }}
            >
              🚨 SEND EVIDENCE
            </button>

          </div>

        </div>
      )}

      {emergencyPackage && (
        <div className="emergency-package">

          <h2>📦 Emergency Report Ready</h2>

          <div className="package-item">
            🚨 <strong>Type:</strong>{" "}
            {emergencyPackage.emergencyType}
          </div>

          <div className="package-item">
            📍 <strong>Location:</strong>{" "}
            {emergencyPackage.location
              ? `${emergencyPackage.location.latitude.toFixed(
                  5
                )}, ${emergencyPackage.location.longitude.toFixed(5)}`
              : "Unavailable"}
          </div>

          <div className="package-item">
            📝 <strong>Description:</strong>{" "}
            {emergencyPackage.transcript || "No transcript"}
          </div>

          <div className="package-item">
            🕶️ <strong>Anonymous:</strong>{" "}
            {emergencyPackage.anonymous ? "Yes" : "No"}
          </div>

          <div className="package-item">
            🎥 <strong>Evidence:</strong>{" "}
            {emergencyPackage.evidence.size > 0
              ? "Ready"
              : "Not available"}
          </div>

          <div className="package-item">
            ⏰ <strong>Time:</strong>{" "}
            {new Date(
              emergencyPackage.timestamp
            ).toLocaleString()}
          </div>

        </div>
      )}

      {/* RECORD BUTTON */}
      {!recordedVideo && (
        <div className="record-controls">

          {!recording ? (
            <button
              className="start-recording"
              onClick={startRecording}
              disabled={
                !cameraPermission ||
                !micPermission
              }
            >
              🔴 START RECORDING
            </button>
          ) : (
            <button
              className="stop-recording"
              onClick={stopRecording}
            >
              ⏹ STOP RECORDING
            </button>
          )}

        </div>
      )}

      {/* INFORMATION */}
      <div className="capture-info">

        <div>
          📍
          <span>
            {locationLoading
              ? "Getting location..."
              : location
              ? `Location ready: ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
              : "Location unavailable"}
          </span>
        </div>

        <div>
          🎥
          <span>
            Video + audio evidence
          </span>
        </div>

        <div>
          🤖
          <span>
            AI analysis will process the report
          </span>
        </div>

      </div>

    </div>
  );
}

export default EmergencyCapture;