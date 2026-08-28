const { db } = require("../config/firebase");

const createEmergencyReport = async (req, res) => {
  try {
    const {
      userId,
      type,
      latitude,
      longitude,
      description
    } = req.body;

    const report = {
      userId: userId || "",
      type: type || "",
      latitude: latitude || null,
      longitude: longitude || null,
      description: description || "",

      status: "NEW",
      severity: "",
      priority: "",

      transcript: "",
      aiSummary: "",

      assignedTeam: "",
      assignedResponder: "",

      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection("emergencyReports").add(report);

    res.status(201).json({
      success: true,
      message: "Emergency report created successfully",
      reportId: docRef.id
    });

  } catch (error) {
    console.error("Error creating emergency report:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create emergency report"
    });
  }
};

module.exports = {
  createEmergencyReport
};