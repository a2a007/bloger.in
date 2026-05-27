const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://adithya_a2a:adithya2244@cluster0.mjjldum.mongodb.net/loginactivities?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("mongodb connected sucessfully hi"))
  .catch((err) => console.log("error:" + err.message));
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
