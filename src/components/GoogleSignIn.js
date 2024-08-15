import React from 'react';
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
    <button onClick={signIn}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignIn;
