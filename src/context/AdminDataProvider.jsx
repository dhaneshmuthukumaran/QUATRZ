import { useState } from "react";
import { AdminContext } from "./AdminContextValue";
import { incidents as initialIncidents, responders as initialResponders } from "../data/mockData";

export function AdminDataProvider({ children }) {
  const [incidentData, setIncidentData] = useState(initialIncidents);
  const [responderData, setResponderData] = useState(initialResponders);

  const updateIncident = (id, changes) => {
    setIncidentData((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, ...changes } : incident
      )
    );
  };

  const assignResponder = (id, responderName) => {
    const incident = incidentData.find((item) => item.id === id);
    const previousName = incident?.assignedResponder;
    setIncidentData((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? { ...incident, assignedResponder: responderName || null }
          : incident
      )
    );

    setResponderData((prev) =>
      prev.map((responder) =>
        responder.name === responderName
          ? { ...responder, availability: "BUSY", status: "BUSY" }
          : responder.name === previousName
            ? { ...responder, availability: "AVAILABLE", status: "AVAILABLE" }
          : responder
      )
    );
  };

  const value = { incidentData, responderData, updateIncident, assignResponder };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}