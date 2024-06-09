import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={styles.button}>
      <img src="/images/app/back-icon.png" alt="Back" style={styles.icon} />
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
    width: '30px',
    height: '30px'
  }
};

export default BackButton;