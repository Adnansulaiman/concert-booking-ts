import User from "../models/User";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async(req:Request,res:Response):Promise<void> =>{
    const {name,email,password,role} = req.body;
    try{
        //Check if user already exists
        const isExistingUser = await User.findOne({email});
        if(isExistingUser){
            res.status(400).json({message:"User already exists, change your email"});
            return;
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        
        //Create a new user 
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role
        })
        await newUser.save();
        // //Generate token
        // const data = {
        //     user:{
        //         id:newUser._id,
        //         role:newUser.role
        //     }
        // }
        const token = jwt.sign(
            { 
                id: newUser._id,
                role: newUser.role // Ensure this is 'admin' for admin users
              },
            process.env.JWT_SECRET_KEY as string,{expiresIn:'1d'})
        res.status(201).json({ message: 'User registered successfully',token, role:newUser.role });
    }catch(error){
        console.error("Failed to register user : ",error)
        res.status(500).json({message:"An error occured while Register user",error})
    }
}

export const login = async(req:Request,res:Response):Promise<void> =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({message:'User not found!'});
            return;
        }

        //Compare password
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).json({message:"Invalid password"});
            return;
        }

        // //Generate token 
        // const data = {
        //     user:{
        //         id:user._id,
        //         role:user.role
        //     }
        // }
        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role // Ensure this is 'admin' for admin users
              },
            process.env.JWT_SECRET_KEY as string,{expiresIn:'1d'});
        res.status(200).json({message:"Login successfully",token,role:user.role})
    }catch(error){
        console.error("Failed to login user : ",error);
        res.status(500).json({message:"An error occured while login user"})
    }
}