import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../App';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true); // Controls whether the form is shown
  const [countdown, setCountdown] = useState(15);
  const [canResend, setCanResend] = useState(false); // Controls whether the resend link is shown
  const navigate = useNavigate();

  const sendResetEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/forgot-password`, { email });

      if (response.data.message === 'Reset link sent to your email.') {
        setMessage('Please check your email.');
        setShowForm(false); // Hide the form
        setCountdown(15); // Start the countdown
        setCanResend(false); // Initially don't show the resend link
      } else if (response.data.message === 'User with this email does not exist.') {
        setMessage('Email not found in our records. Please try signing up.');
        setTimeout(() => {
          navigate('/signup'); // Redirect to signup page
        }, 3000);
      }
    } catch (error) {
      setMessage('Error processing request or email not found. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetEmail();
  };

  useEffect(() => {
    let timer;
    if (!showForm && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true); // Show the resend link after countdown
    }

    return () => clearTimeout(timer);
  }, [countdown, showForm]);

  const handleResendLink = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    await sendResetEmail(); // Resend the reset email
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">
          {showForm ? 'Forgot Password' : "We've sent you an email with a reset password link"}
        </h1>
        {!showForm && (
          <div className="text-start mb-3">
            <button 
              className="btn btn-link p-0 text-decoration-none" 
              onClick={() => navigate('/login')}
              style={{ color: 'black', opacity: 0.5 }}
            >
              <FaArrowLeft /> Back to Login
            </button>
          </div>
        )}
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Enter your email address</label>
              <input 
                type="email" 
                placeholder="Email" 
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
          </form>
        ) : (
          <p className='p-1 text-center'>{message} {countdown > 0 ? `You can resend the link in ${countdown} seconds.` : (
            <span>Haven't received the reset link yet? <a href="#/" onClick={handleResendLink}>Please send it again.</a></span>
          )}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
