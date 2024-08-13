// src/pages/EmailVerificationSuccess.js

import React from 'react';

const EmailVerificationSuccess = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Congratulations!</h1>
      <p style={styles.message}>You have successfully verified your email. You can now earn money right away!</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    color: '#4CAF50',
    fontSize: '36px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
  },
};

export default EmailVerificationSuccess;
