const admin = require("firebase-admin");
const path = require("path");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require(
  path.join(__dirname, "../../serviceAccountKey.json")
);

// Initialize Firebase Admin SDK
const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

// Get Firestore database
const db = getFirestore(app);

module.exports = {
  admin,
  app,
  db
};
