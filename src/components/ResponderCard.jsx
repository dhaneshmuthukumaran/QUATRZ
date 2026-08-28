export default function ResponderCard({
  responder,
  onAssign,
}) {
  return (
    <div className="responder-card">
      <div>
        <h4>👮 {responder.name}</h4>

        <p>
          Type: {responder.type}
        </p>

        <p>
          Status: {responder.status}
        </p>
        <p>Distance: {responder.distance ?? "--"} km</p>
      </div>

      {responder.status === "AVAILABLE" && (
        <button
          onClick={() => onAssign(responder)}
        >
          Assign
        </button>
      )}
    </div>
  );
}