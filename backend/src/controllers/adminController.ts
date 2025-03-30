import { Response, NextFunction } from "express";
import { PrismaClient, UserRole } from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";

const prisma = new PrismaClient();


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

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { role: "asc" }, 
    });

    res.status(200).json({ message: "All users retrieved", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const makeVerifier = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    
    if (req.user?.role !== UserRole.SUPER_ADMIN) {
      res.status(403).json({ message: "Forbidden: Only Super Admin can make verifiers" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === UserRole.VERIFIER) {
      res.status(400).json({ message: "User is already a verifier" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { role: UserRole.VERIFIER },
    });

    res.status(200).json({ message: "User promoted to Verifier" });
  } catch (error) {
    console.error("Error making user a verifier:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeVerifier = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Ensure only Super Admin can remove Verifiers
    if (req.user?.role !== UserRole.SUPER_ADMIN) {
      res.status(403).json({ message: "Forbidden: Only Super Admin can remove verifiers" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== UserRole.VERIFIER) {
      res.status(400).json({ message: "User is not a verifier" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { role: UserRole.USER },
    });

    res.status(200).json({ message: "Verifier privileges removed" });
  } catch (error) {
    console.error("Error removing verifier privileges:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const makeUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // ✅ Ensure only Super Admin can make a User
    if (req.user?.role !== UserRole.SUPER_ADMIN) {
      res.status(403).json({ message: "Forbidden: Only Super Admin can change roles" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === UserRole.USER) {
      res.status(400).json({ message: "User is already a normal user" });
      return;
    }

    await prisma.user.update({
      where: { id },
      data: { role: UserRole.USER },
    });

    res.status(200).json({ message: "User role set to User" });
  } catch (error) {
    console.error("Error making user a normal user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
