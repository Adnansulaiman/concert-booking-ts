import { Request, Response, NextFunction,RequestHandler } from "express";
import jwt from "jsonwebtoken";
import {UserRequest} from '../types/express';
import User from "../models/User";

interface UserPayload {
    id: string;
    role: string;
  }

  export const verifyUser = async(req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      // console.log("Authorization Header:", req.header("Authorization"));
      const token = req.header("Authorization")?.split(" ")[1];
      console.log("Token : ",token)
      if (!token) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
  
      const decoded =  jwt.verify(token,
        //  'concert_booking'
        process.env.JWT_SECRET_KEY as string
        ) as UserPayload;
      // console.log("Decoded : ",decoded)
      const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        req.user = {
            id: user._id.toString(),  // Ensure it's a string
            role: user.role,
        };

        console.log("Verified User:", req.user);
  
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

  export const verifyAdmin = (req: UserRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user || req.user.role.toLowerCase() !== "admin") {
        res.status(403).json({ message: "Admin access required" });
        return;
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized access" });
    }
  };