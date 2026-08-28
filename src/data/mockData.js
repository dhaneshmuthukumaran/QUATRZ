export const incidents = [
  {
    id: "INC001",

    studentId: "STU102",

    timestamp: "2026-08-28T10:30:00",
    createdAt: "Just now",

    location: {
      latitude: 10.7905,
      longitude: 78.7047,
      place: "Block A - Engineering Building",
    },

    transcript:
      "There is a person injured near Block A. Please send help immediately.",

    aiSummary:
      "One person appears injured near Block A.",

    category: "MEDICAL",
    severity: "CRITICAL",
    priority: "P1",
    confidence: 96,

    media: {
      videoUrl: null,
      audioUrl: null,
    },

    status: "REPORTED",

    assignedResponder: null,
  },

  {
    id: "INC002",

    studentId: "STU205",

    timestamp: "2026-08-28T10:25:00",
    createdAt: "5 minutes ago",

    location: {
      latitude: 10.7915,
      longitude: 78.7055,
      place: "Chemistry Lab - Block B",
    },

    transcript:
      "There is smoke coming from the chemistry laboratory.",

    aiSummary:
      "Possible fire reported in Chemistry Lab, Block B.",

    category: "FIRE",
    severity: "CRITICAL",
    priority: "P1",
    confidence: 94,

    media: {
      videoUrl: null,
      audioUrl: null,
    },

    status: "ACKNOWLEDGED",

    assignedResponder: "Security Team 01",
  },

  {
    id: "INC003",

    studentId: "ANONYMOUS",

    timestamp: "2026-08-28T10:20:00",
    createdAt: "10 minutes ago",

    location: {
      latitude: 10.7898,
      longitude: 78.7038,
      place: "Campus Parking Area",
    },

    transcript:
      "There is suspicious activity near the parking area.",

    aiSummary:
      "Suspicious activity detected near the campus parking area.",

    category: "SECURITY",
    severity: "HIGH",
    priority: "P2",
    confidence: 82,

    media: {
      videoUrl: null,
      audioUrl: null,
    },

    status: "RESPONDING",

    assignedResponder: "Security Team 02",
  },

  {
    id: "INC004",
    studentId: "STU311",
    timestamp: "2026-08-28T10:10:00",
    createdAt: "20 minutes ago",
    location: { latitude: 10.7885, longitude: 78.706, place: "Main Cafeteria" },
    transcript: "Someone slipped near the cafeteria entrance.",
    aiSummary: "Minor injury reported near the cafeteria entrance.",
    category: "MEDICAL",
    severity: "MEDIUM",
    priority: "P3",
    confidence: 88,
    media: { videoUrl: null, audioUrl: null },
    status: "RESOLVED",
    resolvedToday: true,
    assignedResponder: "Medical Team 01",
  },
];

export const responders = [
  {
    id: "RESP001",
    name: "Medical Team 01",
    type: "MEDICAL",
    status: "AVAILABLE",
    availability: "AVAILABLE",
    latitude: 10.791,
    longitude: 78.705,
    distance: 0.7,
  },

  {
    id: "RESP002",
    name: "Security Team 01",
    type: "SECURITY",
    status: "BUSY",
    availability: "BUSY",
    latitude: 10.792,
    longitude: 78.706,
    distance: 1.2,
  },

  {
    id: "RESP003",
    name: "Security Team 02",
    type: "SECURITY",
    status: "RESPONDING",
    availability: "BUSY",
    latitude: 10.789,
    longitude: 78.703,
    distance: 0.9,
  },
  {
    id: "RESP004",
    name: "Fire Response Team",
    type: "FIRE",
    status: "AVAILABLE",
    availability: "AVAILABLE",
    latitude: 10.7902,
    longitude: 78.7062,
    distance: 0.8,
  },
  {
    id: "RESP005",
    name: "Medical Team 02",
    type: "MEDICAL",
    status: "BUSY",
    availability: "BUSY",
    latitude: 10.7898,
    longitude: 78.7038,
    distance: 1.4,
  },
];