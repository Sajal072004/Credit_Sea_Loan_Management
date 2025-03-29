import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

const roleMiddleware = (role: "ADMIN" | "VERIFIER" | "USER") => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }
    next();
  };
};

export default roleMiddleware;
