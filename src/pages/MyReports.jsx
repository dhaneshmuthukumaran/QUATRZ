import {
  ArrowLeft,
  CheckCircle,
  Clock3,
  MapPin,
  ShieldAlert,
  Siren,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const navigate = useNavigate();

  const reports = [
    {
      id: "CS-483721",
      title: "Fire near Laboratory",
      category: "Fire",
      severity: "Critical",
      location: "Laboratory Block",
      time: "Today, 10:42 AM",
      status: "Responding",
      progress: 3,
    },
    {
      id: "CS-274915",
      title: "Suspicious activity near parking",
      category: "Security Threat",
      severity: "High",
      location: "Parking Area",
      time: "Yesterday, 6:20 PM",
      status: "Acknowledged",
      progress: 2,
    },
    {
      id: "CS-168302",
      title: "Water leakage in hostel",
      category: "Infrastructure Problem",
      severity: "Medium",
      location: "Hostel Block A",
      time: "Aug 26, 2:15 PM",
      status: "Resolved",
      progress: 4,
    },
  ];

  const statusSteps = [
    "Reported",
    "Acknowledged",
    "Responding",
    "Resolved",
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-5">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-slate-900">
              My Reports
            </h1>

            <p className="text-sm text-slate-500">
              Track your emergency reports
            </p>
          </div>

        </div>
      </header>


      {/* CONTENT */}
      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* PAGE INTRO */}
        <div className="mb-8">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <ShieldAlert size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Emergency Reports
              </h2>

              <p className="text-sm text-slate-500">
                Monitor the response progress of your reports.
              </p>
            </div>
          </div>

        </div>


        {/* REPORTS */}
        <div className="space-y-5">

          {reports.map((report) => (

            <div
              key={report.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >

              {/* REPORT HEADER */}
              <div className="border-b border-slate-100 p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Siren size={23} />
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-black text-slate-900">
                          {report.title}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          {report.id}
                        </span>

                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">

                        <span>
                          {report.category}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {report.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          {report.time}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* SEVERITY */}
                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${
                      report.severity === "Critical"
                        ? "bg-red-100 text-red-700"
                        : report.severity === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {report.severity}
                  </span>

                </div>

              </div>


              {/* STATUS */}
              <div className="p-6">

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Response Status
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-900">
                      {report.status}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    Live Status
                  </span>

                </div>


                {/* PROGRESS */}
                <div className="relative">

                  <div className="absolute left-4 right-4 top-4 h-1 bg-slate-200" />

                  <div
                    className="absolute left-4 top-4 h-1 bg-red-500 transition-all"
                    style={{
                      width:
                        report.progress === 1
                          ? "0%"
                          : report.progress === 2
                          ? "33%"
                          : report.progress === 3
                          ? "66%"
                          : "100%",
                    }}
                  />

                  <div className="relative grid grid-cols-4">

                    {statusSteps.map((step, index) => {

                      const stepNumber = index + 1;
                      const completed =
                        stepNumber <= report.progress;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center"
                        >

                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow ${
                              completed
                                ? "bg-red-500 text-white"
                                : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            {completed ? (
                              <CheckCircle size={17} />
                            ) : (
                              stepNumber
                            )}
                          </div>

                          <p
                            className={`mt-2 text-center text-[11px] font-bold sm:text-xs ${
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

          ))}

        </div>


        {/* EMPTY/HELP AREA */}
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-7 text-center">

          <p className="font-bold text-slate-800">
            Need to report another incident?
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Submit a new emergency or safety concern.
          </p>

          <button
            onClick={() => navigate("/report")}
            className="mt-4 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
          >
            Report Emergency
          </button>

        </div>

      </main>

    </div>
  );
}

export default MyReports;