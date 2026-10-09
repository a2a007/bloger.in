const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
const newblogmodel = require('../schema/newblog'); 

const blogs={
    blogs:async (req,res)=>{
        try{
            const data=await newblogmodel.find();
            console.log("fetched data")
            res.status(200).json(data);
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }
}
module.exports=blogs;