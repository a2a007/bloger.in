const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newusermodel = require('../schema/newuser'); 
const { model } = require('mongoose');

const register={
    newuser:async (req,res)=>{
    try{
        console.log('entered server');
        const data=newusermodel(req.body);
         await data.save();
         console.log('user stored')
         res.status(201).json({message:'user stored successfully'})
    }
    catch(err){
        res.status(500).json({message:'Error storing',
            error:err.message
        });
    }
}}

module.exports=register;