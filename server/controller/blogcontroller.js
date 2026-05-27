const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newblogmodel = require('../schema/newblog'); 
const newusermodel = require('../schema/newuser');
const config = require('../index.js');
//  const multer = require('multer');

// const path = require('path');

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
            const { topic, catogary, author, email, description, content,date, file} = req.body;
           //const imageFile = req.file; 
             //console.log(imageFile)
            // if (!imageFile) {
            //     console.error('image required')
            //     return res.status(400).json({ message: "Image file is required" });
            // }
           let count=await newblogmodel.countDocuments();
            count++;
            const newblog = new newblogmodel({
                id: count,
                topic,
                catogary,
                author,
                email,
                description,
                content,
                date,
                file
            });
            console.log("almost ready");
            await newblog.save();
            console.log('saved blog');
            res.status(200).json({data:true});
        }
        catch(err){
            console.log("error from storing blog: ",err);
            res.status(501).json({message:err.message} );
        }
        },
        like: async (req, res) => {
        try {
            const { id, email } = req.body;
            console.log("-----------------------------------------");
            console.log("SERVER: Received Like Request");
            console.log("Payload ID:", id, "Type:", typeof id);
            console.log("Payload Email:", email);

            // Force ID to integer if it's a string, assuming schema uses Number for 'id'
            const searchId = parseInt(id);
            console.log("Searching for Blog ID:", searchId);

            const blog = await newblogmodel.findOne({ id: searchId });
            console.log("Found Blog:", blog ? `Yes (ID: ${blog.id})` : "No");
            
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            const user = await newusermodel.findOne({ email: email });
             console.log("Found User:", user ? "Yes" : "No");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!blog.likes) blog.likes = [];
            if (!user.likedPosts) user.likedPosts = [];

            console.log("Current Blog Likes:", blog.likes);
            console.log("Current User LikedPosts:", user.likedPosts);

            const isLiked = blog.likes.includes(email);
            console.log("Is Liked?", isLiked);

            if (isLiked) {
                // Unlike
                console.log("Action: Unlike");
                blog.likes = blog.likes.filter(e => e !== email);
                user.likedPosts = user.likedPosts.filter(postId => !postId.equals(blog._id));
            } else {
                // Like
                console.log("Action: Like");
                blog.likes.push(email);
                user.likedPosts.push(blog._id);
            }
            
            // Mark modified if needed (Mongoose usually tracks push/filter, but explicit mark is safe)
            blog.markModified('likes');
            user.markModified('likedPosts');

            await blog.save();
            await user.save();
            
            // Verification Log
            console.log(`[VERIFY] Blog (ID: ${id}) likes updated in DB. New count: ${blog.likes.length}`);
            console.log(`[VERIFY] User (Email: ${email}) likedPosts updated in DB. New count: ${user.likedPosts.length}`);

            res.status(200).json({ 
                message: isLiked ? "Unliked" : "Liked", 
                likes: blog.likes,
                isLiked: !isLiked
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    
    // Fetch Liked Posts
    fetchLiked : async (req, res) => {
        try {
            const { email } = req.params;
            const user = await newusermodel.findOne({ email }).populate('likedPosts');
            console.log("Fetching liked posts for:", email);
            console.log("Found user:", user ? user.email : "None");
            console.log("Liked Posts:", user ? user.likedPosts : "N/A");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user.likedPosts || []);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
    }
    // Toggle Like
module.exports=blog;
