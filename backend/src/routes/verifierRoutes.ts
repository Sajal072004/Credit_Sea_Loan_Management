import express from "express";
import { getAllApplications, verifyApplication, rejectApplication } from "../controllers/verifierController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();


router.get("/", authMiddleware, roleMiddleware("VERIFIER"), getAllApplications);


router.put("/verify/:id", authMiddleware, roleMiddleware("VERIFIER"), verifyApplication);


router.put("/reject/:id", authMiddleware, roleMiddleware("VERIFIER"), rejectApplication);

export default router;
