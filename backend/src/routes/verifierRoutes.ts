import express from "express";
import { getAllApplications, verifyApplication, rejectApplication } from "../controllers/verifierController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();

// Route to get all applications
router.get("/", authMiddleware, roleMiddleware("VERIFIER"), getAllApplications);

// Route to verify an application
router.put("/verify/:id", authMiddleware, roleMiddleware("VERIFIER"), verifyApplication);

// Route to reject an application
router.put("/reject/:id", authMiddleware, roleMiddleware("VERIFIER"), rejectApplication);

export default router;
