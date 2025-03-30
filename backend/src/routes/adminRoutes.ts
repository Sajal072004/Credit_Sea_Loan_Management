import express from "express";
import asyncHandler from "express-async-handler";
import {
  getAllApplications,
  approveApplication,
  makeAdmin,
  removeAdmin,
  getAllUsers,
  makeVerifier,
  removeVerifier,
  makeUser
} from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = express.Router();


router.get("/", authMiddleware, roleMiddleware("ADMIN"), asyncHandler(getAllApplications));
router.put("/approve/:id", authMiddleware, roleMiddleware("ADMIN"), asyncHandler(approveApplication));


router.put("/make-admin/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(makeAdmin));
router.put("/remove-admin/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(removeAdmin));

router.put("/make-verifier/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(makeVerifier));
router.put("/remove-verifier/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(removeVerifier));

router.put("/make-user/:id", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(makeUser));

router.get("/users", authMiddleware, roleMiddleware("SUPER_ADMIN"), asyncHandler(getAllUsers));

export default router;
