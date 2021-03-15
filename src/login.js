// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';

// if (!firebase.apps.length) {
//    firebase.initializeApp(firebaseConfig);
// }

// function App() {

//   const [user, setUser] = useState({
//     isSignIn: false,
//     name: '',
//     email: '',
//     photo: ''
//   })
//   const provider = new firebase.auth.GoogleAuthProvider();

//   const handleSignIn = () => {
//     firebase.auth().signInWithPopup(provider)
//       .then(res => {
//         const { displayName, email, photoURL } = res.user;
//         const signInUser = {
//           isSignIn: true,
//           name: displayName,
//           email: email,
//           photo: photoURL
//         }
//         setUser(signInUser)
//       })
//       .catch(error => {
//         console.log(error);
//         console.log(error.message);
//       })
//   }

//   const handleSignOut = () => {
//     firebase.auth().signOut()
//       .then(res => {
//         const signOutUser = {
//           isSignIn: false,
//           name: '',
//           photo: '',
//           email: ''
//         }
//         setUser(signOutUser)
//       })
//       .catch(error => {
//         alert(error.message);
//       })
//   }

//   return (
//     <div className="text-center p-5">
//       {
//         user.isSignIn ? <Button onClick={handleSignOut} className="btn btn-success">Sign Out</Button> :
//           <Button onClick={handleSignIn} className="btn btn-success">Sign In</Button>
//       }

//       {
//         user.isSignIn && <div>
//           <p>Welcome: {user.name}</p>
//           <p>Your Email: {user.email}</p>
//           <img src={user.photo} alt="" />
//         </div>
//       }

//     </div>
//   );
// }

// export default App;
