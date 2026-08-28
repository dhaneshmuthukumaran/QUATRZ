import StatusBadge from "./StatusBadge";

export default function IncidentCard({
incident,
selected,
onSelect,
}) {
return (
<div
className={`incident-card ${
selected ? "selected" : ""
}`}
onClick={() => onSelect(incident)}
>
<div className="incident-top">
<strong>
          🚨 {incident.category}
</strong>

<span className={`severity ${incident.severity.toLowerCase()}`}>
{incident.severity}
</span>
</div>

<p>{incident.description}</p>

<div className="incident-footer">
<StatusBadge status={incident.status} />

<small>{incident.createdAt}</small>
</div>
</div>
  );
}