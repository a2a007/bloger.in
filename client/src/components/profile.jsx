import React, { useContext, useEffect, useState } from 'react';
import { blogcontext } from "../App.jsx";
import axios from 'axios';
import { Avatar, Button, Grid, Typography, Box, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const paperstyle={
  width:'auto',
  height:'130px', 
  backgroundColor:'#697565',
  padding:"0px",
  color:'#F2EFE7',
  fontSize:'13px',
};

const buttonContainerStyle = {
  display:'flex',
  flexDirection:'row',
  backgroundColor: '#697565', // Updated to match card color (or transparent if preferred)
  marginTop:'25px',
  marginBottom:'5px',
  height: '100px', 
  width:'300px',
  alignItems: 'center',
  color: '#F2EFE7',
  borderRadius:'20px',
  paddingLeft:'25px'
};

const css={
   borderRadius:'20px',
  padding:'10px 10px 10px 10px',
  marginBottom:'10px',
  backgroundColor:'#697565'
};

const im={
  margin:'10px',
  width: '170px',
  height:'120px',
};

const but={
  width:'30px',
  height:'30px',
  color:'aliceblue'
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function Profile() {
    const { profile } = useContext(blogcontext);
    const [likedPosts, setLikedPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        if (profile) {
            // Fetch Liked Posts
            axios.get(`http://localhost:4002/api/liked-posts/${profile.email}`)
                .then(res => {
                    console.log("Liked posts response:", res.data);
                    setLikedPosts(res.data);
                })
                .catch(err => console.log(err));

            // Fetch My Posts (if Blogger)
            if (profile.role === 'Blogger') {
                axios.get('http://localhost:4002/api/blogger')
                    .then(res => {
                         const myBlogs = res.data.filter(blog => blog.email === profile.email);
                         setMyPosts(myBlogs);
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [profile]);

    if (!profile) return <div>Please Login</div>;

    const renderPosts = (posts) => (
        posts.map((blog) => (
            <div key={blog.id}>
             <Grid  container style={css}>
               <Grid item xs={2} align='center'>
             <Box style={paperstyle}><img src={blog.file} style={im} alt='img' /></Box>
             </Grid>
            <Grid item xs={8}>
             <Box style={paperstyle}>
             <Typography variant="h6" style={{ fontSize: '10px', }}/>
               <h3 style={{ fontSize: '20px', margin: '6px 0', marginLeft:'10px',fontStyle:'bold' }}>{blog.topic}</h3>
               <h5 style={{ fontSize: '14px', margin: '6px 0',marginLeft:'13px' }}>{blog.catogary}</h5>
               <p style={{ fontSize: '14px', margin: '6px 0',marginLeft:'10px' }}>{blog.description}</p>
             </Box>
           </Grid>
           <Grid item xs={2} style={buttonContainerStyle} >
               {/* Actions can be added here */}
           </Grid>
           </Grid>
           </div>
        ))
    );

    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Avatar sx={{ width: 100, height: 100, marginRight: '20px' }} src={profile.avatar} />
                <Box>
                    <Typography variant="h4">{profile.name}</Typography>
                    <Typography variant="subtitle1">{profile.role}</Typography>
                </Box>
            </Box>

            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Liked Posts" />
                {profile.role === 'Blogger' && <Tab label="My Blogs" />}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                {likedPosts.length > 0 ? renderPosts(likedPosts) : <Typography>No liked posts yet.</Typography>}
            </TabPanel>
            {profile.role === 'Blogger' && (
                <TabPanel value={tabValue} index={1}>
                     {myPosts.length > 0 ? renderPosts(myPosts) : <Typography>No blogs posted yet.</Typography>}
                </TabPanel>
            )}
        </Box>
    );
}
