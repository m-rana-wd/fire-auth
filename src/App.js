import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          photo: '',
          email: ''
        }
        setUser(signOutUser)
      })
      .catch(error => {
        alert(error.message);
      })
  }

  const handleBlur = (event) => {
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
      // [...]
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = () => {

  }

  return (
    <div className="text-center p-5">
      {
        user.isSignIn ? <Button onClick={handleSignOut} className="btn btn-success">Sign Out</Button> :
          <Button onClick={handleSignIn} className="btn btn-success">Sign In</Button>
      }

      {
        user.isSignIn && <div>
          <p>Welcome: {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }


      <h1>Our own auth</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit={handleSubmit}>
        <input name="name" onBlur={handleBlur} type="text" placeholder="name"/> <br /><br />
        <input onBlur={handleBlur} type="text" name="email" placeholder="your email" required /> <br /><br />
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder="password" required /> <br /><br />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}

export default App;
