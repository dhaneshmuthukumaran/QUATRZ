import { useContext, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContextValue";
import AIAnalysisCard from "../../components/AIAnalysisCard";
import AssignmentPanel from "../../components/AssignmentPanel";
import IncidentTimeline from "../../components/IncidentTimeline";
import MapView from "../../components/MapView";
import StatCard from "../../components/StatCard";

const severityRank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

export default function AdminDashboard() {
  const { incidentData, responderData, updateIncident, assignResponder } = useContext(AdminContext);
  const [selectedId, setSelectedId] = useState(incidentData[0]?.id);
  const [notice, setNotice] = useState("");
  const selected = incidentData.find((incident) => incident.id === selectedId) || incidentData[0];
  const sortedIncidents = useMemo(() => [...incidentData].sort((first, second) => severityRank[second.severity] - severityRank[first.severity] || new Date(second.timestamp) - new Date(first.timestamp)), [incidentData]);

  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };
  const advanceStatus = (nextStatus) => { updateIncident(selected.id, { status: nextStatus, resolvedToday: nextStatus === "RESOLVED" }); showNotice(`Incident status updated to ${nextStatus}.`); };
  const handleAssign = (responder) => { assignResponder(selected.id, responder.name); updateIncident(selected.id, { status: "RESPONDER ASSIGNED" }); showNotice(`${responder.name} assigned successfully.`); };

  if (!selected) return <main className="dashboard"><h1>Admin Command Center</h1><p>No incidents available.</p></main>;

  return <main className="dashboard">
    <div className="dashboard-header"><div><p className="eyebrow">LIVE EMERGENCY OPERATIONS</p><h1>Admin Command Center</h1><p>Monitor AI-powered emergency incidents and coordinate the fastest response.</p></div></div>
    <section className="stats-grid"><StatCard title="Open Incidents" value={incidentData.filter((incident) => incident.status !== "RESOLVED").length} icon="!" /><StatCard title="Critical Alerts" value={incidentData.filter((incident) => incident.severity === "CRITICAL" && incident.status !== "RESOLVED").length} icon="!!" /><StatCard title="Responders Available" value={responderData.filter((responder) => responder.availability === "AVAILABLE").length} icon="+" /><StatCard title="Resolved Today" value={incidentData.filter((incident) => incident.resolvedToday || incident.status === "RESOLVED").length} icon="OK" /></section>
    <section className="dashboard-section"><MapView incident={selected} /></section>
    <section className="incident-section"><div className="section-heading"><div><p className="eyebrow">LIVE INCIDENT FEED</p><h2>Emergency incidents</h2></div><span className="queue-count">{sortedIncidents.length}</span></div><div className="incident-list">{sortedIncidents.map((incident) => <button key={incident.id} className={incident.id === selected.id ? "incident-item selected" : "incident-item"} onClick={() => setSelectedId(incident.id)}><div><strong>{incident.category} · {incident.id}</strong><p>{incident.aiSummary}</p><small>Location: {incident.location.place} · {incident.createdAt}</small></div><div className="incident-meta"><span>{incident.severity}</span><span>{incident.priority}</span><span>{incident.status}</span></div></button>)}</div></section>
  <section className="detail-grid"><section className="selected-incident-section"><div className="section-heading"><div><p className="eyebrow">SELECTED INCIDENT</p><h2>{selected.category} — {selected.id}</h2></div><span className={`severity ${selected.severity.toLowerCase()}`}>{selected.severity}</span></div><div className="selected-incident-card"><p><strong>Location:</strong> {selected.location.place}</p><p><strong>Coordinates:</strong> {selected.location.latitude}, {selected.location.longitude}</p><p><strong>Student Transcript</strong></p><blockquote>"{selected.transcript}"</blockquote><p><strong>AI Summary:</strong> {selected.aiSummary}</p><p><strong>Priority:</strong> {selected.priority}</p><p><strong>Current Status:</strong> {selected.status}</p><p><strong>Assigned Responder:</strong> {selected.assignedResponder || "Not Assigned"}</p></div></section><section className="dashboard-section"><AIAnalysisCard incident={selected} /></section></section>
    <section className="dashboard-section"><AssignmentPanel incident={selected} responders={responderData} onAssign={handleAssign} /></section>
    <section className="dashboard-section"><IncidentTimeline status={selected.status} onAdvance={advanceStatus} /></section>
    {notice && <div className="toast" role="status">{notice}</div>}
  </main>;
}
