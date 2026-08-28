const { db } = require("../config/firebase");

const assignEmergency = async (req, res) => {
  try {
    const { reportId } = req.params;

    const {
      status,
      assignedTeam,
      assignedResponder
    } = req.body;

    const reportRef = db
      .collection("emergencyReports")
      .doc(reportId);

    const report = await reportRef.get();

    if (!report.exists) {
      return res.status(404).json({
        success: false,
        message: "Emergency report not found"
      });
    }

    await reportRef.update({
      status: status || "ASSIGNED",
      assignedTeam: assignedTeam || null,
      assignedResponder: assignedResponder || null,
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: "Emergency assigned successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to assign emergency"
    });
  }
};

module.exports = {
  assignEmergency
};