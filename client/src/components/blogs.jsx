import { useEffect, useState, useContext } from 'react';
import { blogcontext } from "../App.jsx";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Avatar, Button } from '@mui/material';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import axios from 'axios';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import 'animate.css';

const styles = {
  container: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#F2EFE7'
  },
  heading: {
    textAlign: 'center',
    fontFamily: '"Merriweather", serif',
  },
  topic: {
    fontFamily: 'Ubuntu',
    marginLeft: '30px',
    fontSize: '33px',
    marginTop: '40px',
    fontWeight: 'bold'
  },
  avatar: {
    marginLeft: '30px',
    marginBottom: '10px',
    marginTop: '10px'
  },
  author: {
    fontFamily: 'Ubuntu, sans-serif',
    fontStyle: 'italic',
    marginLeft: '20px',
    marginBottom: '20px',
    fontWeight: 'normal',
    color: '#555',
  },
  content: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'normal',
    marginLeft: '20px',
    marginRight: '20px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    justifyContent: 'center'
  },
  image: {
    marginTop: '20px',
    width: '100%',
    height: '700px',
    borderRadius: '8px'
  },
  icons: {
    marginLeft: '20px',
    marginTop: '5px',
    display: 'flex',
    gap: '10px'
  }
};



// ... (keep styles)

export function Blogs() {
  const { i } = useParams();
  const { profile } = useContext(blogcontext);
  const [blog, setBlog] = useState(null);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:4002/api/blog', { id: i })
      .then((res) => {
        const blogData = res.data;
        setBlog(blogData);
        // Check if user has liked
        const likes = blogData.likes || [];
        setLike(likes.length);
        if (profile && likes.includes(profile.email)) {
            setLiked(true);
        }
      })
      .catch((err) => console.log(err));
  }, [i, profile]); // Re-run if profile loads late

  const handleLike = () => {
    if (!profile) {
        alert("Please login to like!");
        return;
    }
    
    axios.post('http://localhost:4002/api/like', {id: i, email: profile.email})
        .then((res) => {
            setLiked(res.data.isLiked);
            setLike(res.data.likes.length);
        })
        .catch(err => console.log(err));
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <Grid style={styles.heading}>
        <h1>TIME TO HUNT</h1>
      </Grid>

      <Paper style={styles.container}>
        <Box>
          <div className='animate__animated animate__backInLeft' key={1}>
            <h1 style={styles.topic}>{blog.topic}</h1>
            <Avatar style={styles.avatar} alt="Author" src={blog.avatar} />
            <h4 style={styles.author}>~By {blog.author}</h4>

            <div style={styles.icons}>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={40} />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={40} />
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={40} />
              </WhatsappShareButton>
              <Button onClick={handleLike}>
                {liked ? <FavoriteBorderSharpIcon style={{color: 'red'}} /> : <FavoriteBorderSharpIcon />} {like}
              </Button>
            </div>
          </div>

          <div className='animate__animated animate__backInUp'>
            <p style={styles.content}>{blog.description}</p>
            {blog.file && <img style={styles.image} src={blog.file} alt='Blog Visual' />}
            <p style={styles.content}>{blog.content}</p>
          </div>
        </Box>
      </Paper>

      <style>
        {`
          .avatar:hover {
            transform: scale(1.1);
            border: 2px solid #000;
            transition: transform 0.3s ease, border 0.3s ease;
          }
          .icon:hover {
            transform: scale(1.2);
            color: #0073e6;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .topic:hover {
            text-decoration: underline;
          }
          h4:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}
