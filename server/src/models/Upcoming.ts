import mongoose, { Schema, Document, Types } from "mongoose";

interface IUpcoming extends Document {
    userId:Types.ObjectId,
    title:string,
    image: string;
}

// Define the Mongoose schema
const upcomingSchema = new Schema<IUpcoming>(
  {
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required:true
        },
    title:{
        type:String,
        required:true
    },
    image: { type: String },
  })

const Upcoming = mongoose.model<IUpcoming>("Upcoming", upcomingSchema);
export default Upcoming;