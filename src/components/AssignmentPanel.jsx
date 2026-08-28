import ResponderCard from "./ResponderCard";

export default function AssignmentPanel({
  incident,
  responders,
  onAssign,
}) {
  if (!incident) return null;

  const availableResponders = responders.filter((responder) => {
    const isAvailable =
      responder.status === "AVAILABLE" ||
      responder.availability === "AVAILABLE";
    return isAvailable;
  }).sort((first, second) => (first.distance || 99) - (second.distance || 99));

  const recommendedResponders = availableResponders.filter((responder) => {

    const isSuitable =
      responder.type === incident.category ||
      (incident.category === "FIRE" &&
        responder.type === "SECURITY");

    return isSuitable;
  });
  const respondersToDisplay = recommendedResponders.length > 0
    ? recommendedResponders
    : availableResponders.slice(0, 1);

  return (
    <div className="assignment-panel">
      <h3>🚑 Smart Responder Assignment</h3>

      <div className="assignment-incident-info">
        <p>
          <strong>Incident:</strong>{" "}
          {incident.category}
        </p>

        <p>
          <strong>Severity:</strong>{" "}
          {incident.severity}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {incident.location.place}
        </p>
      </div>

      <h4>Recommended Available Responders</h4>

      <div className="recommended-list">
        {respondersToDisplay.length > 0 ? (
          respondersToDisplay.map((responder) => (
            <ResponderCard
              key={responder.id}
              responder={responder}
              onAssign={onAssign}
            />
          ))
        ) : (
          <div className="no-responder"><p>⚠️ No responder is currently available.</p></div>
        )}
      </div>

      {incident.assignedResponder && (
        <div className="assigned-responder">
          <strong>✅ Assigned Responder:</strong>

          <p>{incident.assignedResponder}</p>
        </div>
      )}
    </div>
  );
}