import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './login.css';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(formData);
    if (result === true) {
      const isVerified = localStorage.getItem('isVerified') === 'true';
      if (isVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verify-email');
      }

    } else if (result === 'email-not-match') {
      setError('Email not match with your profile');
      setTimeout(() => {
        navigate('/signup');
      }, 3000);
    } else if (result === 'wrong-password') {
      setError('Wrong password');
    } else if (result === 'invalid') {
      setError('Invalid email and password');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center login min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">Welcome back, Friend!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} 
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle2"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {error && <div className="alert alert-danger mt-4">{error}</div>}
        <div className="mt-4 text-center">
          <p className="text-muted">
            Don't have an account? <a href="#/signup">Sign up</a>
          </p>
          <p className="text-muted">
          <a href="#/forget-password">Forget Your Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
