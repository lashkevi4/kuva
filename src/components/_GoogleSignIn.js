import React, { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

function GoogleSignIn() {
  const [user, setUser] = useState(null); // Состояние для отслеживания пользователя

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Обновляем состояние, когда пользователь логинится или разлогинится
    });

    return () => unsubscribe(); // Отписываемся от слушателя при размонтировании компонента
  }, []);

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

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error during sign-out: ", error);
      });
  };

  return (
    <div>
      {user ? (
        <button
          onClick={logOut}
          style={{
            borderRadius: '24px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: '#fff',
            border: '1px solid #dadce0',
            display: 'flex',
            alignItems: 'center',
            color: '#3c4043',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      ) : (
        <GoogleButton
          onClick={signIn}
          style={{
            borderRadius: '24px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: '#fff',
            border: '1px solid #dadce0',
            display: 'flex',
            alignItems: 'center',
            color: '#3c4043',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
}

export default GoogleSignIn;
