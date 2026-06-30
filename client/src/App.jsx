import { Nav } from './components/nav';
import { Profile } from './components/profile.jsx';
import { createContext,useEffect,useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import {Sign} from './components/sign.jsx';
import { Allblogs} from './components/allblog.jsx';
import { Newblog } from './components/newblog.jsx';
import {Home} from './components/home.jsx';
import {Create} from './components/create.jsx';
import { Blogger } from './components/blogger.jsx';
import { Blogs } from './components/blogs.jsx';
import ScrollToTop from './components/scrolltop.jsx';
import Footer from './components/footer.jsx';
// import { useNavigate } from 'react-router-dom';
import {About} from './components/about.jsx';
 import axios from 'axios'
export const blogcontext=createContext();
function App() {
  const [cat,setcat]=useState([]);
  const[blog,setblog]=useState([]);
  const[profile,setprofile]=useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      primary: {
        main: theme === 'dark' ? '#99BC85' : 'rgb(55 60 57)',
      },
      secondary: {
        main: '#727D73',
      },
      background: {
        default: theme === 'dark' ? '#121212' : '#F2EFE7',
        paper: theme === 'dark' ? '#1e1e1e' : '#F2EFE7',
      },
      text: {
        primary: theme === 'dark' ? '#f5f5f5' : '#181C14',
        secondary: theme === 'dark' ? '#b0b0b0' : '#555555',
      }
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  useEffect(()=>{
  axios.get('http://localhost:4002/api/nav').then((res)=>{
    if (Array.isArray(res.data.data)){
    setcat(res.data.data)
    setblog(res.data.data)
  }
  }).catch((err)=>{
    console.log(err);
  })
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setprofile(JSON.parse(storedUser));
    }
  },[]);
      //const navigate=useNavigate();

  const handlesearch=(event,value)=>{
      console.log("HI");
      const filter=cat.filter(blog=>blog.
catogary===value);
      setblog(filter);
      console.log(filter);
  }
  return (
  <>
      <blogcontext.Provider value={{cat,setcat,blog,setblog,profile,setprofile,onsearch:handlesearch,theme,toggleTheme}}>
      <ThemeProvider theme={muiTheme}>
      <ScrollToTop/>
      <Nav />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/allblogs" element={<Allblogs />}/>
        <Route path="/sign" element={<Sign />}/>
        <Route path="/newpost" element={<Newblog/>}></Route>
        <Route path='/createuser' element={<Create/>}></Route>
        <Route path='/blogger' element={<Blogger/>}></Route>
        <Route path='/blog/:i' element={<Blogs/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
        <Footer/>
      </ThemeProvider>
      </blogcontext.Provider>
      </>
  );
}
export default App;
