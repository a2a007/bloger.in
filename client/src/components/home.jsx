import { useContext, useEffect, useState } from 'react';
import { blogcontext } from "../App.jsx";
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { Button } from '@mui/material';
import axios from 'axios';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareCount,
} from "react-share";

const paperstyle={
  fontFamily:'Ubuntu',
  width:'auto',
  height:'240px', 
  backgroundColor:'var(--bg-color-card)',
  padding:"20px",
  fontSize:'10px',
  color:'var(--text-color-card)',
  borderRadius:'10px',
  marginLeft:'10px',
  border:3,
  transition: 'background-color 0.3s ease, color 0.3s ease'
};
const but={
  backgroundColor:'var(--btn-bg)',
  textDecoration: 'none',
  width:'100px',
  height:'40px',
  color:'var(--btn-text)',
  borderRadius:'8px',
  fontSize:'10px', 
  transition: 'background-color 0.3s ease, color 0.3s ease'
}
const css={
  padding:'10px 10px 10px 10px',
   backgroundColor:'var(--bg-color-main)',
   transition: 'background-color 0.3s ease'
}
const boxcss={
  fontFamily:'Ubuntu',
  display: 'flex', 
  flexDirection: 'column',
  alignItems:'center',
  justifyContent: 'center',
  height: '300px',
  width: 'auto',
  borderRadius:'20px',
  backgroundImage:'Url(back.jpg)',
  fontSize: "25px",
  backgroundSize: "cover",
  backgroundPosition:'center',
  color:'aliceblue',
}
const d={
    padding: '10px',
    borderRadius: '8px',
    marginLeft:'20px',
    marginTop:'20px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom:'15px',
    fontSize:'23px'
  }
const im={
  width: '100%',
  height: '220px', 
  objectFit: 'cover', 
  borderRadius: '14px',
  marginBottom:'6px',
  marginTop:'10px',
  marginLeft:'4px'
}
const spacing={
  margin:'10px 0px',
  fontSize:'25px',
}
const spacing2={
  margin:'10px 0px',
  fontSize:'18px',
}
const descStyle={
  margin:'10px 0px',
  fontSize:'14px',
  lineHeight: '1.4',
  color: '#dfdfdf',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
const fill={
  margin:'5px',
  size:'6px'
}
const button={
  display:'flex',
  flexDirection:'row',
  marginTop:'10px'
}
const date={
  margin:'5px 5px 5px 5px',
  fontSize:'10px',
  fontStyle:'italic'
}

export function Home() {
  const [blogs,setblogs]=useState([]);
  const { profile, showAlert } = useContext(blogcontext);

  useEffect(() => {
    axios.get('http://localhost:4002/api/allblogs')
    .then((res) => {
      if (Array.isArray(res.data.data)) {
        // Ensure likes is an array
        const sanitizedBlogs = res.data.data.map(b => ({
            ...b,
            likes: b.likes || []
        }));
        setblogs(sanitizedBlogs);
    } else {
        setblogs([]);
    }})
    .catch((err) => {
      console.log('notfound', err);
    });
}, []);

  const handleLike = (id, e) => {
    e.preventDefault();
    if (!profile) {
        showAlert("Please login to like!", "warning");
        return;
    }
    axios.post('http://localhost:4002/api/like', { id: id, email: profile.email })
    .then((res) => {
       // Update local state
       setblogs(prevBlogs => prevBlogs.map(blog => {
           if (blog.id === id) {
               return { ...blog, likes: res.data.likes };
           }
           return blog;
       }));
    })
    .catch(err => console.log(err));
  }

  return (
    <>
    <div style={css} key={0}>
    <Box sx={boxcss}>
        <div style={d}>
        <h1 style={{fontFamily:'Great Vibes'}}>Blogs</h1>
        <p>
          Your first blog posts won`t be perfect, but you just have to do it. You
          have to start somewhere - Shane Barker
        </p>
        <Button  size="sm" style={but} component={Link} to={(profile && profile.role=="Blogger"?'/newpost':'/createuser')} className='button'>
         Get started
        </Button>
        </div>
      </Box>
    </div>
    <div>
      <Paper >
        {blogs.map((blog)=>(
          <div key={blog.id} >
            <Grid  container style={css}>
              <Grid item xs={4} align='center' borderRadius={'2px'}>
             <Box style={paperstyle}> <img src={blog.file} style={im} alt="blog" /></Box>
              </Grid>
           <Grid item xs={8}>
            <Box style={paperstyle}>
              <h1 style={spacing}  className='topic'>{blog.topic}</h1>
              <p style={spacing2} >{blog.catogery}</p>
              <p style={date}>{blog.date}</p>
              <p style={descStyle}>{blog.description}</p>
              <div style={button}>
              <Button component={Link}  to={`/blog/${blog.id}`}style={but} className='button'>Read more</Button>
              
              <Button sx={{color:'white'}} style={fill} className='icon' onClick={(e)=>handleLike(blog.id, e)}>
                  {profile && blog.likes && blog.likes.includes(profile.email) ? 
                    <FavoriteBorderSharpIcon style={{color:'red'}}/> : 
                    <FavoriteBorderSharpIcon/>
                  }
                  {blog.likes ? blog.likes.length : 0}
              </Button>

              <FacebookShareButton networkName="Facebook" url={window.location.href} className='icon'>
                <FacebookIcon  style={fill} size={40} />
              </FacebookShareButton>
              <FacebookShareCount url={window.location.href}>
                {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
              </FacebookShareCount>
              <TwitterShareButton networkName="Twitter" url={window.location.href} className='icon'>
                <TwitterIcon style={fill} size={40} />
              </TwitterShareButton>
              <WhatsappShareButton networkname="Whatsapp" url={window.location.href} className='icon'>
                <WhatsappIcon style={fill} size={40} />
              </WhatsappShareButton>
              </div>
            </Box>
          </Grid>
          </Grid>
          </div>
        ))}
        </Paper>
    </div>
    <style>
      {
        `
        .icon:hover{
        transform: scale(1.2);
        color:rgb(238, 240, 243);
        transition: transform 0.3s ease;
        }
        .button:hover{
         transform: scale(1.2);
        transition: transform 0.3s ease;
        }
        .topic:hover{
        text-decoration:underline;
        }
        `
      }
    </style>
    </>
  )
}