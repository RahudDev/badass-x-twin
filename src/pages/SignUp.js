import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = ({ handleSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSignUp(formData);
    if (result === 'exists') {
      navigate('/login');
    } else if (result === true) {
      navigate('/verify-email');
    } else {
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className="container sign-up d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6">
        <h1 className="mb-4 text-center">Join Free Cuan today!</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
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
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle3"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-muted">
            Already have an account? <a href="#/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
