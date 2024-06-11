import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={styles.button}>
      <img src="/images/app/back.svg" alt="Назад" style={styles.icon} />
    </button>
  );
}

const styles = {
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '50px', // используем такой же размер, как у других иконок
    height: '50px'
  }
};

export default BackButton;
