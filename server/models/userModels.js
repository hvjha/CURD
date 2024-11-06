import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   mobile : String
},{timestamps:true});

export const User = mongoose.model('user',userSchema)