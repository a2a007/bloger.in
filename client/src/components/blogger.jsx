import {data,login} from './bb';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {Typography} from '@mui/material';
import {Avatar} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
const paperstyle={
  width:'auto',
  height:'130px', 
  backgroundColor:'#697565',
  padding:"0px",
  color:'#F2EFE7',
  fontSize:'13px',
  
};

const button={
  marginLeft:'auto',
  backgroundColor:'#D4D7B5',
  color:'#181C14',
  //color:'aliceblue',
  borderRadius:'20px'
}
const buttonContainerStyle = {
  display:'flex',
  flexDirection:'row',
  backgroundColor: '#181C14',
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
}
const div={
  backgroundColor:'#EAEAEA',
  borderRadius:'5px',
  padding:"10px 10px 10px ",
}
const n={
  fontFamily:'Great Vibes',
  fontSize:'30px',
  color:'#181C14',
  
}
const pro={
  marginLeft:'auto',
  alignItems:'center',
  display:'flex',
  flexDirection:'row',
  backgroundColor:'#EAEAEA',
}
export function Blogger() {
  let {x} = useParams();
  let y = data.filter(blog=>blog.author===x);
  let u= login.filter(i=>i.name===x)
  return (
    <>
    <div style={pro}>
    <Avatar sx={{ margin: '20px',
  height: '100px',
  width: '100px',
  borderRadius: '100%',  
  objectFit: 'fill', 
  border: '3px solid rgb(15, 15, 15)'}} className='avatar'  alt="Profile" src={y[0]?.avatar}/>
    <div><Typography style={n}>{u[0].username}</Typography><Link to="/newpost" style={{textDecoration:'none',color:'white'}}>
    <Button className='icon' style={button}><AddIcon/>New Post</Button></Link></div>
    </div>
     <div style={div}>
        {y.map((blog)=>(
          <div key={blog.id}>
            <Grid  container style={css}>
              <Grid item xs={2} align='center'>
            <Box style={paperstyle}><img src={blog.img} style={im} alt='img' /></Box>
            </Grid>
           <Grid item xs={8}>
            <Box style={paperstyle} >
            <Typography variant="h6" style={{ fontSize: '10px', }}/>
              <h3 style={{ fontSize: '20px', margin: '6px 0', marginLeft:'10px',fontStyle:'bold' }}>{blog.topic}</h3>
              <h5 style={{ fontSize: '14px', margin: '6px 0',marginLeft:'13px' }}>{blog.catogery}</h5>
              <p style={{ fontSize: '14px', margin: '6px 0',marginLeft:'10px' }}>{blog.decript}</p>
            </Box>
          </Grid>
          <Grid item xs={2} style={buttonContainerStyle} >
            {/* <Button className='icon'><EditIcon style={but}/></Button> */}
            <Button className='icon'  onClick={()=>{console.log(blog.id + 'Deleted');alert(blog.catogery + ' Deleted Successfully')}}><DeleteIcon style={but}/></Button>
              <Button className='icon' onClick={()=>{console.log(blog.id + ' Added to bookmark');alert(blog.catogery + ' Added to bookmark')}}>
                <BookmarkBorderIcon style={but}/>
              </Button>
          </Grid>
          </Grid>
          </div>
        ))}
        </div>
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
