import User from "../models/User";
import { Request, Response } from "express";

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

export const getAUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user", error });
  }
};

export const updateAUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user", error });
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
