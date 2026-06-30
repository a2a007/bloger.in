const mongoose=require('mongoose');

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