import React from 'react';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebaseConfig';

function GoogleSignIn() {
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User Info: ", user);
      })
      .catch((error) => {
        console.error("Error during sign-in: ", error);
      });
  };

  return (
    <GoogleButton onClick={signIn} />
  );
}

export default GoogleSignIn;
