import express, { NextFunction } from 'express';
import { connectDB, UserModel } from './db';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import { loginHandler, signinMiddleware, signupMiddleware} from './middleware';
import { ContentModel } from './db';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const app = express();
app.use(express.json());


app.post("/api/v1/signup",signupMiddleware, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("Signup request received:", { username, password });

    const user = await UserModel.findOne({ username });
    if (user) {
      res.status(403).json({ error: "Username already exists" });
      return;
    }
    const saltRounds = 10; // standard strength
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({ username, password: hashedPassword});

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
    return;
  } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      return;
  }
});


app.post("/api/v1/signin", signinMiddleware ,async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;  
    console.log("Username from request:", username);
    console.log("Username from request:", password);

    const user = await UserModel.findOne({username});

    if (!user) {
      res.status(403).json({ error: "user does not exists" });
      return;
    }

    // Check if the password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(403).json({ error: "Invalid password" });
      return;
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload,process.env.JWT_SECRET!,{
      expiresIn: "5h"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
    return;
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
    return;
  }

});


app.post("/api/v1/addContent", loginHandler , async (req: Request,res: Response)=> {
    const link = req.body.link;
    const type = req.body.type;

    try {
      await ContentModel.create({
      link,
      type,
      title: req.body.title,
      userId: req.user?.id,
    })
    }catch(e){
      res.status(411).json({
        error: e,
        msg:"Cannnot able to add content"
      })
      return;
    }

    res.json({
        message: "Content added"
    })

});


connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
