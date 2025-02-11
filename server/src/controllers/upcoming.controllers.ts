import Upcoming from "../models/Upcoming";
import { Response, Request } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { UserRequest } from "../types/express";
import User from "../models/User";

export const createUpcoming = async(req:Request,res:Response) =>{
    try{
        const filePath = req.file ? req.file.path : "";
        
            if (!filePath) {
              res.status(400).json({ message: "No image file provided" });
              return;
            }
        
            // Upload image to Cloudinary
            let imageUrl = "";
            try {
              console.log("Uploading to Cloudinary:", filePath);
              const result = await cloudinary.uploader.upload(filePath, {
                transformation: [{ quality: "auto", fetch_format: "auto" }],
              });
              imageUrl = result.secure_url;
              fs.unlinkSync(filePath);
            } catch (error) {
              console.error("Cloudinary Upload Error:", error);
              res.status(500).json({ message: "Failed to upload image" });
              return;
            }
          const upcoming = new Upcoming({
            title:req.body.title,
            image:imageUrl
          })
          await upcoming.save();
          res.status(201).json({ message: "Upcoming concert created successfully", upcoming });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to create upcoming concert" });
        
    }
}

//Fetching all upcoming concerts
export const getAllUpcoming = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const upcomings = await Upcoming.find({});
    res
      .status(200)
      .json({ message: "Upcoming concerts fetched successfully", upcomings });
  } catch (error) {
    console.error("Failed to fetching upcoming concerts", error);
    res
      .status(500)
      .json({ message: "An error occured while fetching upcoming concerts", error });
  }
};


//Fetch user upcoming concerts
export const getUserUpcoming = async(req:UserRequest,res:Response) :Promise<void> => {
    try{
      const user = await User.findById(req.user?.id);
      if(!user){
        res.status(404).json({message:"User not found"});
        return 
      }
      const upcomings = await Upcoming.find({ userId: req.user?.id })
      .sort({ createdAt: -1 });
      res.status(200).json(upcomings);
    }catch(error){
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occured while fetching user upcoming concerts", error });
    }
  }

//Update a concert, its only can admin
export const updateAUpcoming = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const updatedConcert = await Upcoming.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedConcert) {
        res.status(404).json({ message: "Concert not found!" });
      }
      res
        .status(200)
        .json({ message: "Upcoming concert updated successfully", updatedConcert });
    } catch (error) {
      console.error("Failed to updating upcoming concert", error);
      res
        .status(500)
        .json({ message: "An error occured while updating upcoming concert", error });
    }
  };

  //Delete a concert, its only can admin
export const deleteAUpcoming = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedConcert = await Upcoming.findByIdAndDelete(id);
      if (!deletedConcert) {
        res.status(404).json({ message: "Concert not found!" });
      }
      res
        .status(200)
        .json({ message: "Upcoming concert deleted successfully", deletedConcert });
    } catch (error) {
      console.error("Failed to deleting upcoming concert", error);
      res
        .status(500)
        .json({ message: "An error occured while deleting upcoming concert", error });
    }
  };