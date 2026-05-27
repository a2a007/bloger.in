const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://adithya_a2a:adithya2244@cluster0.mjjldum.mongodb.net/loginactivities?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log('mongodb connected sucessfullyhiiii'))
.catch((err)=>console.log('error:hiu  '
    +err.message));

const newuser=new mongoose.Schema
({
    lastname:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'newblogmodel' }]
    
})
module.exports = mongoose.model("newusermodel",newuser,"userdata")