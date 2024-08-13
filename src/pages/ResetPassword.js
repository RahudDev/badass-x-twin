import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './resetpassword.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../App';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const location = useLocation();
  const navigate = useNavigate();
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false); // State to check if token is valid

  // Retrieve the token from the URL query parameters
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  // Validate the token when the component mounts
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reset-password`, { params: { token } });
        if (response.data.success) {
          setIsTokenValid(true);
        } 
        else if (response.data.success && response.data.message === 'Password has already been reset. Redirecting to login...') {
          setMessage('Password has already been reset. Redirecting to login page...');
          setTimeout(() => {
            navigate('/login');
          }, 3000); // Redirect after 3 seconds
        }
        else {
          setIsTokenExpired(true);
          setMessage('The reset token has expired. Please request a new password reset.');
        }
      } catch (error) {
        setIsTokenExpired(true);
        setMessage('Invalid or expired token. Please request a new password reset.');
      }
    };
    
    validateToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/reset-password`, { token, password });
      if (response.data.success) {
        if (response.data.message === 'Password has been reset successfully.') {
          setIsResetSuccessful(true);
          setMessage('Password reset successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/login'); // Redirect to login page
          }, 3000); // Redirect after 3 seconds
        } else {
          setMessage(response.data.message || 'Password reset successful but no specific message.');
        }
      } else if (response.data.error === 'Token expired') {
        setIsTokenExpired(true);
        setMessage('The reset token has expired. Please request a new password reset.');
      } else {
        setMessage(response.data.message || 'Error resetting password. Please try again.');
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };


  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4">Reset Password</h1>
        {!isResetSuccessful && !isTokenExpired && isTokenValid && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Set your new Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="New password" 
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="mb-4">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Confirm new password" 
                className="form-control"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
             
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isResetSuccessful} // Disable button if reset is successful
            >
              Reset Password
            </button>
          </form>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
