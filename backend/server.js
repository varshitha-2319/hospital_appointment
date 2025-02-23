require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectToDatabase = require("./db/mongoose");
const limiter = require("./middlewares/rateLimiter");

// Importing controllers
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const doctorController = require("./controllers/doctorController");
const nurseController = require("./controllers/nurseController");
const appointmentController = require("./controllers/appointmentController");
const adminController = require("./controllers/adminController");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware);

// Route setup with rate limiting
app.use("/auth", limiter, authController);
app.use("/user", limiter, userController);
app.use("/doctor", limiter, doctorController);
app.use("/nurse", limiter, nurseController);
app.use("/appointment", limiter, appointmentController);
app.use("/admin", limiter, adminController);

// Global error handler
app.use(errorHandlerMiddleware);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "✅ Server is running" });
});

// Start server
(async () => {
  try {
    await connectToDatabase();
    const PORT = process.env.PORT || 4451;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
    process.exit(1);
  }
})();
