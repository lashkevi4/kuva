import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import '../styles/global.css';

function SignInOut({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Для вывода ошибок

  const isEmailValid = (email) => {
    // Простейшая проверка корректности e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    // Проверка e-mail
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    // Проверка длины пароля
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal(); // Закрываем окно при успешном входе
      })
      .catch((error) => {
        setErrorMessage("Error signing in. Please check your email and password.");
      });
  };

  const handleSignUp = () => {
    // Проверка e-mail
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    // Проверка длины пароля
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal(); // Закрываем окно при успешной регистрации
      })
      .catch((error) => {
        setErrorMessage("Registration error. Please try again.");
      });
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Sign Up' : 'Sign In'}</h2>

      <div className="auth-inputs">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Отображение ошибки */}

      <button className="auth-button" onClick={isRegister ? handleSignUp : handleSignIn}>
        {isRegister ? 'Sign Up' : 'Sign In'}
      </button>

      <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </p>

      <button className="close-button" onClick={closeModal}>Close</button>
    </div>
  );
}

export default SignInOut;
