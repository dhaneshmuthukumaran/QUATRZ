const { db } = require("../config/firebase");

const createSafetyReport = async (req, res) => {
  try {
    const {
      userId,
      category,
      description,
      latitude,
      longitude
    } = req.body;

    const reportRef = await db.collection("safetyReports").add({
      userId,
      category,
      description,
      latitude,
      longitude,
      status: "SUBMITTED",
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Safety report created successfully",
      reportId: reportRef.id
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create safety report"
    });
  }
};

module.exports = {
  createSafetyReport
};