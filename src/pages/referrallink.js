import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReferralLink() {
    const [referralLink, setReferralLink] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        // Fetch user details from localStorage or context
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('uuid'); // Assuming you store user ID in localStorage

        if (!token || !userId) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        // Fetch the referral link from the server
        axios.get(`${API_URL}/api/generate-referral-link/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the request headers
            }
        })
        .then(response => {
            setReferralLink(response.data.referralLink);
        })
        .catch(error => {
            console.error("There was an error fetching the referral link!", error);
            setError('Failed to fetch referral link');
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => setCopySuccess('Referral link copied to clipboard!'))
            .catch(err => console.error('Failed to copy link:', err));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Referral Program</Card.Title>
                            <Card.Text>
                                <p>Welcome to our referral program! As a valued member, you have the opportunity to earn lifetime commissions by referring new users to our platform.</p>
                                <p><strong>Referral Benefits:</strong></p>
                                <ul>
                                    <li>Earn a <strong>20% commission</strong> on every successful transaction made by the users you refer.</li>
                                    <li>There is <strong>no limit</strong> to how much you can earn. The more referrals, the more you earn!</li>
                                    <li>Your referral link will remain active as long as you stay with us.</li>
                                    <li>Referral commissions are paid out automatically based on user activity.</li>
                                </ul>
                                <p><strong>Important:</strong></p>
                                <ul>
                                    <li>Ensure that the users you refer have not used our app before. This means they should be new users who haven't previously registered or interacted with our platform from their browser.</li>
                                    <li>If the user is already part of our system, the referral link will not be valid for them.</li>
                                </ul>
                                <div className='text-center'>
                                <p><strong>Your Referral Link:</strong></p>
                                <div style={{
                                  display: 'inline-block',
                                  padding: '10px',
                                  backgroundColor: '#f8f9fa',
                                  border: '1px solid black',
                                  borderRadius: '5px',
                                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}>
                                   <p style={{ margin: 0 }}>{referralLink}</p>
                               </div>
                                <Button variant="primary" onClick={handleCopyLink}>
                                    Copy Link
                                </Button>
                                {copySuccess && <p className="mt-2 text-success">{copySuccess}</p>}
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ReferralLink;
