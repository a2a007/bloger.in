const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newblogmodel = require('../schema/newblog'); 
const multer = require('multer');

const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Save images in "uploads" folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     }
// });

// const upload = multer({ storage: storage });

const blog={
    newblog:async (req,res)=>{
        try{
            console.log('entered server for newblog');
            const { topic, catogary, author,description, content,date,file } = req.body;
           //const imageFile = req.file; 
             //console.log(imageFile)
            // if (!imageFile) {
            //     console.error('image required')
            //     return res.status(400).json({ message: "Image file is required" });
            // }
            console.log('stored blog');
           let count=await newblogmodel.countDocuments();
            count++;
            const newblog = new newblogmodel({
                id: count,
                topic,
                catogary,
                author,
                description,
                content,
                date,
                file
            });
            await newblog.save();
            console.log('saved blog');
            res.status(200).json({data:true});
        }
        catch(err){
            console.log("error from storing blog: ",err);
            res.status(501).json({message:err.message} );
        }
        }
    }
module.exports=blog;
