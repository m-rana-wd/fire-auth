import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './App.css';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: ''
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
          email: '',
          error: '',
          success: false
        }
        setUser(signOutUser)
      })
      .catch(error => {
        alert(error.message);
      })
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log('sign in user info', res.user)
        })
        .catch(function (error) {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })
    }

    event.preventDefault();

  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log('user update successfully')
    }).catch(function (error) {
      console.log(error)
    });
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
      <div className="login-form">
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New User Sign Up</label>

        <form onSubmit={handleSubmit}>
          {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Name" />} <br /><br />
          <input onBlur={handleBlur} type="text" name="email" placeholder="Email" required /> <br /><br />
          <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required /> <br /><br />
          <input className="submit-btn" type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>

        {
          user.success && <p style={{ color: 'green' }}>User {newUser ? 'create' : 'Logged in'} successfully</p>
        }
      </div>

    </div>
  );
}

export default App;
