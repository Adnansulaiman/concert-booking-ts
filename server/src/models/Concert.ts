// const mongoose = require("mongoose")
import mongoose, { Schema, Document, Types } from "mongoose";

interface IConcert extends Document {
  userId:Types.ObjectId
  title: string;
  artist: string;
  date: Date;
  time: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
  ticketTypes: {
    type: "General" | "VIP" | "VVIP";
    price: number;
    availableTickets: number;
    totalTickets: number;
  }[];
  category: string;
  description: string;
  image: string;
  // isFeatured: boolean;
  // createdAt: Date;
}

// Define the Mongoose schema
const concertSchema = new Schema<IConcert>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    ticketTypes: [
      {
        type: {
          type: String,
          enum: ["General", "VIP", "VVIP"],
          required: true,
        },
        price: { type: Number, required: true },
        availableTickets: { type: Number, required: true, min: 0 },
        totalTickets: { type: Number, required: true, min: 1 },
      },
    ],
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Concert = mongoose.model<IConcert>("Concert", concertSchema);
export default Concert;
