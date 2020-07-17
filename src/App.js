import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./post";
import Modal from '@material-ui/core/Modal';
import { db, auth } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User Login
        setUser(authUser);
      } else {
        //User Logout
        setUser(null);
      }

    })
    return () => {
      unsubscribe();
      //perform some cleanup actions
    }
  }, [user, username])


  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
      ))
    })
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch(err => alert(err.message))
    setOpen(false);
  }
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => alert(err.message))
    setOpenSignIn(false);

  }
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())} />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())} />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={signUp}>SignUp</Button>

          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())} />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={signIn}>SignIn</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="header__image" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
        {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>)
          :
          (<div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
            <Button onClick={() => setOpen(true)}>SignUp</Button>
          </div>)
        }
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({ id, post }) => {
              return <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imgURL={post.imgURL} />
            })
          }
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B_jxHBeJNjc/?utm_source=ig_embed&amp;utm_campaign=loading"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>
      </div>

      {user?.displayName ? (<ImageUpload username={user.displayName} />
      ) :
        (<h3 className="display__text">Sorry, you need to login to Upload</h3>
        )}
    </div>
  );
}

export default App;