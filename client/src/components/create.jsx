import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Alert, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const paperStyle = {
  height: "200px",
  width: "350",
  padding: "30px 20px 30px 30px",
  marginTop: "10vh",
  display: "flex",
  gap: 27,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const layer = {
  alginItems: "center",
  marginTop: "100px",
  margin: "2vw 20vw 0vw 30vw",
  fontSize: "22px",
};
const ly = {
  alginItems: "center",
  marginLeft: "195px",
  marginRight: "195px",
  marginTop: "30px",
  marginBottom: "30px",
  backgroundColor: "rgb(55 60 57)",
};
const paperout = {
  marginBottom: "50px",
};
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export function Create() {
  const [lastname, setlastname] = React.useState("");
  const [firstname, setfirstname] = React.useState("");
  const [role, setrole] = React.useState("");
  const [pass, setpass] = React.useState("");
  const [confirm, setconfirm] = React.useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const [verify, setverify] = useState("");
  const navigate = useNavigate();
  const [resposnse, getresponse] = useState();
  const data = {
    lastname: lastname,
    firstname: firstname,
    role: role,
    email: email,
    pass: confirm,
  };
  const name = async (e) => {
    e.preventDefault();

    //form vaildation
    if (!lastname || !firstname) setError("Enter the name before submitting");
    else if (!role) {
      setError("Please select the role");
    } else if (!email || !emailRegex.test(email))
      setError("please enter a vaild email address");
    else if (!pass || !confirm) setError("Enter password to continue");
    else if (!(pass === confirm)) setError("Password Mistmatches");
    else if (!passwordRegex.test(pass))
      setError("The pasword must contain 8 character and symbols");
    else
    setError('');

    //userdetails send to backend
    try {
      const res = await axios.post("http://localhost:4002/api/newdata", data);
      console.log("added data successfully");
      getresponse(res.data);
      setverify(resposnse);
    } catch (err) {
      console.log(err.message);
    }
    console.log(resposnse);

  };
  React.useEffect(()=>{
    if(resposnse==='user stored successfully'){
      setError("");
      if (role === "Reader") setTimeout(() => navigate("/home"), 2000);
      else if (role === "Blogger") setTimeout(() => navigate("/blogger"));
    }
  },[resposnse,role,navigate])
  return (
    <>
      <div style={layer}>
        <h1>
          New User <PersonIcon fontSize="large" variant="contained" fullwidth />
        </h1>
        <Paper elevation={3} style={paperout}>
          <form onSubmit={name}>
            {error && <Alert severity="warning">{error}</Alert>}
            {verify && <Alert severity="success">{verify}</Alert>}
            <Grid container algin="center">
              <Grid item xs={6} style={paperStyle}>
                <TextField
                  id="fname"
                  label="First Name"
                  variant="filled"
                  size="small"
                  onChange={(e) => setlastname(e.target.value)}
                />
                <TextField
                  id="lname"
                  label="Last Name"
                  variant="filled"
                  size="small"
                  onChange={(e) => setfirstname(e.target.value)}
                />
                <TextField
                  id="role"
                  select
                  label="Select"
                  defaultValue="Select"
                  helperText="Please select your Role"
                  size="medium"
                  onChange={(e) => {
                    setrole(e.target.value);
                  }}
                >
                  <MenuItem value={"Reader"}>{"Reader"}</MenuItem>
                  <MenuItem value={"Blogger"}>{"Blogger"}</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} style={paperStyle}>
                <TextField
                  type="email"
                  label="Email Address"
                  placeholder="@gmial.com"
                  onChange={(e) => setemail(e.target.value)}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setpass(e.target.value);
                  }}
                />
                <TextField
                  id="=confirmPassword"
                  label="confirm password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setconfirm(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" style={ly}>
              Create User
              <AddIcon />
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}
