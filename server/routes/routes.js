const express = require('express');
const register = require('../controller/registercontroller');
const registercheck = require('../controller/logincontroller');
const blog = require('../controller/blogcontroller');
const home = require('../controller/homecontroller');
const expand=require('../controller/allblogcontroller');
const app = express();
app.use(express.json());
const router = express.Router();
//app.listen(4001,console.log('Running on host 4001'));

router.post('/newuser',register.newuser)
router.post('/userdata',registercheck.login)
router.get('/fetchuser/:email',registercheck.fetch)
router.post('/newblog',blog.newblog)
router.get('/allblogs',home.fetch)
router.post('/filterblog',expand.expand)
router.post('/like', blog.like);
router.get('/liked-posts/:email', blog.fetchLiked);
app.use('/api',router);