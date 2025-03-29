import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "SUPER_ADMIN" | "USER" | "ADMIN" | "VERIFIER";
  };
}
