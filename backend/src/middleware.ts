import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";
import { z, ZodError } from "zod";

// Extend Request with userId for TypeScript
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// JWT middleware (protects routes)
export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Generic zod validation middleware
export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // Per contract: status 411 for bad input
        res.status(411).json({ message: "Error in inputs", errors: err.flatten() });
      } else {
        next(err);
      }
    }
  };
}
