import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import '../styles/global.css';

function SignInOut({ closeModal }) {

  const [email, setEmail] = useState(''); // состояние для e-mail
  const [password, setPassword] = useState(''); // состояние для пароля
  const [isRegister, setIsRegister] = useState(false); // переключатель между регистрацией и входом
  const [errorMessage, setErrorMessage] = useState(''); // состояние для отображения ошибок

  const isEmailValid = (email) => {
    // проверяем правильность формата e-mail с помощью регулярного выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // функция для входа в систему
  const handleSignIn = () => {

    // проверяем корректность e-mail
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email format."); // если формат e-mail некорректен
      return;
    }

    // проверяем длину пароля
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters."); // если пароль слишком короткий
      return;
    }

    // попытка входа через Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal(); // закрываем окно при успешном входе
      })
      .catch((error) => {
        setErrorMessage("Error signing in. Please check your email and password."); // ошибка при входе
      });

  };

  // функция для регистрации
  const handleSignUp = () => {

    // проверяем корректность e-mail
    if (!isEmailValid(email)) {
      setErrorMessage("Invalid email format."); // если формат e-mail некорректен
      return;
    }

    // проверяем длину пароля
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters."); // если пароль слишком короткий
      return;
    }

    // попытка регистрации через Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        closeModal(); // закрываем окно при успешной регистрации
      })
      .catch((error) => {
        setErrorMessage("Registration error. Please try again."); // ошибка при регистрации
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
          onChange={(e) => setEmail(e.target.value)} // обновляем e-mail при вводе
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // обновляем пароль при вводе
        />

      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* отображение ошибки при наличии */}

      <button className="auth-button" onClick={isRegister ? handleSignUp : handleSignIn}>
        {isRegister ? 'Sign Up' : 'Sign In'} {/* кнопка для входа или регистрации */}
      </button>

      <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'} {/* ссылка для переключения режима */}
      </p>

      <button className="close-button" onClick={closeModal}>Close</button> {/* кнопка для закрытия модального окна */}

    </div>
  );
}

export default SignInOut;
