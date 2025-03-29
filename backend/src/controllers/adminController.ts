import { Response, NextFunction } from "express";
import { PrismaClient, UserRole } from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";

const prisma = new PrismaClient();

/**
 * Get all loan applications (Admins & Super Admins can access)
 */
export const getAllApplications = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { dateTime: "desc" },
    });

    res.status(200).json({ message: "All applications retrieved", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Approve or Reject an application (Admins & Super Admins can access)
 */
export const approveApplication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.user?.userId;

    if (!adminId) {
      res.status(401).json({ message: "Unauthorized: Admin ID is missing" });
      return;
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
      res.status(400).json({ message: "Invalid status. Use 'APPROVED' or 'REJECTED'" });
      return;
    }

    const application = await prisma.application.findUnique({ where: { id } });
    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    await prisma.application.update({
      where: { id },
      data: {
        status,
        approvedBy: { connect: { id: adminId } },
      },
    });

    res.status(200).json({ message: `Application ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error("Error approving/rejecting application:", error);
    next(error);
  }
};

export const makeAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Ensure only Super Admin can make Admins
    if (req.user?.role !== UserRole.SUPER_ADMIN) {
      res.status(403).json({ message: "Forbidden: Only Super Admin can make admins" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === UserRole.ADMIN) {
      res.status(400).json({ message: "User is already an admin" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { role: UserRole.ADMIN },
    });

    res.status(200).json({ message: "User promoted to Admin" });
  } catch (error) {
    console.error("Error making user an admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Ensure only Super Admin can remove Admins
    if (req.user?.role !== UserRole.SUPER_ADMIN) {
      res.status(403).json({ message: "Forbidden: Only Super Admin can remove admins" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== UserRole.ADMIN) {
      res.status(400).json({ message: "User is not an admin" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { role: UserRole.USER },
    });

    res.status(200).json({ message: "Admin privileges removed" });
  } catch (error) {
    console.error("Error removing admin privileges:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
