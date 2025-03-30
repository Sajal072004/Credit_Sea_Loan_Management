import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import applicationRoutes from "./routes/applicationRoutes";

import verifierRoutes from "./routes/verifierRoutes";
import adminRoutes from "./routes/adminRoutes";
import loanRoutes from "./routes/loanRoutes";




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/verifier", verifierRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/loan", loanRoutes);


// Root Route
app.get("/", (req, res) => {
  res.send("Hello from Sajal Namdeo , The backend api is running");
});

// Server Listening
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
