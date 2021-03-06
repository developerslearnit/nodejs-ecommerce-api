
const mongoos = require("mongoose");

const ProductSchema = new mongoos.Schema({
  title: { type: String, required: true, unique: true },
  description:{type:String,required:true},
  img: { type: String, required: true },
  categories: { type: Array },
  color: { type: String},
  size: { type: String},
  price: { type: Number, required: true },
  
},{timestamps:true});


module.exports = mongoos.model("Product", ProductSchema);
