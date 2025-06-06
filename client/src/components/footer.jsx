import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";
const footerContainer = {
  backgroundColor:'rgb(55 60 57)',
  padding: "20px",
  fontSize:'13px',
  fontFamily:'Ubuntu',
  color:'#F2EFE7',
  textAlign:'center'
};
const aboutContainer = {
  padding: "8px",
};
const contactContainer = {
  lineHeight:'1',
  display:'flex',
  gap:'10px',
  flexDirection:'column'
};
const iconRow = {
  display: "flex",
  alignItems: "center",
};
// const contact={
//   margin:'auto',
//   alignItems:'center'
// }
export default function Footer() {
  return (
    <div style={footerContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} style={aboutContainer}>
          <h1>About Us</h1>
          <h2>Blogger.in</h2>
          <p>
            We are the brave hunters, always searching for the latest updates and hidden truths.
            With every post, we quench the thirst of curious minds and feed the hunger of passionate writers.
            Here, ideas come to life like magical creatures, and every article opens a new door to adventure.
            Join us on this exciting journey, where curiosity leads the way and knowledge has no limits.
          </p>
        </Grid>
        <Grid item xs={12} md={6} >
          <h1>Contact Details</h1>
          <Grid container  spacing={2}>
          <Grid item xs={12} sm={6} style={contactContainer}>
          <h3 style={{textDecoration:'underline'}}>Social Media</h3>
          <div style={iconRow}>
            <InstagramIcon style={{marginRight:'5px'}} onClick={() => window.open("https://instagram.com", "_blank")}
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  color:'#555',
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "aliceblue",
                  },
                }}/>
            <h4>Instagram</h4>
          </div>
          <div style={iconRow}>
            <XIcon style={{marginRight:'5px'}} onClick={() => window.open("https://twitter.com", "_blank")}
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "#555",
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "aliceblue",
                  },
                }}
/>
            <h4>Twitter</h4>
          </div>
          <div style={iconRow}>
            <FacebookIcon style={{marginRight:'5px'}} onClick={() => window.open("https://facebook.com", "_blank")}
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  color: "#555",
                  transition: "color 0.3s ease-in-out",
                  "&:hover": {
                    color: "aliceblue",
                  },
                }}/>
            <h4>Facebook</h4>
          </div>
          </Grid>
          <Grid item xs={12} sm={6} style={contactContainer}>
          <h3 style={{textDecoration:'underline'}}>Contact Details</h3>
          <h3>Mobile: +1 233453256</h3>
          <h3>Email: Contact@blog.com</h3>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
