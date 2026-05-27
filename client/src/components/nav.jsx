import logo from "./logo.jpg";
import { Link } from "react-router-dom";
import "./css1.css";
import { Autocomplete, Avatar } from "@mui/material";
import { Button } from "@mui/material";
// import { login } from "./bb.js";
import {  useState } from "react";
import TextField from "@mui/material/TextField";
//import { Allblogs} from './allblog.jsx';
//import { Box } from "@mui/material";
//import { data } from "./bb.js";
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
//export const blogcontext=createContext();
import { useContext } from "react";
import { blogcontext } from "../App.jsx";

const but={
    backgroundColor:'#727D73',
    color:'black',
    margin:'10px 20px 10px 20px',
   marginLeft: 'auto',
    borderRadius:'15px',
    fontSize:'12px'
}

export function Nav() {
  const{cat,onsearch,profile,setprofile,setblog}=useContext(blogcontext);
  let navigate = useNavigate();
  //const[cat,setcat]=useState([]);
  // const status=localStorage.getItem('status');
  // console.log(profile.role);
  // const [login,setlogin]=useState(status);
  
  let handlesign = () => {
    
    if (profile) {
      // Clear all user data from storage
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Clear profile and blog state
      setprofile(null);
      setblog([]);
      navigate("/");
    } else {
      // Logic handled by Link to /sign
    }
};

 let handle=(event,value)=>{
  onsearch(event,value);
  navigate(`/allblogs`);
 }
  return (<>
    <div className="navbar">
      <div className="logo">
        <a href="/about">
          <img alt="Img" src={logo} />
        </a>
      </div>
      <div className="nag">
      <Link to="/" style={{textDecoration:'none',color:'white',margin:'10px'}}>
         <h1  className="tex"> Home</h1>
        </Link>
        <Autocomplete
          disablePortal
          color="white"
          options={[...new Set(cat.map((item) => item.catogary))]}
          sx={{
            fontFamily: "Ubuntu",
            height: "35px",
            marginLeft:'10px',
            bottom:'1px',
            backgroundColor: "white",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
                width:"30vw",
              padding: "1px",
              fontSize: "12px !important",
              color: "black",
              "& fieldset": { border: "none" },
            },
          }}
          onChange={handle}
          renderInput={(params) => <TextField {...params}/>}
          className="tex" />
        {profile?<Avatar sx={{ margin: '20px',
          height: '30px',
          width: '30px',
          borderRadius: '100%',  
          objectFit: 'fill',
          border: '3px solid rgb(15, 15, 15)'}}/>:" "}
       {profile && (
         <>
         {/* <h1 style={{margin:'10px 20px 10px 20px',color:'white'}} className="tex">{profile?.name}</h1> */}
         <h1 style={{margin:'10px',color:'white'}} className="tex"><Link to="/profile" style={{textDecoration:'none',color:'white'}}>{profile?.name}</Link></h1>
         {profile?.role === "Blogger" && (
           <h1 style={{margin:'10px',color:'white'}} className="tex"><Link to="/newpost" style={{textDecoration:'none',color:'white'}}>New Post</Link></h1>
         )}
         </>
       )}
        <div style={{marginLeft:'15px'}}>
        <Link to={profile?"/":"/sign"}><Button onClick={handlesign} style={but} className="tex">
            {profile ? "Logout" : "Sign In"}</Button></Link>
        <Link to="/createuser">{!profile?<Button style={but} className="tex">Register</Button>:<a/>}</Link></div>
      </div>
      </div>
      <style>
        {
          `
          .tex:hover{
          transform: scale(1.1);
          transition: transform 0.3s ease;
           text-decoration:underline
          }
          `
        }
      </style>
      </>
  );
}
