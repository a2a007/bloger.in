import logo from "./logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./css1.css";
import { Autocomplete, Avatar } from "@mui/material";
import { Button } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
// import { login } from "./bb.js";
import {  useState } from "react";
import TextField from "@mui/material/TextField";
//import { Allblogs} from './allblog.jsx';
//import { Box } from "@mui/material";
//import { data } from "./bb.js";
//import axios from 'axios';
//export const blogcontext=createContext();
import { useContext } from "react";
import { blogcontext } from "../App.jsx";



export function Nav() {
  const{cat,onsearch,profile,setprofile,setblog,theme,toggleTheme}=useContext(blogcontext);
  let navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkStyle = (path) => {
    const isActive = currentPath === path;
    return {
      textDecoration: 'none',
      color: isActive ? 'var(--color-secondary)' : 'white',
      borderBottom: isActive ? '2px solid var(--color-secondary)' : 'none',
      paddingBottom: '4px',
      fontWeight: 'bold',
      transition: 'color 0.3s ease, border-bottom 0.3s ease'
    };
  };
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
          <img alt="Img" style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'}}  src={logo} />
        </a>
      </div>
      <div className="nag" style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'}}>
      <h1 className="tex" style={{margin:'10px'}}>
        <Link to="/" style={getLinkStyle("/")}>Home</Link>
      </h1>
        <Autocomplete
          disablePortal
          color="white"
          options={[...new Set(cat.map((item) => item.catogary))]}
          sx={{
            fontFamily: "Ubuntu",
            height: "35px",
            marginLeft: '30px',
            marginRight: '30px',
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
       {profile && (
         <>
         {/* <h1 style={{margin:'10px 20px 10px 20px',color:'white'}} className="tex">{profile?.name}</h1> */}
          <h1 style={{margin:'10px'}} className="tex">
            <Link to="/profile" style={getLinkStyle("/profile")}>{profile?.name}</Link>
          </h1>
          {/* {profile?.role === "Blogger" && (
            <h1 style={{margin:'10px'}} className="tex">
              <Link to="/newpost" style={getLinkStyle("/newpost")}>New Post</Link>
            </h1>
          )} */}
          {profile?.role === "Blogger" && (
            <h1 style={{margin:'10px'}} className="tex">
              <Link to="/blogger" style={getLinkStyle("/blogger")}>Posts</Link>
            </h1>
          )}
         </>
         
       )}
        <div style={{ display: 'flex', alignItems: 'center'}}>
        <Button onClick={toggleTheme} sx={{ color: 'white', margin:'10px', minWidth: '40px' }} className="tex">
          {theme === 'dark' ? <LightModeIcon style={{ color: '#ECCE6D'}} /> : <DarkModeIcon style={{ color: 'white' }} />}
        </Button>
        {profile ? (
          <h1 className="tex" style={{margin:'10px'}}>
            <Link to="/" onClick={handlesign} style={getLinkStyle("/logout")}>Logout</Link>
          </h1>
        ) : (
          <>
            <h1 className="tex" style={{margin:'10px'}}>
              <Link to="/sign" style={getLinkStyle("/sign")}>Sign In</Link>
            </h1>
            <h1 className="tex" style={{margin:'10px'}}>
              <Link to="/createuser" style={getLinkStyle("/createuser")}>Register</Link>
            </h1>
          </>
        )}
        
        </div>
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
