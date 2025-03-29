import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET ?? "supersecretkey";

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Access Denied. No token provided." });
      return; // Ensure the function exits here
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.user = decoded; // Attach user to request

    next(); // Call `next()` only if the token is valid
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
    return; // Ensure the function exits here
  }
};

export default authMiddleware;
