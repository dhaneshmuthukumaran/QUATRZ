const { db } = require("../config/firebase");

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      phone
    } = req.body;

    const userRef = await db.collection("users").add({
      name,
      email,
      role,
      phone,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: userRef.id
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
};

module.exports = {
  createUser
};