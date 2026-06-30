import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//import {data} from './bb';
import { Link} from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { useContext} from 'react';
import { blogcontext } from "../App.jsx";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';

const paperStyle={
  backgroundColor:'var(--bg-color-main)',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'normal',
  textAlign:'left',
  margin:'20px 20px 20px 20px',
  padding:'10px 5px 5px 5px',
  color: 'var(--text-color-main)',
  width:'auto',
  borderRadius:'10px',
  transition: 'background-color 0.3s ease, color 0.3s ease'
}
const dv={
  marginTop:'20px',
  marginBottom:'20px',
  marginLeft:'20px',
  marginRight:'20px'
}
const topic={
  marginTop:'10px',
  fontSize:'33px',
  fontFamily:'ubuntu',
  fontWeight:'bold'
}
const img={
  height:'300px',
  width:'50%',
  margin:'100px 20px 10px'
}
const Cards={
  display:"flex",
  flexDirection:"column",
  alignItems:"left",
}
// const para={
//   lineHeight:'1.4'
// }
const but={
  backgroundColor:'var(--btn-bg)',
  textDecoration: 'none',
  width:'100px',
  height:'40px',
  color:'var(--btn-text)',
   borderRadius:'8px',
   fontSize:'10px', 
   margin:'10px 10px 20px 10px',
   transition: 'background-color 0.3s ease, color 0.3s ease'
}
const des={
  fontSize:'20px',
  fontStyle:'italic',
  lineHeight:'1.2',
  margin:'10px 10px 10px 10px'
}

export  function Allblogs() {
  const {blog, profile, setblog} = useContext(blogcontext); // Ensure setblog is available from context
  
  const handleLike = (id, e) => {
    e.preventDefault(); // Prevent Link navigation
    if (!profile) {
        alert("Please login to like!");
        return;
    }
    axios.post('http://localhost:4002/api/like', { id: id, email: profile.email })
    .then((res) => {
       // Update global context state
       setblog(prevBlogs => prevBlogs.map(b => {
           if (b.id === id) {
               return { ...b, likes: res.data.likes };
           }
           return b;
       }));
    })
    .catch(err => console.log(err));
  }

  return ( 
     <>
     {blog.map(j => (
      <div key={j.id} style={Cards}>
      <Grid align='center' >
        <Paper elevation={6} style={paperStyle}>
          <div style={dv} key={j.id}>
          <h2 style={topic}>{j.topic}</h2>
          <h3 style={des}>{j.description}</h3>
          <img src={j.file}  style={img} alt='img' />
          <br/>
           <div style={{display:'flex', alignItems:'center'}}>
              <Button component={Link}  to={`/blog/${j.id}`}style={but} className='button'>Read more</Button>
               {profile && j.likes && j.likes.includes(profile.email) ? 
                 <FavoriteBorderSharpIcon style={{color: 'red', cursor:'pointer'}} onClick={(e) => handleLike(j.id, e)}/> : 
                 <FavoriteBorderSharpIcon style={{cursor:'pointer'}} onClick={(e) => handleLike(j.id, e)}/> 
               }
               <span style={{marginLeft:'5px'}}>{j.likes ? j.likes.length : 0}</span>
           </div>
          </div>
        </Paper>
      </Grid>
   </div>
     ))
    }
    </>
  )
}
