const API_URL = "http://localhost:5000/api/emergency";

export async function createEmergencyReport(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: data.userId || "",
      type: data.type || "SOS",
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      description: data.description || "",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create emergency report"
    );
  }

  return result;
}