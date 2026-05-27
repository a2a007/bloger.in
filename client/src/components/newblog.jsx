import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button, Alert, MenuItem } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { blogcontext } from "../App.jsx";
const paperStyle = {
  width: 800,
  padding: "30px 20px",
  margin: "auto",
  marginTop: "10vh",
  marginBottom: "10vh",
  borderRadius: '20px',
  backgroundColor: '#F2EFE7',
  color: 'rgb(55 60 57)',
  boxSizing: "border-box",
};

const inputStyle = {
  width: "85%",
  marginBottom: "20px",
};

export function Newblog() {
  const{profile}=useContext(blogcontext);
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [serverRes, setServerRes] = useState('');
  // const [author,setAuthor]=useState('');
  // const login=localStorage.getItem('status');  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!profile){
      setServerRes('required email to post');
      return;
      }
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
     const data={
      topic:topic,
      catogary:category,
      author:profile.name,
      email:profile.email,
      description:description,
      content:content,
      date:formattedDate,
      file:file
    }
    console.log(data);
    
     if (!(topic && category  && description && content && file)) {
      setServerRes('Enter all required fields to continue');
      return;
    }
    console.log(profile);
    //server side code
    axios.post('http://localhost:4002/api/newblog', data)
    .then((res) => {
      console.log(res.data.data);
      navigate("/home");
    })
    .catch((err) => console.log("hi jk"+err));
  };

  return (
    <Grid align="center">
      <Paper elevation={2} style={paperStyle}>
        <h1 style={{ fontFamily: 'Alex Brush' }}>New Blog</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center' }}>
        {serverRes && <Alert severity="warning">{serverRes}</Alert>}
          <TextField
            label="Topic"
            variant="outlined"
            placeholder="Topic"
            style={inputStyle}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <TextField
            select
            label="Category"
            variant="outlined"
            style={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="Automobile & technology">Automobile & technology</MenuItem>
            <MenuItem value="finance">finance</MenuItem>
            <MenuItem value="political">political</MenuItem>
            <MenuItem value="education & medical">education & medical</MenuItem>
            <MenuItem value="sports">sports</MenuItem>
            <MenuItem value="crime">crime</MenuItem>
            <MenuItem value="others">others</MenuItem>
          </TextField>
          <Textarea
            minRows={3}
            placeholder="Description"
            style={{ ...inputStyle, backgroundColor: '#F2EFE7' }}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Textarea 
            minRows={6}
            placeholder="Content"
            style={{ ...inputStyle, backgroundColor: '#F2EFE7' }}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <TextField
            type="text"
            style={inputStyle}
            placeholder='Image URL'
            onChange={(e) => setFile(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: 'rgb(55 60 57)',width:'120px' }}>
            Send
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
