const express = require("express");
const cors = require("cors");
const { db } = require("./config/firebase");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/emergency", emergencyRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusSafe Backend is running"
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