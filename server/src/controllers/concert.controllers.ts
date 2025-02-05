import Concert from "../models/Concert";
import { Response, Request } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { UserRequest } from "../types/express";
import User from "../models/User";

//Create a concert , its only can admin
export const createConcert = async (req: UserRequest, res: Response): Promise<void> => {
  console.log("Request Body:", req.body);
console.log("Request File:", req.file);
console.log("User ID in request body:", req.body.userId);
  try {
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

    // Parse venue and ticketTypes from JSON strings
    let venue, ticketTypes;
    try {
      venue = JSON.parse(req.body.venue);
      ticketTypes = JSON.parse(req.body.ticketTypes);
    } catch (error) {
      res.status(400).json({ message: "Invalid venue or ticketTypes format" });
      return;
    }
    // Validate required fields
    if (!venue || !venue.name || !venue.address || !req.body.date) {
      res.status(400).json({ message: "Missing required venue fields or date" });
      return;
    }

    const concert = new Concert({
      userId: req.body.userId, // ADD THIS LINE
      title: req.body.title,
      artist: req.body.artist,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      category: req.body.category,
      venue: venue,
      ticketTypes: ticketTypes,
      image: imageUrl,
    });

    await concert.save();
    res.status(201).json({ message: "Concert created successfully", concert });
  } catch (error) {
    console.error("Failed to create concert:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//Fetching all concerts
export const getAllConcerts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const concerts = await Concert.find({});
    res
      .status(200)
      .json({ message: "Concerts fetched successfully", concerts });
  } catch (error) {
    console.error("Failed to fetching concerts", error);
    res
      .status(500)
      .json({ message: "An error occured while fetching concerts", error });
  }
};
//Fetch user concerts
export const getUserConcert = async(req:UserRequest,res:Response) :Promise<void> => {
  try{
    const user = await User.findById(req.user?.id);
    if(!user){
      res.status(404).json({message:"User not found"});
      return 
    }
    const concerts = await Concert.find({ userId: req.user?.id })
    .sort({ createdAt: -1 });
    res.status(200).json(concerts);
  }catch(error){
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured while fetching user concerts", error });
  }
}
//Fetch a concert details
export const getAConcert = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const concert = await Concert.findById(id);
    res.status(200).json({ message: "Concert fetched successfully", concert });
  } catch (error) {
    console.error("Failed to fetching concert", error);
    res
      .status(500)
      .json({ message: "An error occured while fetching concert", error });
  }
};

//Update a concert, its only can admin
export const updateAConcert = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedConcert = await Concert.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedConcert) {
      res.status(404).json({ message: "Concert not found!" });
    }
    res
      .status(200)
      .json({ message: "Concert updated successfully", updatedConcert });
  } catch (error) {
    console.error("Failed to updating concert", error);
    res
      .status(500)
      .json({ message: "An error occured while updating concert", error });
  }
};

//Delete a concert, its only can admin
export const deleteAConcert = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedConcert = await Concert.findByIdAndDelete(id);
    if (!deletedConcert) {
      res.status(404).json({ message: "Concert not found!" });
    }
    res
      .status(200)
      .json({ message: "Concert deleted successfully", deletedConcert });
  } catch (error) {
    console.error("Failed to deleting concert", error);
    res
      .status(500)
      .json({ message: "An error occured while deleting concert", error });
  }
};

// //Book a concert
// export const bookAConcert = async(req:Request,res:Response):Promise<void> =>{
//   const {concert_id,quantity} = req.body;
//   try{
//     const concert = await Concert.findById(concert_id);

//   }catch(error){
//     console.error("Failed to book a concert : ",error);
//     res.status(500).json({message:"An error occured while booking a concert",error});
//   }
// }
