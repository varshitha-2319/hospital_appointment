require("dotenv").config();
const mongoose = require("mongoose");
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // No effect, but safe to keep
      useUnifiedTopology: true, // No effect, but safe to keep
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};
module.exports = connectToDatabase;
