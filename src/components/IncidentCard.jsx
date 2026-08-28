import {
  AlertTriangle,
  Clock3,
  MapPin,
} from "lucide-react";

function IncidentCard({ incident }) {
  const severityClass = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <AlertTriangle size={21} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              {incident.title}
            </h3>

            <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {incident.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {incident.time}
              </span>
            </div>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            severityClass[incident.severity]
          }`}
        >
          {incident.severity}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs font-semibold text-slate-500">
          {incident.category}
        </span>

        <span className="text-xs font-bold text-slate-700">
          {incident.status}
        </span>
      </div>
    </div>
  );
}

export default IncidentCard;