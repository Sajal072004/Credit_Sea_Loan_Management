import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware"; // Import extended type

const prisma = new PrismaClient();

/**
 * Apply for a Loan
 */
export const applyForLoan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId; // Extract from JWT
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { amount, tenure, empStatus, reason, empAddress } = req.body;

    // Validate input
    if (!amount || !tenure || !empStatus) {
      return res.status(400).json({ message: "Amount, tenure, and employment status are required." });
    }

    // Create the loan application
    const application = await prisma.application.create({
      data: {
        userId,
        amount,
        tenure,
        empStatus,
        reason,
        empAddress,
      },
    });

    res.status(201).json({ message: "Loan application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get All Applications of Logged-in User
 */
export const getUserApplications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Fetch user's loan applications
    const applications = await prisma.application.findMany({
      where: { userId },
      orderBy: { dateTime: "desc" }, // Latest first
    });

    res.status(200).json({ message: "User applications retrieved", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: No user ID found" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
