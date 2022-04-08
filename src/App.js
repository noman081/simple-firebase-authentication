import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, signOut } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const handleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user);
        console.log(result.user)
        // ...
      }).catch(error => {
        console.log('error: ', error);
      });
  }
  const handleGithubSignIn = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then(res => {
        setUser(res.user);
        console.log(res.user);
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      setUser({});
    });

  }
  return (
    <div className="App">
      <h1>Welcome to google auth</h1>
      {
        user.uid ? <button onClick={handleSignOut}>Signout</button> :
          <>
            <button onClick={handleSignIn}>Google Login</button>
            <button onClick={handleGithubSignIn}>Github Login</button>
          </>
      }
      {
        user.uid ? <div>
          <h1>Welcome, {user.displayName}</h1>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div> : <h1>Please Enter valid user.</h1>
      }
    </div>
  );
}

export default App;
