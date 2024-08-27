import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  name:String,
  avatar:String, 
  password:String,
  email:String,
  verified:Boolean,
  regCode:String,
  recPassCode:String,
  date:Date
})
export const User = mongoose.model('User',userSchema)
