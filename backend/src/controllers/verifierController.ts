import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";

const prisma = new PrismaClient();

/**
 * Get all loan applications
 */
export const getAllApplications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        user: { select: { name: true, email: true } },
        verifiedBy: { select: { name: true } },
        approvedBy: { select: { name: true } },
      },
      orderBy: { dateTime: "desc" },
    });

    res.status(200).json({ message: "All applications retrieved", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Verify an application
 */
export const verifyApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const verifierId = req.user?.userId;

    if (!verifierId) {
      res.status(401).json({ message: "Unauthorized: Verifier ID is missing" });
      return;
    }

    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    if (application.verifierId) {
      res.status(400).json({ message: "Application already verified" });
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status: "VERIFIED", verifierId },
    });

    res.status(200).json({ message: "Application verified successfully", application: updatedApplication });
  } catch (error) {
    console.error("Error verifying application:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Reject an application
 */
export const rejectApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const verifierId = req.user?.userId;

    if (!verifierId) {
      res.status(401).json({ message: "Unauthorized: Verifier ID is missing" });
      return;
    }

    const application = await prisma.application.findUnique({ where: { id } });

    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    if (application.status === "REJECTED") {
      res.status(400).json({ message: "Application already rejected" });
      return;
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status: "REJECTED", verifierId: null },
    });

    res.status(200).json({ message: "Application rejected successfully", application: updatedApplication });
  } catch (error) {
    console.error("Error rejecting application:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
