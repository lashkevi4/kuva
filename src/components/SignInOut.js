import React, { useState } from 'react';
import Modal from './Modal';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebaseConfig';
import '../styles/global.css';

function SignInOut({ closeModal }) {

  const [activeMode, setActiveMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // function to show an error message
  const showError = (message) => {

    setErrorMessage(message);

    setTimeout(() => {

      setErrorMessage('');

    }, 3000);

  };

  // function to show a success message
  const showSuccess = (message) => {

    setSuccessMessage(message);

    setTimeout(() => {

      setSuccessMessage('');

      closeModal(); // close modal after 2 seconds
    }, 2000);

  };

  // handle login
  const handleSignIn = async () => {

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess("Successful"); // show success message
    }

    catch (error) {
      showError("Incorrect login or password."); // show erorr message
    }

  };

  // handle registration
  const handleSignUp = async () => {

    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showSuccess("Registration successful!");
    }

    catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        showError("You are already registered with this email.");
      }

      else if (error.code === 'auth/invalid-email') {
        showError("Invalid email address.");
      }

      else {
        showError("Registration failed. Please try again.");
      }

    }

  };


  // handle password reset
  const handleForgotPassword = async () => {

    try {
      await sendPasswordResetEmail(auth, email);
      showSuccess("Successful"); // show success message
    }

    catch (error) {
      showError("Error sending password"); // show erorr message
    }

  };

  // switch modes (sign in, sign up, forgot password) and reset fields
  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (

    <Modal onClose={closeModal}>

      <div className="auth-container">

        <div className="auth-header">

          <h2
            className={`auth-title ${activeMode === 'signIn' ? 'active' : ''}`}
            onClick={() => handleModeChange('signIn')}
          >
            SIGN IN
          </h2>

          <h2
            className={`auth-title ${activeMode === 'signUp' ? 'active' : ''}`}
            onClick={() => handleModeChange('signUp')}
          >
            SIGN UP
          </h2>

        </div>

        <h2
          className={`auth-title forgot-password ${activeMode === 'forgotPassword' ? 'active' : ''}`}
          onClick={() => handleModeChange('forgotPassword')}
        >
          FORGOT PASSWORD?
        </h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* show erorr message */}

        {successMessage && <p className="success-message">{successMessage}</p>} {/* show success message */}

        {activeMode === 'signIn' && (
          <>

            <div className="auth-inputs">

              <input
                className="auth-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="auth-input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <div className="auth-button">

              <button className="login-button" onClick={handleSignIn}>LOG IN</button>

            </div>

          </>

        )}

        {activeMode === 'signUp' && (
          <>
            <div className="auth-inputs">

              <input
                className="auth-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="auth-input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className="auth-input"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>

            <div className="auth-button">

              <button className="login-button" onClick={handleSignUp}>CREATE</button>

            </div>

          </>

        )}

        {activeMode === 'forgotPassword' && (
          <>

            <div className="auth-inputs">

              <input
                className="auth-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="auth-button">

              <button className="login-button" onClick={handleForgotPassword}>SEND</button>

            </div>

          </>

        )}

      </div>

    </Modal>

  );
}


export default SignInOut;
