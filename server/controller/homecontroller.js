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
            const data= await newblogmodel.find();
            console.log('fetched data');
            const blogsdata = data.map(blog => ({
                _id: blog._id,
                topic: blog.topic,
                category: blog.catogary,
                description: blog.description,
                content: blog.content,
                date: blog.date,
                file: blog.file
                ? `http://localhost:4002/api/image/${blog._id}` // Correctly serve image
                : null
        }))
            res.status(200).json({data});
        }
        catch(err){
            console.log('error from fetch')
            res.status(500).json({ error: "Error fetching data from homecontroller"
            })
        }
    }
}
module.exports=home;
