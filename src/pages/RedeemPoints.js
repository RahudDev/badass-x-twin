import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './RedeemPoints.css'; // Import the custom CSS file
import { API_URL } from '../App';

const RedeemPage = () => {
  const [userPoints, setUserPoints] = useState(parseInt(localStorage.getItem('points')) || 0);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [balanceError, setBalanceError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateBitcoinAddress = (address) => {
    const re = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return re.test(String(address));
  };

  const handleEmailPrompt = (method) => {
    const email = prompt(`Enter your ${method} email:`);
    const confirmEmail = prompt(`Confirm your ${method} email:`);
    if (email && confirmEmail && email === confirmEmail && validateEmail(email)) {
      setPaymentInfo(email);
      return email;
    } else {
      setPaymentError('Emails do not match or are invalid.');
      return null;
    }
  };

  const handleBitcoinPrompt = () => {
    const bitcoinAddress = prompt('Enter your Bitcoin wallet address:');
    const confirmBitcoinAddress = prompt('Confirm your Bitcoin wallet address:');
    if (bitcoinAddress && confirmBitcoinAddress && bitcoinAddress === confirmBitcoinAddress && validateBitcoinAddress(bitcoinAddress)) {
      setPaymentInfo(bitcoinAddress);
      return bitcoinAddress;
    } else {
      setPaymentError('Bitcoin addresses do not match or are invalid.');
      return null;
    }
  };

  const handleRedeem = async () => {
    if (redeemAmount < 100) {
      setPaymentError('Minimum redeem amount is 100 $CUAN.');
      return;
    }

    if (redeemAmount > userPoints) {
      setBalanceError('Insufficient balance.');
      return;
    }

    let paymentDetails = '';

    if (paymentMethod === 'PayPal' || paymentMethod === 'Skrill') {
      paymentDetails = handleEmailPrompt(paymentMethod);
    } else if (paymentMethod === 'Bitcoin') {
      paymentDetails = handleBitcoinPrompt();
    }

    if (!paymentDetails) {
      return;
    }

    setPaymentError('');
    setBalanceError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    try {
      await axios.post(
        `${API_URL}/api/redeem-points`,
        { uuid, redeemAmount, paymentMethod, paymentInfo: paymentDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newPoints = userPoints - redeemAmount;
      localStorage.setItem('points', newPoints);
      setUserPoints(newPoints);
      setRedeemAmount('');
      setPaymentInfo('');
      alert('Redemption successful!');
    } catch (error) {
      console.error('Error redeeming points:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Redeem $CUAN</Card.Title>
              <Card.Text>
                You have {userPoints} $CUAN.
              </Card.Text>
              <Form>
                <Form.Group>
                  <Form.Label>Redeem Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(e.target.value)}
                    placeholder="Enter $CUAN to redeem"
                    min="100"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Row>
                    <Col md={4}>
                      <Card className="payment-method-card" onClick={() => setPaymentMethod('PayPal')}>
                        <Card.Img variant="top" src="https://od.lk/s/NjFfODUyMDAwODdf/paypal%20logo.jpg" className="payment-method-image" />
                        <Card.Body>
                          <Card.Title>PayPal</Card.Title>
                          <Form.Check 
                            type="radio" 
                            name="paymentMethod" 
                            value="PayPal" 
                            checked={paymentMethod === 'PayPal'}
                            onChange={() => setPaymentMethod('PayPal')}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="payment-method-card" onClick={() => setPaymentMethod('Skrill')}>
                        <Card.Img variant="top" src="https://od.lk/s/NjFfODUyMDAwNzNf/skrill%20image.jpg" className="payment-method-image" />
                        <Card.Body>
                          <Card.Title>Skrill</Card.Title>
                          <Form.Check 
                            type="radio" 
                            name="paymentMethod" 
                            value="Skrill" 
                            checked={paymentMethod === 'Skrill'}
                            onChange={() => setPaymentMethod('Skrill')}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="payment-method-card" onClick={() => setPaymentMethod('Bitcoin')}>
                        <Card.Img variant="top" src="https://od.lk/s/NjFfODUyMDAwOTRf/bitcoin%20image.png" className="payment-method-image" />
                        <Card.Body>
                          <Card.Title>Bitcoin</Card.Title>
                          <Form.Check 
                            type="radio" 
                            name="paymentMethod" 
                            value="Bitcoin" 
                            checked={paymentMethod === 'Bitcoin'}
                            onChange={() => setPaymentMethod('Bitcoin')}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Form.Group>
                {paymentError && <p className="text-danger">{paymentError}</p>}
                {balanceError && <p className="text-danger">{balanceError}</p>}
                <Button variant="primary" onClick={handleRedeem} disabled={!redeemAmount || redeemAmount <= 0 || !paymentMethod}>
                  Redeem
                </Button>
                {loading && <div className="d-flex justify-content-center mt-3"><Spinner animation="border" /></div>}
                <Button variant="secondary" onClick={handleNavigateBack} className="ml-2">
                  Back
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RedeemPage;
