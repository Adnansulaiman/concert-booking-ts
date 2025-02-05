// const mongoose = require("mongoose")
import {Schema,model} from "mongoose";

interface IUser {
    name:string,
    email:string,
    password:string,
    role:'user'| 'admin'
}
const userSchema =new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Role-based access
})

const User = model<IUser>('User',userSchema);
export default User;