import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Alert from '@mui/material/Alert';
 import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const paperstyle={
    height: "auto",
    width: 800,
    padding: "30px 20px",
    margin: "auto",
    marginTop: "10vh",
    display:"flex",
    marginBottom:"10vh",
    gap:20,
    borderRadius:'20px',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box", 
    FontFamily:"Alex Brush",
    backgroundColor:'#F2EFE7',
    color:'rgb(55 60 57)'
  };
export function Newblog() {
   const navigate = useNavigate(); 
  const [topic,settopic]=useState('');
  const [catogery,setcatogery]=useState('');
  const [description,setdescription]=useState('');
  const [content,setcontent]=useState('');
  const [file,setfile]=useState('');
  const [serverres,setserverres]=useState('');
  const input=()=>{
    const now = new Date();
    const formattedDate = ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()};
    if(!(topic && catogery && description && content && file))
      setserverres('enter required field to continue')
    const data={
      topic:topic,
      catogary:catogery,
      description:description,
      content:content,
      date:formattedDate,
      file:file
    }
    console.log(file);
  axios.post('http://localhost:4002/api/newblog',data,{
    headers: { 'Content-Type': 'multipart/form-data' }})
  .then((res)=>{
    console.log(res.data.data)
  }).catch((err)=>{
    console.log(err)})

setTimeout(() => navigate("/home"), 1000);
}
    return(
        <>
        <Grid align='center'>
           <Paper elevation={2} style={paperstyle} >
           {serverres && <Alert severity="warning">{serverres}</Alert>}
            <h1 style={{fontFamily:'Alex Brush'}}>New blog</h1>
            <form onSubmit={input}>
           <TextField
            id="Topic"
            label="Topic"
            variant='outlined'
            style={{
              width: "100%" ,
                fontSize: "16px", 
                padding: "10px",
                 color:'rgb(55 60 57)'
              }}
              placeholder='Topic'
              onChange={e=>settopic(e.target.value)}
              required/>
            <TextField
            id="catogory"
            label="Catogary"
            variant='outlined'
            style={{
              width: "100%",
                fontSize: "16px", 
                padding: "10px", 
                 color:'rgb(55 60 57)'
              }}
              placeholder='Catogery' 
              onChange={e=>setcatogery(e.target.value)}
               required/>
              <Textarea 
              minRows={3}
              id="description"
              placeholder='Description'
              style={{
                backgroundColor:'#F2EFE7',
                width: "100%", 
                fontSize: "16px", 
                padding: "10px",
              }}  
              onChange={e=>setdescription(e.target.value)}
              required/>
            <Textarea id="content"
            placeholder="Give the content"
            minRows={6}
            style={{
              backgroundColor:'#F2EFE7',
                width: "100%", 
                fontSize: "16px", 
                padding: "10px",
                 color:'rgb(55 60 57)'
              }}
              onChange={e=>setcontent(e.target.value)}
              />
               <Textarea
            type="text"
            id="standard-basic"
             style={{
              width: "100%" ,
                fontSize: "16px", 
                padding: "10px",
                 color:'rgb(55 60 57)'
              }}
            variant="standard"
            onChange={e=>setfile(e.target.value)}
            required/>
      <Button type='submit' variant="contained" endIcon={<SendIcon />}  sx={{backgroundColor:'rgb(55 60 57)'}}>
        Send
      </Button>
      </form>
           </Paper>
        </Grid>
        </>
    )
}