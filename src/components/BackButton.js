import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} style={styles.button}>
      <img src="/images/app/back.svg" alt="back" style={styles.icon} />
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
    width: '50px',
    height: '50px'
  }
};

export default BackButton;
