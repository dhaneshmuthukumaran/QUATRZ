import { useMemo, useState } from "react";
import StatusBadge from "../../components/StatusBadge";

const reports = [
  { id: "RPT-014", type: "Lighting", location: "West Walkway", description: "Three lights are out near the west gate.", time: "09:45 AM", priority: "MEDIUM", status: "NEW", reporter: "Anonymous" },
  { id: "RPT-013", type: "Access control", location: "Science Block", description: "Side entrance lock is not latching correctly.", time: "09:10 AM", priority: "HIGH", status: "REVIEWING", reporter: "A. Kumar" },
  { id: "RPT-012", type: "Hazard", location: "Main Cafeteria", description: "Wet floor sign requested near the service counter.", time: "08:30 AM", priority: "LOW", status: "RESOLVED", reporter: "Anonymous" },
];

export default function SafetyManagement() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(reports[0]);
  const visible = useMemo(() => reports.filter((report) => (filter === "ALL" || report.status === filter) && `${report.id} ${report.type} ${report.location} ${report.description} ${report.reporter}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <main className="dashboard management-page"><div className="page-heading"><div><p className="eyebrow">OPERATIONS / SAFETY REPORTS</p><h1>Safety Reports</h1><p className="subtitle">Review community-submitted risks before they become incidents.</p></div><span className="queue-count">{visible.length} reports</span></div><section className="management-card"><div className="management-toolbar"><label className="search-box"><span>Search reports</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Report, type or location" /></label><div className="filter-row report-filters">{["ALL", "NEW", "REVIEWING", "RESOLVED"].map((item) => <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="report-list">{visible.map((report) => <button className={selected.id === report.id ? "report-row selected" : "report-row"} key={report.id} onClick={() => setSelected(report)}><span><strong>{report.id}</strong><small>{report.type} · {report.location}</small></span><span>{report.description}</span><b className={`severity ${report.priority.toLowerCase()}`}>{report.priority}</b><StatusBadge status={report.status} /><span>{report.time}</span></button>)}</div></section><section className="management-detail"><div><p className="eyebrow">REPORT DETAILS / {selected.id}</p><h2>{selected.description}</h2><p className="detail-meta">{selected.type} · {selected.location} · Submitted {selected.time} · Reported by {selected.reporter}</p></div><StatusBadge status={selected.status} /></section></main>;
}
