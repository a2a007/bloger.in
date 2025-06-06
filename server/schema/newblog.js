const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/loginactivities")
  .then(() => console.log("mongodb connected sucessfully"))
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
});
module.exports = mongoose.model("newblogmodel", newblog, "blogs");
