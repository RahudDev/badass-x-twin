import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../App';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [timer , setTimer] = useState(15);
  const [showResendButton, setShowResendButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if (!token) {
        setMessage('please check your email for the verification link.');
        return;
      }
      try {
        await axios.get(`${API_URL}/api/verify-email?token=${token}`);
        setMessage('You have successfully verified your email. You can now earn money right away!');
        setTimeout(() => {
          window.location.href = 'https://rahuddev.github.io/badass-x';
        }, 3000); // Redirect to the main page after 3 seconds
      } catch (error) {
        if (error.response && error.response.data && error.response.data.email) {
          setEmail(error.response.data.email);
        }
        if(error.response && error.response.data.message === 'user already verified') {
          setMessage('Your email is already verified. Redirecting to the dashboard page...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000); // Redirect to the main page after 3 seconds
        } else {
        setMessage('Invalid or expired token');
      }
    }
    };

    verifyEmail();
  }, [location, navigate]);
  
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);


  const resendVerificationEmail = async () => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const validated = localStorage.getItem('token', token);
   if (!validated) {
      setMessage('please check your resend email for the verification link.');
      return;
    }
    try {
      await axios.get(`${API_URL}/api/verify-email?token=${validated}&resend=true`);
      setMessage('Verification email resent successfully. Please check your email.');
      setTimer(15);
      setShowResendButton(false);
    } catch (error) {
      if (error.response && error.response.data.message === 'User already verified') {
        setMessage('Your email is already verified. Redirecting to the dashboard page...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setMessage('Failed to resend verification email');
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Email Verification</Card.Title>
              <Card.Text>{message}</Card.Text>
              {((message === 'please check your email for the verification link.' || message === 'Verification email resent successfully. Please check your email.') && !showResendButton) && (
                <Card.Text>Resend available in {timer} seconds</Card.Text>
              )}
              {showResendButton && (
                <Button onClick={resendVerificationEmail}>Resend Verification Email</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmail;
