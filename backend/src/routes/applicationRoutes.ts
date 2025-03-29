import express, {RequestHandler} from "express";
import { applyForLoan, getUserApplications } from "../controllers/applicationController";
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

router.post("/apply", authMiddleware, applyForLoan as RequestHandler);
router.get("/", authMiddleware, getUserApplications as RequestHandler);

export default router;
