import { Box, Paper } from "@mui/material";
import logo from './logo.jpg'
import{ Grid} from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import XIcon from "@mui/icons-material/X";
// import FacebookIcon from "@mui/icons-material/Facebook";
const paperStyle={
    width:'auto',
    height:'auto',
    backgroundColor:'#F2EFE7'
}
const imag={
    height:'70%',
    width:'70%',
    margin:'20px',
    borderRadius:'20px'
    // boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
}
const heading={
    fontFamily:'Alex Brush',
    textAlign:'center',
    fontSize:'38px',
    padding:'10px 0px 20px 0px',
    textDecration:'underline'
}
const text={
    justifyContent:'center',
    fontSize:'18px',
    fontFamily:'Great Vibes',
    lineHeight:'1.3',
    margin:'10px 30px 0px 30px',
    paddingBottom:'10px'
}
const box={
    marginBottom:'0px'
}
const sty={
    fontFamily:'Great Vibes'
}
export  function About() {
  return (
    <>
    <div>
        <Paper  style={paperStyle}>
            <Box style={box} >
                <Grid container>
                    <Grid item xs={12} md={6} textAlign='center' >
                    <img className="animate__animated animate__slideInLeft" style={imag} alt="Img" src={logo}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <h1 style={heading}>About us</h1>
                    <div className="animate__animated animate__slideInUp">
                    <p style={text}>We are the brave hunters, always searching for We are the brave hunters, always searching for the latest updates and uncovering hidden truths that the world deserves to know. Our relentless pursuit of knowledge fuels our passion for discovery, ensuring that no stone is left unturned and no story remains untold.

With every post, we quench the thirst of curious minds and satisfy the hunger of passionate writers eager to share their voices. Whether it’s breaking news, insightful analysis, or thought-provoking narratives, we strive to ignite conversations that inspire, inform, and challenge perspectives.

Here, ideas don’t just exist—they come to life like magical creatures, transforming into words that spark imagination and innovation. Every article we craft is a gateway to new possibilities, opening doors to uncharted adventures and fresh insights that push the boundaries of understanding.

Join us on this exhilarating journey, where curiosity is our compass and knowledge knows no limits. Together, let’s embrace the thrill of exploration, the power of storytelling, and the endless pursuit of truth. The hunt has begun—are you ready to be part of it?</p>
<div style={{textAlign:'center' ,marginBottom:'30px'}} >
                    <h3 style={sty}>Mobile: +1 233453256</h3>
                    <h3 style={sty}>Email: Contact@blog.com</h3>
                    </div></div>
                    </Grid>
                    {/* <Grid alignItems='center' style={{
                        justifyContent:'space-between'
                    }}>
                        <XIcon/>
                        <InstagramIcon/>
                        <FacebookIcon/>
                    </Grid> */}
                </Grid>
            </Box>
        </Paper>
    </div>
    </>
  )
}
