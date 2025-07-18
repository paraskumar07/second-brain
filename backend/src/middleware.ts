import express, { NextFunction } from 'express';
import { connectDB, UserModel } from './db';
import { Request, Response } from "express";
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  id: string;
}

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

import bcrypt from 'bcrypt';
import { decode } from 'punycode';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const signupMiddleware =  (req:Request,res: Response,next: NextFunction) => {

      console.log("Request body:", req.body);
      const signupSchema = z.object({
          username: z.string().min(3, "Username must be at least 3 characters long"),
          password: z.string().min(8).max(20)
          .refine(
            (val) => /[A-Z]/.test(val),
            { message: "Password must contain at least one uppercase letter" }
          )
          .refine(
            (val) => /[a-z]/.test(val),
            { message: "Password must contain at least one lowercase letter" }
          )
          .refine(
            (val) => /[0-9]/.test(val),
            { message: "Password must contain at least one number" }
          )
          .refine(
            (val) => /[^a-zA-Z0-9]/.test(val), // special character
            { message: "Password must contain at least one special character" }
          ),
      });

      const result = signupSchema.safeParse(req.body);
      console.log("Validation result:", result);

      if(!result.success) {
        if (!result.success) {
          const formatted = result.error.format();

          console.log(formatted);

          res.status(411).json({
            success: false,
            message: "Invalid input fields",
            errors: formatted,
          });
        }
      }
  // req.body = result.data;
  next();
}

// Middleware to validate request body for login
export const signinMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const result = loginSchema.safeParse(req.body);
  console.log("Login validation result:", result);

  if(!result.success){
    const formatted = result.error.format();
    console.log(formatted);

    res.status(411).json({
      success: false,
      message: "Invalid input fields",
      errors: formatted,
    });
    return;
  }
  next();
}

export const loginHandler = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token:", decoded);
    if(!decoded) {
      res.status(401).json({ error: "Invalid token" });
      return
    }
    const payload = decoded as MyJwtPayload;
    req.user = { id: payload.id };

    console.log("User ID from token:", req.user);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
    return;
  }
}


// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_PASSWORD } from "./config";


// export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//     }
//     try {
//         const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };
//         req.userId = decoded.id;
//         next();
//     } catch (e) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };
  






