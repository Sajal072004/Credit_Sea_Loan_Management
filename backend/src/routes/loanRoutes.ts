import express from "express";
import asyncHandler from "express-async-handler";
import { approveAndCreateLoan, makeEMIPayment, getLoanDetails, getUserLoans, getUserTotalLoanAmount, getLoanStatistics } from "../controllers/loanController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();

// Admin approves a loan & creates loan record
router.post("/approve/:appId", authMiddleware, roleMiddleware("ADMIN"), asyncHandler(approveAndCreateLoan));

// User makes EMI payment
router.post("/pay/:loanId", authMiddleware, roleMiddleware("USER"), asyncHandler(makeEMIPayment));

router.get("/user", authMiddleware, roleMiddleware("USER"), asyncHandler(getUserLoans));

router.get("/get-total", authMiddleware, asyncHandler(getUserTotalLoanAmount));

router.get("/get-stats", asyncHandler(getLoanStatistics));

// Get Loan Details
router.get("/:loanId", authMiddleware, asyncHandler(getLoanDetails));




export default router;
