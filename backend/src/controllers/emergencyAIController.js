const { db } = require("../config/firebase");

const updateAIResults = async (req, res) => {
  try {
    const { reportId } = req.params;

    const {
      transcript,
      aiSummary,
      severity,
      priority
    } = req.body;

    if (!reportId) {
      return res.status(400).json({
        success: false,
        message: "Report ID is required"
      });
    }

    const reportRef = db
      .collection("emergencyReports")
      .doc(reportId);

    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Emergency report not found"
      });
    }

    await reportRef.update({
      transcript: transcript || "",
      aiSummary: aiSummary || "",
      severity: severity || "PENDING",
      priority: priority || "PENDING",
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: "AI results updated successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update AI results"
    });
  }
};

module.exports = {
  updateAIResults
};