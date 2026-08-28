const steps = [
  "REPORTED",
  "ACKNOWLEDGED",
  "RESPONDER ASSIGNED",
  "RESPONDING",
  "AT LOCATION",
  "RESOLVED",
];

export default function IncidentTimeline({ status, onAdvance }) {
  let activeIndex = steps.indexOf(status);

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  const nextStep = steps[activeIndex + 1];
  const actionLabels = {
    ACKNOWLEDGED: "Acknowledge incident",
    "RESPONDER ASSIGNED": "Assign responder",
    RESPONDING: "Start response",
    "AT LOCATION": "Mark at location",
    RESOLVED: "Resolve incident",
  };
  const actionLabel = actionLabels[nextStep];

  return (
    <div className="timeline">
      <h3>📍 Response Timeline</h3>

      {steps.map((step, index) => (
        <div
          key={step}
          className={
            index <= activeIndex
              ? "timeline-step active"
              : "timeline-step"
          }
        >
          <div className="timeline-dot"></div>

          <span>{step}</span>
        </div>
      ))}
      {nextStep && onAdvance && actionLabel && (
        <button className="timeline-action" onClick={() => onAdvance(nextStep)}>
          {actionLabels[nextStep]}
        </button>
      )}
      {status === "RESOLVED" && <strong className="resolved-message">Incident resolved</strong>}
    </div>
  );
}