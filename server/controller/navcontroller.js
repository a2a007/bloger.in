const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newblogmodel = require('../schema/newblog'); 

const display={
    display:async(req,res)=>{ 
        try{
        console.log("entered the display Side");
        const data=await newblogmodel.find().lean();
         if (!data) {
            return res.status(200).json({ message: 'No user exists' ,data:false});
         }
        
        console.log('sent data');
     res.status(200).json({data});
    }
    catch(err){
        console.log(err)
    }
    }
}
module.exports=display;