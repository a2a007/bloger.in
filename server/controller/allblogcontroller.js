const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newblogmodel = require('../schema/newblog'); 

const expand = {
  expand: async (req, res) => {
    try {
      console.log('filter'); // This will now print
      console.log('Request body:', req.body); // This shows what you receive from client 

      const id = parseInt(req.body.id); // 👈 Extract id properly (parseInt if your DB uses numeric IDs)
      const data = await newblogmodel.findOne({ id: id });

      console.log('Blog found:', data);

      if (!data) {
        return res.status(404).send('Blog not found');
      }

      // Ensure likes array exists
      const sanitizedData = {
          ...data.toObject(),
          likes: data.likes || []
      };

      res.send(sanitizedData);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).send('Server error');
    }
  },
};


module.exports=expand;