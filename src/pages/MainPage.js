import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../App';

const MainPage = ({ userPoints }) => {
  const [userFullName, setUserName] = useState('');
  const [balanceuser, setbalanceuser] = useState(0);
  const firstName2 = userFullName.split(' ')[0];

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    const virtualpoints = userPoints;
    if (storedUserName) {
      setUserName(storedUserName);
      setbalanceuser(virtualpoints);
    }
  }, [userPoints]);

  const handleResetPoints = async () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    try {
      await axios.post(
        `${API_URL}/api/update-points/${uuid}`,
        { pointsToAdd: -userPoints },
        { headers: { Authorization: `Bearer ${token}`} }
      );
      localStorage.setItem('points', 0);
      setbalanceuser(0);
    } catch (error) {
      console.error('Error resetting points:', error);
    }
  };

  const handleNavigateToSquarePage = () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    const isVerified = localStorage.getItem('isVerified');
    const encodedToken = btoa(token);
    window.location.href = `https://rahuddev.github.io/squaregame-x/?squareUUID=${uuid}&badass=${encodedToken}&isVerified=${isVerified}`;
  };


  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Welcome to the Square game, {firstName2}!</Card.Title>
              <Card.Text>
                This is a simple main page created with Bootstrap.
                <br />
                $CUAN : {balanceuser}
              </Card.Text>
              <Button onClick={handleNavigateToSquarePage} className="btn btn-primary">Petak</Button>
              <Button variant="danger" onClick={handleResetPoints}>Reset Points</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
