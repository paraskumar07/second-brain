import { Router } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../db";
import { JWT_SECRET } from "../config";
import { validate } from "../middleware";
import { z } from "zod";

const router = Router();

// Contract: Username (3-10), password (8-20 w/ 1 upper, 1 lower, 1 digit, 1 special)
const signupSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string()
    .min(8).max(20)
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One lowercase required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special char required"),
});

router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await UserModel.findOne({ username });
    if (userExists) {
      res.status(403).json({ message: "User already exists with this username"});
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({ username, password: hash });
    res.status(200).json({ message: "Signed up" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Contract: 411 if bad inputs, 403 on not found/bad password, 500 on other
const signinSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(20),
});

router.post("/signin", validate(signinSchema), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(403).json({ message: "Wrong email password" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(403).json({ message: "Wrong email password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "6h" });
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
