import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//import {data} from './bb';
import { Link} from 'react-router-dom';
import { Button } from '@mui/material';
//import axios from 'axios';
import { useContext} from 'react';
import { blogcontext } from "../App.jsx";

const paperStyle={
  backgroundColor:'#F2EFE7',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'normal',
  textAlign:'left',
  margin:'20px 20px 20px 20px',
  padding:'10px 5px 5px 5px',
  color: '#555',
  width:'auto',
  borderRadius:'10px'
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
  backgroundColor:'#ECCE6D',
  textDecoration: 'none',
  width:'100px',
  height:'40px',
  color:'#1B4B4D',
   borderRadius:'8px',
   fontSize:'10px', 
   margin:'10px 10px 20px 10px'
}
const des={
  fontSize:'20px',
  fontStyle:'italic',
  lineHeight:'1.2',
  margin:'10px 10px 10px 10px'
}
export  function Allblogs() {
  //let {i} = useParams();
//   const[data,setdata]=useState([]);
//   useEffect(()=>{
//     axios.get("http://localhost:4002/api/nav").then((res)=>{setdata(res.data.data)}).catch((err)=>console.log(err))
// },[])
  //let k = data.filter(blog=>blog.catogery===i);
  const {blog}=useContext(blogcontext);
  console.log(blog);
  // if(!k)
  //  return (<h2>No such blog exist</h2>)
  return ( 
     <>
     {blog.map(j => (
      <div key={j.id} style={Cards}>
      <Grid align='center' >
        <Paper elevation={6} style={paperStyle}>
          <div style={dv} key={j.id}>
          <h2 style={topic}>{j.topic}</h2>
          <h3 style={des}>{j.decript}</h3>
          <img src={j.file}  style={img} alt='img' />
          <br/>
          <Button component={Link}  to={`/blog/${j.id}`}style={but} className='button'>Read more</Button>
          </div>
        </Paper>
      </Grid>
   </div>
     ))
    }
    </>
  )
}
