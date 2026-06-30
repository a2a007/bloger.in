// import {data,login} from './bb';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import {Avatar} from '@mui/material';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext} from 'react';
import { blogcontext } from "../App.jsx";
const paperstyle={
  width:'auto',
  height:'130px', 
  backgroundColor:'var(--bg-color-card-profile)',
  padding:"0px",
  color:'var(--text-color-card)',
  fontSize:'13px',
  transition: 'background-color 0.3s ease, color 0.3s ease'
};

const button={
  marginLeft:'auto',
  backgroundColor:'var(--btn-bg)',
  color:'var(--btn-text)',
  borderRadius:'20px',
  transition: 'background-color 0.3s ease, color 0.3s ease'
}
const buttonContainerStyle = {
  display:'flex',
  flexDirection:'row',
  backgroundColor: 'var(--bg-color-nav-container)',
  marginTop:'25px',
  marginBottom:'5px',
  height: '100px', 
  width:'300px',
  alignItems: 'center',
  color: 'var(--text-color-card)',
  borderRadius:'20px',
  paddingLeft:'25px',
  transition: 'background-color 0.3s ease, color 0.3s ease'
};
const css={
   borderRadius:'20px',
  padding:'10px 10px 10px 10px',
  marginBottom:'10px',
  backgroundColor:'var(--bg-color-card-profile)',
  transition: 'background-color 0.3s ease'
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
}
const div={
  backgroundColor:'var(--bg-color-main)',
  borderRadius:'5px',
  padding:"10px 10px 10px ",
  transition: 'background-color 0.3s ease'
}
const n={
  fontFamily:'Great Vibes',
  fontSize:'30px',
  color:'var(--text-color-main)',
}
const pro={
  marginLeft:'auto',
  alignItems:'center',
  display:'flex',
  flexDirection:'row',
  backgroundColor:'var(--bg-color-main)',
  transition: 'background-color 0.3s ease'
}
export function Blogger() {
  // let {x} = useParams();
  const[data,setdata]=useState([]);
  const {profile}=useContext(blogcontext);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:4002/api/blogger').then((res)=>{
      setdata(res.data)
    }).catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    if (profile) {
      const stored = localStorage.getItem(`bookmarks_${profile.email}`);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    }
  }, [profile]);

  const handleBookmark = (blogId, catogary) => {
    if (!profile) return;
    let updated;
    if (bookmarks.includes(blogId)) {
      updated = bookmarks.filter(id => id !== blogId);
      alert("Post removed from bookmarks!");
    } else {
      updated = [...bookmarks, blogId];
      alert(catogary + ' Added to bookmark');
    }
    setBookmarks(updated);
    localStorage.setItem(`bookmarks_${profile.email}`, JSON.stringify(updated));
  };

  const [editingBlog, setEditingBlog] = useState(null);
  const [editTopic, setEditTopic] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editFile, setEditFile] = useState('');

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setEditTopic(blog.topic);
    setEditCategory(blog.catogary);
    setEditDescription(blog.description);
    setEditContent(blog.content);
    setEditFile(blog.file);
  };

  const handleEditSave = () => {
    const updatedData = {
      topic: editTopic,
      catogary: editCategory,
      description: editDescription,
      content: editContent,
      file: editFile
    };

    axios.put(`http://localhost:4002/api/updateblog/${editingBlog.id}`, updatedData)
      .then((res) => {
        alert("Blog updated successfully!");
        setdata(prevData => prevData.map(item => item.id === editingBlog.id ? res.data.blog : item));
        setEditingBlog(null);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update blog");
      });
  };

  if(profile==null)
  alert('please login');
console.log(data);
 const y = data.filter(blogs=>profile.email!=blogs.email);
  console.log(y);
  return(
    <>
     <div style={div}>
       <div style={pro}>
         <Avatar sx={{ margin: '20px',
           height: '100px',
           width: '100px',
           borderRadius: '100%',  
           objectFit: 'fill', 
           border: '3px solid rgb(15, 15, 15)'}} className='avatar'  alt="Profile" src={y[0]?.avatar}/>
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
           <Typography style={n}>{profile.name}</Typography>
           <Link to="/newpost" style={{textDecoration:'none',color:'white', width: 'fit-content'}}>
             <Button className='icon' style={button}><AddIcon/>New Post</Button>
           </Link>
         </div>
       </div>
        {y.map((blog)=>(
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
              <p style={{
                fontSize: '13px',
                margin: '4px 0',
                marginLeft: '10px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#e0e0e0'
              }}>{blog.description}</p>
            </Box>
          </Grid>
          <Grid item xs={2} style={buttonContainerStyle} >
            <Button className='icon' onClick={() => handleEditClick(blog)}><EditIcon style={but}/></Button>
            <Button className='icon'  onClick={() => {
                if(window.confirm("Are you sure you want to delete this blog?")) {
                  axios.delete(`http://localhost:4002/api/deleteblog/${blog.id}`)
                    .then(() => {
                      alert("Blog Deleted Successfully");
                      // Update local state to remove the deleted blog
                      setdata(data.filter(item => item.id !== blog.id));
                    })
                    .catch(err => console.log(err));
                }
            }}><DeleteIcon style={but}/></Button>
              <Button className='icon' onClick={() => handleBookmark(blog.id, blog.catogary)}>
                {bookmarks.includes(blog.id) ? (
                  <BookmarkIcon style={{ ...but, color: 'var(--color-secondary)' }} />
                ) : (
                  <BookmarkBorderIcon style={but} />
                )}
              </Button>
          </Grid>
          </Grid>
          </div>
        ))}
        </div>
      {/* Edit Blog Dialog */}
      <Dialog open={Boolean(editingBlog)} onClose={() => setEditingBlog(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'var(--bg-color-main)', color: 'var(--text-color-main)' }}>Edit Blog Post</DialogTitle>
        <DialogContent sx={{ backgroundColor: 'var(--bg-color-main)', color: 'var(--text-color-main)', pt: 2 }}>
          <TextField
            margin="dense"
            label="Topic"
            type="text"
            fullWidth
            variant="outlined"
            value={editTopic}
            onChange={(e) => setEditTopic(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Automobile & technology">Automobile & technology</MenuItem>
            <MenuItem value="finance">finance</MenuItem>
            <MenuItem value="political">political</MenuItem>
            <MenuItem value="education & medical">education & medical</MenuItem>
            <MenuItem value="sports">sports</MenuItem>
            <MenuItem value="crime">crime</MenuItem>
            <MenuItem value="others">others</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            minRows={5}
            variant="outlined"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editFile}
            onChange={(e) => setEditFile(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'var(--bg-color-main)', px: 3, pb: 2 }}>
          <Button onClick={() => setEditingBlog(null)} sx={{ color: 'var(--text-color-main)' }}>
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" sx={{ backgroundColor: 'var(--bg-color-card)', color: 'var(--text-color-card)' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
        <style>
        {
          `.icon:hover{
        transform: scale(1.2);
        color:rgb(238, 240, 243);
        transition: transform 0.3s ease, color 0.3s ease;
        }`
        }
        </style>
    </>
  )
}
