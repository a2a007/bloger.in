const mongoose = require("mongoose");

const newblog = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  catogary: {
    type: String,
    required: true,
  },
  author:{
    type:String,
    required:true
  },
  email:{
    type:String,
    // required:true
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
      type:String,
      required:true
  },
  likes: {
    type: [String],
    default: []
  }
});
module.exports = mongoose.model("newblogmodel", newblog, "blogs");
