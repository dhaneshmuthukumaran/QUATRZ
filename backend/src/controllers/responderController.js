const { db } = require("../config/firebase");

const createResponder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      team,
      status
    } = req.body;

    const responderRef = await db.collection("responders").add({
      name,
      email,
      phone,
      team,
      status: status || "available",
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Responder created successfully",
      responderId: responderRef.id
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create responder"
    });
  }
};

module.exports = {
  createResponder
};