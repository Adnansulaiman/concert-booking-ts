import Concert from "../models/Concert";
import { Response, Request } from "express";

//Create a concert , its only can admin
export const createConcert = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const concert = new Concert(req.body);
    await concert.save();
    res.status(200).json({ message: "Successfully created concert", concert });
  } catch (error) {
    console.error("Failed to create concert", error);
    res
      .status(500)
      .json({ message: "An error occured while creating concert", error });
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
