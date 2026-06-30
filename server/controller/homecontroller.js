const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newblogmodel = require('../schema/newblog'); 
const config = require('../index.js')
const home={
    fetch:async (req,res)=>{
        try{
            console.log('entered server fetch')
            const data= await newblogmodel.find().sort({ _id: -1 });
            console.log('fetched data');
            const sanitizedData = data.map(blog => ({
                ...blog.toObject(),
                likes: blog.likes || []
            }));
            res.status(200).json({data: sanitizedData});
        }
        catch(err){
            console.log('error from fetch')
            res.status(500).json({ error: "Error fetching data from homecontroller"
            })
        }
    }
}
module.exports=home;
