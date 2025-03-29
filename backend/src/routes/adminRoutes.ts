import express from "express";
import asyncHandler from "express-async-handler";
import {
  getAllApplications,
  approveApplication,
  makeAdmin,
  removeAdmin
} from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();

// ✅ Admins can approve/reject applications
router.get("/", authMiddleware, roleMiddleware("ADMIN"), asyncHandler(getAllApplications));
router.put("/approve/:id", authMiddleware, roleMiddleware("ADMIN"), asyncHandler(approveApplication));

// ✅ Only Super Admin can promote or demote Admins
router.put("/make-admin/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(makeAdmin));
router.put("/remove-admin/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(removeAdmin));

export default router;
