import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';

import '../styles/global.css';

function SignInOut({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Переключатель между регистрацией и входом
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для отображения ошибок

  const handleSignIn = () => {
    const passwordInput = document.querySelector('input[type="password"]'); // Находим поле для пароля

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal(); // Закрываем окно при успешном входе
      })
      .catch((error) => {
        // Убираем класс, чтобы анимация сработала снова
        passwordInput.classList.remove('error');

        // Используем setTimeout для задержки перед повторным добавлением класса
        setTimeout(() => {
          passwordInput.classList.add('error');
        }, 10); // Короткая задержка перед повторным добавлением
      });
  };



  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal(); // Закрываем окно при успешной регистрации
      })
      .catch((error) => {
        setErrorMessage("Registration error"); // Отображаем короткое сообщение об ошибке
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
