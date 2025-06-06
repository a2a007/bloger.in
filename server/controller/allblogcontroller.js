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
      res.send(data);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).send('Server error');
    }
  },
};


module.exports=expand;