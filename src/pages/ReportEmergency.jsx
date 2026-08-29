import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Image,
  MapPin,
  Send,
  ShieldAlert,
  Video,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEmergencyReport } from "../services/emergencyService";

function ReportEmergency() {
    const analyzeIncident = (text) => {
  const description = text.toLowerCase();

  if (
    description.includes("fire") ||
    description.includes("smoke") ||
    description.includes("explosion")
  ) {
    return {
      category: "Fire",
      severity: "Critical",
      priority: "Immediate",
      action: "Evacuate the area and dispatch fire/security team.",
      confidence: 96,
    };
  }

  if (
    description.includes("unconscious") ||
    description.includes("bleeding") ||
    description.includes("injured") ||
    description.includes("accident")
  ) {
    return {
      category: "Medical Emergency",
      severity: "Critical",
      priority: "Immediate",
      action: "Dispatch medical and security personnel.",
      confidence: 94,
    };
  }

  if (
    description.includes("fight") ||
    description.includes("weapon") ||
    description.includes("threat") ||
    description.includes("attack")
  ) {
    return {
      category: "Security Threat",
      severity: "Critical",
      priority: "Immediate",
      action: "Alert campus security and isolate the area.",
      confidence: 93,
    };
  }

  if (
    description.includes("harassment") ||
    description.includes("stalking") ||
    description.includes("bullying")
  ) {
    return {
      category: "Harassment",
      severity: "High",
      priority: "Urgent",
      action: "Notify campus security and student welfare team.",
      confidence: 91,
    };
  }

  if (
    description.includes("leak") ||
    description.includes("water") ||
    description.includes("electricity") ||
    description.includes("broken")
  ) {
    return {
      category: "Infrastructure Problem",
      severity: "Medium",
      priority: "Normal",
      action: "Create maintenance response request.",
      confidence: 88,
    };
  }

  return {
    category: "General Safety",
    severity: "Medium",
    priority: "Normal",
    action: "Review incident and assign appropriate response team.",
    confidence: 76,
  };
};
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const categories = [
    "Medical Emergency",
    "Fire",
    "Security Threat",
    "Accident",
    "Harassment",
    "Infrastructure Problem",
    "Suspicious Activity",
    "Other",
  ];

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });

        setLocationLoading(false);
      },
      () => {
        alert("Unable to get your location. Please allow location access.");
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting) return;

    if (!description.trim()) {
      alert("Please describe the incident.");
      return;
    }

    setSubmitting(true);
    setSubmissionError("");

    const analysis = analyzeIncident(description);

    const finalCategory = category || analysis.category;
    const finalSeverity = severity || analysis.severity;

    const newReportId =
      "CS-" + Math.floor(100000 + Math.random() * 900000);

    const reportData = {
      id: newReportId,
      description,
      category: finalCategory,
      severity: finalSeverity,
      anonymous,
      location,
      evidenceFiles: evidenceFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
      aiAnalysis: analysis,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    createEmergencyReport({
      userId: anonymous ? "" : "",
      type: finalCategory,
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      description,
    })
      .then(() => {
        const existingReports = JSON.parse(
          localStorage.getItem("campusSafeReports") || "[]"
        );

        localStorage.setItem(
          "campusSafeReports",
          JSON.stringify([reportData, ...existingReports])
        );

        setReportId(newReportId);
        setCategory(finalCategory);
        setSeverity(finalSeverity);
        setAiResult(analysis);
        setSubmitted(true);
        setSubmitting(false);

        alert("Emergency report submitted successfully.");
        console.log("Emergency Report Saved:", reportData);
      })
      .catch((error) => {
        console.error("Emergency report submission failed:", error);
        setSubmissionError(
          "Unable to submit the emergency report. Please try again."
        );
        setSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle size={42} />
            </div>

            <h1 className="mt-6 text-3xl font-black text-slate-900">
              Report Submitted
            </h1>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Your emergency report has been recorded and forwarded
              to the campus response team.
            </p>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
    Emergency Report ID
  </p>

  <p className="mt-1 text-2xl font-black tracking-widest text-blue-900">
    {reportId}
  </p>

  <p className="mt-1 text-xs text-blue-600">
    Keep this ID to track your report.
  </p>
</div>  

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">

              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-sm text-slate-500">
                  Category
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {category}
                </span>
              </div>

              <div className="flex justify-between pt-3">
                <span className="text-sm text-slate-500">
                  Priority
                </span>

                <span className="text-sm font-bold text-red-600">
                  {severity}
                </span>
              </div>

            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-7 w-full rounded-xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-800"
            >
              Return to CampusSafe
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-5">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              Report an Emergency
            </h1>

            <p className="text-sm text-slate-500">
              Help us respond quickly and accurately
            </p>
          </div>

        </div>
      </header>


      {/* FORM */}
      <main className="mx-auto max-w-4xl px-6 py-8">

        {/* WARNING */}
        <div className="mb-6 flex gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <ShieldAlert size={23} />
          </div>

          <div>
            <h2 className="font-bold text-red-900">
              Life-threatening emergency?
            </h2>

            <p className="mt-1 text-sm text-red-700">
              Use the SOS button instead for immediate assistance.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INCIDENT DESCRIPTION */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black text-slate-900">
              What happened?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Describe the incident so responders understand the situation.
            </p>

            <textarea
              value={description}
              onChange={(e) => {
                const text = e.target.value;

                setDescription(text);

                if (text.trim().length >= 10) {
                  const result = analyzeIncident(text);

                  setAiResult(result);
                  setCategory(result.category);
                  setSeverity(result.severity);
                } else {
                  setAiResult(null);
                }
              }}
              placeholder="Example: I saw a student injured near the library entrance..."
              rows={6}
              className="mt-5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
            />

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>Be as specific as possible.</span>
              <span>{description.length}/500</span>
            </div>

          </section>


          {/* CATEGORY */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black text-slate-900">
              Incident category
            </h2>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            >
              <option value="">
                Select incident category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </section>


          {/* SEVERITY */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black text-slate-900">
              How serious is the situation?
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">

              {["Low", "Medium", "High", "Critical"].map((item) => (

                <button
                  type="button"
                  key={item}
                  onClick={() => setSeverity(item)}
                  className={`rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                    severity === item
                      ? "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </section>


          {/* LOCATION */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Incident location
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share your current location with responders.
                </p>
              </div>

              <MapPin className="text-blue-600" />

            </div>

            {!location ? (

              <button
                type="button"
                onClick={getLocation}
                disabled={locationLoading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
              >
                <MapPin size={18} />

                {locationLoading
                  ? "Getting your location..."
                  : "Use my current location"}
              </button>

            ) : (

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4">

                <div className="flex items-center gap-3 text-emerald-700">

                  <CheckCircle size={20} />

                  <div>
                    <p className="font-bold">
                      Location captured
                    </p>

                    <p className="text-xs">
                      Accuracy: {Math.round(location.accuracy)} meters
                    </p>
                  </div>

                </div>

                <p className="mt-3 text-xs text-emerald-700">
                  {location.latitude.toFixed(6)},{" "}
                  {location.longitude.toFixed(6)}
                </p>

              </div>

            )}

          </section>


          {/* EVIDENCE */}
<section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

  <h2 className="text-lg font-black text-slate-900">
    Evidence
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Add photos or videos if they can help responders.
  </p>

  <div className="mt-5 grid gap-3 sm:grid-cols-3">

    {/* TAKE PHOTO */}
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-slate-500 transition hover:border-red-300 hover:bg-red-50">

      <Camera size={25} />

      <span className="text-sm font-bold">
        Take Photo
      </span>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          setEvidenceFiles((previous) => [
            ...previous,
            ...files,
          ]);
        }}
      />

    </label>


    {/* ADD IMAGE */}
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-slate-500 transition hover:border-red-300 hover:bg-red-50">

      <Image size={25} />

      <span className="text-sm font-bold">
        Add Image
      </span>

      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          setEvidenceFiles((previous) => [
            ...previous,
            ...files,
          ]);
        }}
      />

    </label>


    {/* ADD VIDEO */}
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-slate-500 transition hover:border-red-300 hover:bg-red-50">

      <Video size={25} />

      <span className="text-sm font-bold">
        Add Video
      </span>

      <input
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          setEvidenceFiles((previous) => [
            ...previous,
            ...files,
          ]);
        }}
      />

    </label>

  </div>


  {/* SELECTED FILES */}
  {evidenceFiles.length > 0 && (

    <div className="mt-5 rounded-2xl bg-slate-50 p-4">

      <p className="text-sm font-black text-slate-800">
        Selected Evidence ({evidenceFiles.length})
      </p>

      <div className="mt-3 space-y-2">

        {evidenceFiles.map((file, index) => (

          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between rounded-xl bg-white p-3"
          >

            <div className="flex min-w-0 items-center gap-3">

              <div className="rounded-lg bg-slate-100 p-2">
                {file.type.startsWith("video/")
                  ? <Video size={18} />
                  : <Image size={18} />
                }
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-slate-800">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() => {
                setEvidenceFiles((previous) =>
                  previous.filter((_, i) => i !== index)
                );
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <X size={17} />
            </button>

          </div>

        ))}

      </div>

    </div>

  )}

</section>

          {/* ANONYMOUS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <label className="flex cursor-pointer items-center justify-between gap-4">

              <div>
                <h2 className="font-bold text-slate-900">
                  Submit anonymously
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your identity will not be displayed to other students.
                </p>
              </div>

              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="h-5 w-5 accent-red-600"
              />

            </label>

          </section>


          {/* AI PREVIEW */}
          {aiResult && (
            <section className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  🤖
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <div>
                      <h2 className="font-black text-slate-900">
                        AI Incident Analysis
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Automatically analyzed from your description
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                      {aiResult.confidence}% confidence
                    </span>

                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold text-slate-500">
                        CATEGORY
                      </p>

                      <p className="mt-1 font-black text-slate-900">
                        {aiResult.category}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-red-50 p-4">
                      <p className="text-xs font-semibold text-red-500">
                        SEVERITY
                      </p>

                      <p className="mt-1 font-black text-red-700">
                        {aiResult.severity}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4">
                      <p className="text-xs font-semibold text-amber-600">
                        PRIORITY
                      </p>

                      <p className="mt-1 font-black text-amber-700">
                        {aiResult.priority}
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 rounded-2xl bg-blue-50 p-4">

                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Recommended Action
                    </p>

                    <p className="mt-1 text-sm font-semibold text-blue-900">
                      {aiResult.action}
                    </p>

                  </div>

                </div>

              </div>

            </section>
          )}


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 text-lg font-black text-white shadow-lg shadow-red-200 transition hover:bg-red-700 hover:shadow-xl"
          >
            <Send size={21} />
            {submitting ? "Submitting..." : "Submit Emergency Report"}
          </button>

          {submissionError && (
            <p className="text-center text-sm font-semibold text-red-600">
              {submissionError}
            </p>
          )}

          <p className="pb-10 text-center text-xs text-slate-400">
            For immediate life-threatening emergencies, use SOS.
          </p>

        </form>

      </main>

    </div>
  );
}

export default ReportEmergency;