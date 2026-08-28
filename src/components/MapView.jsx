const campusLocations = {
  "Block A - Engineering Building": { top: "22%", left: "18%", label: "BLOCK A" },
  "Chemistry Lab": { top: "20%", left: "67%", label: "CHEMISTRY LAB" },
  "Campus Parking Area": { top: "76%", left: "73%", label: "PARKING" },
  "Main Cafeteria": { top: "70%", left: "29%", label: "CAFETERIA" },
  "Campus Parking": { top: "76%", left: "73%", label: "PARKING" },
  "Central Library": { top: "46%", left: "20%", label: "LIBRARY" },
  "Sports Complex": { top: "46%", left: "70%", label: "SPORTS" },
  "Medical Center": { top: "73%", left: "50%", label: "MEDICAL CENTER" },
};

export default function MapView({ incident }) {
  if (!incident) return <div className="map-container">No incident selected</div>;
  const location = campusLocations[incident.location.place] || { top: "50%", left: "50%", label: "INCIDENT" };

  return <div className="map-container campus-map">
    <div className="map-heading"><div><p className="eyebrow">LIVE CAMPUS MAP</p><h3>Campus response view</h3></div><span className="map-status"><span /> Tracking incident</span></div>
    <div className="map-surface"><div className="map-road road-horizontal" /><div className="map-road road-vertical" />{Object.entries(campusLocations).filter(([place]) => !["Campus Parking Area", "Campus Parking"].includes(place)).map(([place, zone]) => <div className="campus-zone" style={{ top: zone.top, left: zone.left }} key={place}><span>{zone.label}</span></div>)}<div className="campus-zone parking-zone" style={{ top: "76%", left: "73%" }}><span>PARKING</span></div><div className="incident-marker" style={{ top: location.top, left: location.left }}><span className="marker-pulse" /><span className="marker-pin">!</span></div><div className="map-label">SELECTED INCIDENT<br /><strong>{incident.location.place}</strong></div></div>
    <div className="map-info"><div><span>Selected location</span><strong>{incident.location.place}</strong></div><div><span>Coordinates</span><strong>{incident.location.latitude}, {incident.location.longitude}</strong></div><div><span>Incident</span><strong>{incident.category} · {incident.severity}</strong></div></div>
  </div>;
}
