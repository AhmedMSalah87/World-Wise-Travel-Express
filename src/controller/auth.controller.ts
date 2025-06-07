import { Request, Response } from "express";
import { connectDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// user registeration
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await connectDB();
  // extract form data from request body
  const { name, email, password, userId } = req.body as {
    name: string;
    email: string;
    password: string;
    userId: string;
  };
  // check for fom data to be required
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  // check for user is already existed
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  // add new user to database
  const newUser = {
    name,
    email,
    password: hashedPassword,
    _id: new ObjectId(userId),
  };
  const result = await db.collection("users").insertOne(newUser);
  if (result) {
    res.status(201).json({ message: "account created successfully" });
  }
};

//user loggin
export const logUser = async (req: Request, res: Response): Promise<void> => {
  const db = await connectDB();
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  // Compare password with hashed password stored in DB
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  res.status(200).json({ message: "Login successful" });
};
