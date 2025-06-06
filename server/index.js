const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const multer = require('multer');
const router = express.Router();
app.listen(4002,console.log('Running on host 4002'));
const registercheck = require('./controller/logincontroller');
const register = require('./controller/registercontroller')
const blog=require('./controller/blogcontroller')
const home=require('./controller/homecontroller')
const filter=require('./controller/allblogcontroller')
const search=require('./controller/navcontroller')
app.get('/',(req,res)=>{
    res.send('Backend server');
})

 const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

router.post('/newuser',registercheck.login)
router.post('/newdata',register.newuser)
router.get('/nav',search.display)
router.get('/fetchuser/:email',registercheck.fetch)
router.post('/newblog',blog.newblog)
router.get('/allblogs',home.fetch)
router.post('/blog',filter.expand)
app.use('/api',router);


//newuserdata



//login code



//newblog
// app.post(('/newblog'),async (req,res)=>{
//     try{
//         console.log('entered server for newblog')
//         const data = newblogmodel(req.body);
//         console.log(data)
//         console.log('bloged stored success');
//         await data.save();
//         console.log('bloged stored success');
//         res.status(200).json({message:'newblog stored successfully'})
//     }
//     catch(err){
//         res.status(500).json({error:err.message})
//     }
// })

const config = {
    BASE_URL: "http://localhost:4002/uploads/"
};

module.exports = config;
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const router = express.Router();

// app.use(express.json());
// app.use(cors());

// // Multer setup
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

// // Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));

// // Import controllers
// const registercheck = require('./controller/logincontroller');
// const register = require('./controller/registercontroller');
// const blog = require('./controller/blogcontroller');
// const home = require('./controller/homecontroller');
// const filter = require('./controller/allblogcontroller');
// const newblogmodel = require('./schema/newblog');

// // Routes
// app.get('/', (req, res) => {
//     res.send('Backend server');
// });

// router.post('/newuser', registercheck.login);
// router.post('/newdata', register.newuser);
// router.get('/fetchuser/:email', registercheck.fetch);
// router.post('/newblog', upload.single('file'), blog.newblog);
// router.get('/allblogs', home.fetch);
// router.post('/blog', filter.expand);

// // 🟢 Serve image by ID
// router.get('/image/:id', async (req, res) => {
//     try {
//         const blog = await newblogmodel.findById(req.params.id);
//         if (!blog || !blog.file) {
//             return res.status(404).send('Image not found');
//         }

//         const imagePath = path.join(__dirname, blog.file);
//         if (fs.existsSync(imagePath)) {
//             res.sendFile(imagePath);
//         } else {
//             res.status(404).send('File not found');
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving image');
//     }
// });

// // Mount router on /api
// app.use('/api', router);

// // Config for frontend
// const config = {
//     BASE_URL: "http://localhost:4002/uploads/"
// };
// module.exports = config;

// // ✅ Start server (after all routes are set up)
// app.listen(4002, () => {
//     console.log('Server running on port 4002');
// });
