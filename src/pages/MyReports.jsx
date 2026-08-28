import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Clock3,
  MapPin,
  ShieldAlert,
  Siren,
  FileText,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const savedReports = JSON.parse(
      localStorage.getItem("campusSafeReports") || "[]"
    );

    setReports(savedReports);
  }, []);

  const statusSteps = [
    "Reported",
    "Acknowledged",
    "Responding",
    "Resolved",
  ];

  const getProgress = (status) => {
    switch (status) {
      case "Resolved":
        return 4;
      case "Responding":
        return 3;
      case "Acknowledged":
        return 2;
      default:
        return 1;
    }
  };

  const getStatus = (report) => {
    return report.status || "Reported";
  };

  const getReportTitle = (report) => {
    if (report.description) {
      return report.description.length > 60
        ? report.description.substring(0, 60) + "..."
        : report.description;
    }

    return report.category || "Emergency Report";
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    const reportDate = new Date(date);

    return reportDate.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getLocationText = (location) => {
    if (!location) return "Location not available";

    if (
      location.latitude !== undefined &&
      location.longitude !== undefined
    ) {
      return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(
        4
      )}`;
    }

    return "Location captured";
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border border-red-200";

      case "High":
        return "bg-orange-100 text-orange-700 border border-orange-200";

      case "Medium":
        return "bg-amber-100 text-amber-700 border border-amber-200";

      default:
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              My Reports
            </h1>

            <p className="text-sm text-slate-500">
              Track your emergency and safety reports
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* INTRO */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <ShieldAlert size={27} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Emergency Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor the progress of your submitted reports.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/report")}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
          >
            <Plus size={18} />
            New Report
          </button>
        </div>

        {/* REPORT COUNT */}
        {reports.length > 0 && (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-bold text-blue-900">
              {reports.length}{" "}
              {reports.length === 1 ? "report" : "reports"} submitted
            </p>

            <p className="mt-1 text-xs text-blue-600">
              Your reports are being tracked by the CampusSafe response system.
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {reports.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <FileText size={30} />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-900">
              No reports yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You have not submitted any emergency or safety reports yet.
              Reports you submit will appear here.
            </p>

            <button
              onClick={() => navigate("/report")}
              className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Report an Emergency
            </button>
          </div>
        )}

        {/* REPORT LIST */}
        {reports.length > 0 && (
          <div className="space-y-5">
            {reports.map((report) => {
              const status = getStatus(report);
              const progress = getProgress(status);

              return (
                <div
                  key={report.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* REPORT HEADER */}
                  <div className="border-b border-slate-100 p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          <Siren size={23} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-black text-slate-900">
                              {getReportTitle(report)}
                            </h3>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              {report.id}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
                              {report.category || "General Safety"}
                            </span>

                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {getLocationText(report.location)}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock3 size={13} />
                              {formatDate(report.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${getSeverityClass(
                          report.severity
                        )}`}
                      >
                        {report.severity || "Medium"}
                      </span>
                    </div>
                  </div>

                  {/* AI SUMMARY */}
                  {report.aiAnalysis && (
                    <div className="border-b border-slate-100 bg-blue-50/50 px-6 py-5">
                      <div className="flex gap-3">
                        <div className="text-xl">🤖</div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            AI Incident Analysis
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {report.aiAnalysis.action}
                          </p>

                          {report.aiAnalysis.confidence && (
                            <p className="mt-2 text-xs text-blue-600">
                              Analysis confidence:{" "}
                              {report.aiAnalysis.confidence}%
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STATUS */}
                  <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Response Status
                        </p>

                        <p className="mt-1 text-lg font-black text-slate-900">
                          {status}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          status === "Resolved"
                            ? "bg-emerald-50 text-emerald-700"
                            : status === "Responding"
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {status === "Reported"
                          ? "Submitted"
                          : status === "Acknowledged"
                          ? "Team Notified"
                          : status === "Responding"
                          ? "Response Active"
                          : "Case Closed"}
                      </span>
                    </div>

                    {/* PROGRESS TRACKER */}
                    <div className="relative">
                      <div className="absolute left-[12.5%] right-[12.5%] top-4 h-1 bg-slate-200" />

                      <div
                        className="absolute left-[12.5%] top-4 h-1 bg-red-500 transition-all"
                        style={{
                          width:
                            progress === 1
                              ? "0%"
                              : progress === 2
                              ? "25%"
                              : progress === 3
                              ? "50%"
                              : "75%",
                        }}
                      />

                      <div className="relative grid grid-cols-4">
                        {statusSteps.map((step, index) => {
                          const stepNumber = index + 1;
                          const completed = stepNumber <= progress;

                          return (
                            <div
                              key={step}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow-sm ${
                                  completed
                                    ? "bg-red-500 text-white"
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {completed ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  stepNumber
                                )}
                              </div>

                              <p
                                className={`mt-2 text-center text-[10px] font-bold sm:text-xs ${
                                  completed
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                }`}
                              >
                                {step}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* HELP */}
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-7 text-center">
          <p className="font-bold text-slate-800">
            Need to report another incident?
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Submit a new emergency or safety concern to CampusSafe.
          </p>

          <button
            onClick={() => navigate("/report")}
            className="mt-4 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Report Emergency
          </button>
        </div>
      </main>
    </div>
  );
}

export default MyReports;