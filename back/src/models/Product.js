import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name:String,
  images:Array,
  new_price:Number,
  old_price:Number,
  available:Boolean,
  sizes:Array || null,
  description:String,
  category:String,
  date:Date
})
export const Product = mongoose.model('Product',productSchema)
