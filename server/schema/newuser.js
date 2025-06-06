const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/loginactivities")
.then(()=>console.log('mongodb connected sucessfully'))
.catch((err)=>console.log('error:'
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
    
})
module.exports = mongoose.model("newusermodel",newuser,"userdata")