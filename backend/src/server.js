const express = require("express");
const cors = require("cors");
const { db } = require("./config/firebase");
const emergencyRoutes = require("./routes/emergencyRoutes");
const userRoutes = require("./routes/userRoutes");  
const safetyReportRoutes = require("./routes/safetyReportRoutes");
const responderRoutes = require("./routes/responderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const emergencyAIRoutes = require("./routes/emergencyAIRoutes");
const { verifyToken } = require("./middleware/authMiddleware"); 


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/emergency", emergencyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/safety-reports", safetyReportRoutes);
app.use("/api/responders", responderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/emergency", emergencyAIRoutes);


app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    user: req.user
  });
});

app.get("/test-firebase", async (req, res) => {
  try {
    await db.collection("system").doc("test").set({
      message: "Firebase connection successful",
      createdAt: new Date()
    });

    res.json({
      success: true,
      message: "Firebase connection successful"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Firebase connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusSafe Backend running on port ${PORT}`);
});