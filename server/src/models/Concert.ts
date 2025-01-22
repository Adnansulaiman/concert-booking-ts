// const mongoose = require("mongoose")
import {Schema,model} from "mongoose";

interface IConcert {
    concert_name:string,
    venue:string,
    date:string,
    time:string,
    ticket_price:number,
    available_tickets?:number,
}
const concertSchema =new Schema<IConcert>({
    concert_name:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    ticket_price:{
        type:Number,
        required:true
    },
    available_tickets:{
        type:Number,
        required:true
    },
},{timestamps:true})

module.exports = model<IConcert>('Concert',concertSchema);