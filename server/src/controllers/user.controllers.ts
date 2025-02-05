import User from "../models/User";
import { Request, Response } from "express";
import { UserRequest } from "../types/express";

export const getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users", error });
  }
};

export const getUserDetails = async (req:UserRequest, res:Response):Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return 
    }
    res.status(200).json({ message: "User fetch successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while fetching user details", error });
  }
};

export const updateUserDetails = async (req:UserRequest, res:Response):Promise<void> => {
  // const { email } = req.body;
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
       res.status(404).json({ message: "User not found!" });
       return
    }
    // const isUserExists = await User.findOne({ email: email });
    // if (isUserExists && email !== user.email) {
    //   return res
    //     .status(400)
    //     .json({ message: "User is already exists, use another email address" });
    // }

    const updatedUser = await User.findByIdAndUpdate(req.user?.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ message: "User update successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating user", error });
  }
};

export const deleteAUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting user", error });
  }
};
