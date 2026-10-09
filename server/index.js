const dns = require('dns');
try {
    // Set DNS servers to Google and Cloudflare DNS if supported by environment
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.log('DNS setServers skipped:', e.message);
}

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
            retryWrites: true,
            w: 'majority'
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
    if (MONGO_URI) {
        await connectDB();
    }
    next();
});

const registercheck = require('./controller/logincontroller');
const register = require('./controller/registercontroller');
const blog = require('./controller/blogcontroller');
const home = require('./controller/homecontroller');
const filter = require('./controller/allblogcontroller');
const search = require('./controller/navcontroller');
const blogger = require('./controller/bloggercontroller');
const update = require('./controller/updatecontroller');

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

const router = express.Router();
router.post('/newuser', registercheck.login);
router.post('/newdata', register.newuser);
router.get('/nav', search.display);
router.get('/fetchuser/:email', registercheck.fetch);
router.post('/newblog', blog.newblog);
router.get('/allblogs', home.fetch);
router.post('/blog', filter.expand);
router.get('/blogger', blogger.blogs);
router.post('/like', blog.like);
router.get('/liked-posts/:email', blog.fetchLiked);
router.delete('/deleteblog/:id', blog.deleteBlog);
router.put('/updateblog/:id', update.updateBlog);

app.use('/api', router);

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => console.log(`Running on host ${PORT}`));
}

module.exports = app;
