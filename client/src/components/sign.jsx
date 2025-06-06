import * as React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Alert, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
//import { login } from "./bb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const paperStyle = {
  height: "auto",
  width: "350px",
  padding: "10px 10px 10px 10px",
  margin: "auto",
  marginTop: "40px",
  marginBottom: "40px",
  display: "flex",
  gap: 27,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "rgb(55 60 57)",
};
const nw = {
  display: "flex",
  flexDirection: "column",
  marginTop: "30px",
  marginBottom: "20px",
};
const button = {
  backgroundColor: "rgb(55 60 57)",
  marginLeft: "30px",
  marginRight: "30px",
  marginBottom: "10px",
  textDecoration: "none",
};
const int = {
  marginTop: "30px",
  width: "275px",
};
const lay = {
  height: "70%",
  width: "70%",
  maxwidth: "420px",
  borderRadius: "30px",
  margin: "60px 90px 20px 90px",
};
export function Sign() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [pass, setpass] = React.useState("");
  const [serverres, setserverres] = React.useState("");
  const [namerole, setnamerole] = React.useState('');
  const [verify, setverify] = React.useState(null);
  const ob = {
    email: name,
    password: pass,
  };
  const url = "http://localhost:4002/api";
  const valid = (e) => {
    e.preventDefault();

    //sending data to backend to verify user
    axios
      .post(`${url}/newuser`, ob)
      .then((res) => {
        setverify(res.data.data);
        console.log(res.data.data)
        setserverres(res.data.message);
        if (res.data.data) {
          axios
            .get(`${url}/fetchuser/${name}`)
            .then((res) => {
              console.log(res.data.data);
              setnamerole(res.data.data);
               console.log(namerole);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    if (!name || !pass) {
      setserverres("Enter username and password to contiune");
      return;
    }
  };
  // 
  useEffect(() => {
    if (verify && namerole) {
      if (namerole.role === "Reader") {
        console.log('Navigating to home page'); 
        navigate(`/`)
      }
       else { 
        console.log('Navigating to blogger page'); 
        navigate(`/blogger/${namerole.email}`)
      };
    }
  }, [namerole, navigate,verify]);

  let alertMessage = null;
  if (serverres) {
    if (verify) {
      alertMessage = <Alert severity="success">{serverres}</Alert>;
    } else {
      alertMessage = <Alert severity="warning">{serverres}</Alert>;
    }
  }
  return (
    <>
      <Grid container style={{ minHeight: "100vh", padding: 2 }}>
        <Grid item xs={12} md={6}>
          <img
            className="animate__animated animate__backInLeft"
            style={lay}
            src="1.webp"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          align="center"
          className="animate__animated animate__backInUp"
        >
          <h1 style={{ fontFamily: "Great Vibes" }}>SignIn </h1>
          <Paper elevation={2} style={paperStyle}>
            <div>
              {/* {
          if(verify) return(<Alert severity="success">{serverres}</Alert>) 
          else if(verify==false) return(<Alert severity="warning">{serverres}</Alert>)
          else return(<></>)
          } */}
              {alertMessage}
            </div>
            <form onSubmit={valid}>
              <TextField
                id="username"
                label="Username"
                placeholder="___@gmail.com"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant="outlined"
                style={int}
              />
              <TextField
                id="pass"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setpass(e.target.value);
                }}
                style={int}
              />
              <div style={nw}>
                <Button
                  type="submit"
                  variant="contained"
                  style={button}
                  fontFamily="Great Vibes"
                >
                  Sign
                </Button>
                <Button type="submit" variant="contained" style={button}>
                  <Link
                    to="/createuser"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    New user
                  </Link>
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
