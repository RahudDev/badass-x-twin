import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import SurveyTasks from './pages/SurveyTasks';
import CpxResearch from './pages/CpxResearch';
import Cpalead from './pages/Cpalead';
import Bitlabs from './pages/Bitlabs';
import PollfishSurvey from './pages/PollfishSurvey';
import VerifyEmail from './pages/verify-email';
import MainPage from './pages/MainPage';
import RedeemPage from './pages/RedeemPoints';
import LineChart from './pages/linechart';
import ChatPanel from './chatroom';
import ReferralLink from './pages/referrallink';
import ContactForm from './pages/ContactForm';
import Config from './config';
import UserReviews from './pages/UserReviews';
import FAQ from './pages/FAQ';
import HandlePageClick from './handleclick';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import EmailVerificationSuccess from './pages/EmailVerificationSuccess';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_MAIN  } from './config';

export const API_URL = API_URL_MAIN;
export { HandlePageClick }; // Exporting for use in other components/pages


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [userName, setUserName] = useState('');
  const [isVerified, setIsVerified] = useState(localStorage.getItem('isVerified') === 'true');
  const [isChatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const storedPoints = parseInt(localStorage.getItem('points')) || 0;
    setUserName(name);
    setUserPoints(storedPoints);

    const fetchPoints = async () => {
      const token = localStorage.getItem('token');
      const uuid = localStorage.getItem('uuid');
      try {
        const response = await axios.get(`${API_URL}/api/get-points/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const points = response.data.points;
        const referrer = response.data.referrer; // Assuming the response includes referrer information

        // Update user's points in state and localStorage
        setUserPoints(points);
        localStorage.setItem('points', points);

        // Calculate the amount earned since the last check
        const amountEarned = points - storedPoints;

        // If the user has a referrer and earned points, trigger the commission logic
        if (referrer && amountEarned > 0) {
          await axios.post(`${API_URL}/api/commission`, {
            userId: uuid,
            amountEarned: amountEarned,
          });
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, []); // Run only once on component mount

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token');
      const uuid = localStorage.getItem('uuid');
      const fetchUpdatedPoints = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/get-points/${uuid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const updatedPoints = response.data.points;
          setUserPoints(updatedPoints);
          localStorage.setItem('points', updatedPoints);
        } catch (error) {
          console.error('Error fetching updated points:', error);
        }
      };
      fetchUpdatedPoints();
    }, 3000); // Polling every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);


  const toggleChat = () => {
    console.log('Toggle chat function called'); // Debug log
    setChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const islogin = localStorage.getItem('isVerified');
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get('ref');

    // Track referral code only if isVerified is false
    if (islogin === 'false' && referralCode) {
      localStorage.setItem('referralCode', referralCode);
    }  else if (islogin === 'true' && referralCode) {
      // Remove referral code from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('ref');
      window.history.replaceState({}, document.title, url.toString()); 
    }
  }, []);


  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const uuid = localStorage.getItem('uuid');
    if (token && uuid) {
      try {
        const response = await axios.get(`${API_URL}/api/verify-token`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.valid) {
          setAuthenticated(true);
          setIsVerified(response.data.isVerified);
          localStorage.setItem('isVerified', response.data.isVerified);
        } else {
          setAuthenticated(false);
          setIsVerified(false);
          localStorage.setItem('isVerified', false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setAuthenticated(false);
        setIsVerified(false);
        localStorage.setItem('isVerified', false);
      }
    } else {
      setAuthenticated(false);
      setIsVerified(false);
      localStorage.setItem('isVerified', false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSignUp = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup`, formData);
      if (response.status === 201) {
        const loginResponse = await axios.post(`${API_URL}/api/login`, {
          email: formData.email,
          password: formData.password
        });
        if (loginResponse.data.token) {
          localStorage.setItem('name', loginResponse.data.name);
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('uuid', loginResponse.data.uuid);
          localStorage.setItem('isVerified', loginResponse.data.isVerified);
          localStorage.setItem('email', loginResponse.data.email);
          localStorage.setItem('points', loginResponse.data.points);
          setAuthenticated(true);
          setIsVerified(loginResponse.data.isVerified);

        const referralCode = localStorage.getItem('referralCode');
        if (referralCode) {
          await axios.post(`${API_URL}/api/track-referral`, {
            referralCode,
            userId: loginResponse.data.uuid
          });
          localStorage.removeItem('referralCode'); // Remove referral code from localStorage
        }

        // Remove referral code from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('ref');
        window.history.replaceState({}, document.title, url.toString());
          return true;
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
        return 'exists';
      }
      console.error('Error signing up:', error);
      alert('Error signing up');
      return false;
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);
      if (response.data.token) {
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('uuid', response.data.uuid);
        localStorage.setItem('isVerified', response.data.isVerified);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('points', response.data.points);
        setAuthenticated(true);
        setIsVerified(response.data.isVerified);

        const url = new URL(window.location.href);
        url.searchParams.delete('ref');
        window.history.replaceState({}, document.title, url.toString());
        localStorage.removeItem('referralCode');
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === 'Email not match with your profile') {
          alert('Email not match with your profile');
          return 'email-not-match';
        } else if (error.response.data.error === 'Wrong password') {
          alert('Wrong password');
          return 'wrong-password';
        } else {
          alert('Invalid email and password');
          return 'invalid';
        }
      }
      console.error('Error logging in:', error);
      alert('Error logging in');
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('uuid');
    localStorage.removeItem('isVerified');
    localStorage.removeItem('hasPlayedGame');
    localStorage.removeItem('email');
    localStorage.removeItem('points');
    localStorage.removeItem('referralCode');
    setAuthenticated(false);
    setIsVerified(false);
    window.location.href = 'https://rahuddev.github.io/badass-x';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`app-container ${isChatOpen ? 'shrink' : ''}`}>
       <div className="d-flex flex-column min-vh-100">
        <Header userName={userName} userPoints={userPoints} onLogout={handleLogout } toggleChat={toggleChat}  />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/home" element={!isVerified ? <Home /> : <Navigate to="/dashboard"/>} />
            <Route path="/landingpage" element={!isVerified ? <LandingPage/> : <Navigate to="/dashboard"/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/survey-tasks" element={isVerified ? <SurveyTasks /> : <Navigate to="/login" />} />
            <Route path="/cpx-research" element={isVerified ? <CpxResearch /> : <Navigate to="/login" />} />
            <Route path="/pollfish" element={isVerified ? <PollfishSurvey /> : <Navigate to="/login" />} />
            <Route path="/bitlabs" element={isVerified ? <Bitlabs /> : <Navigate to="/login" />} />
            <Route path="/cpalead" element={isVerified ? <Cpalead /> : <Navigate to="/login" />} />
            <Route path="/line-chart" element={isVerified ? <LineChart /> : <Navigate to="/login" />} />
            <Route path="/mainpage" element={isVerified ? <MainPage userPoints={userPoints} />: <Navigate to="/login" />} />
            <Route path="/redeem" element={isVerified ? <RedeemPage /> : <Navigate to="/login" />} />
            <Route path="/chat-room" element={isVerified ? <ChatPanel /> : <Navigate to="/login" />} />
            <Route path="/referral-link" element={isVerified ? <ReferralLink /> : <Navigate to="/login" />} />
            <Route path="/config" element={<Config />} />
            <Route path="/forget-password" element={!isVerified ? <ForgotPassword /> : <Navigate to="/dashboard"/>} />
            <Route path="/reset-password" element={!isVerified ? <ResetPassword /> : <Navigate to="/dashboard"/>} />
            <Route path="/user-reviews" element={<UserReviews />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/terms-of-service" element={<TermsOfService/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/verify-email-success" element={<EmailVerificationSuccess/>} />
            <Route path="/signup" element={!isVerified ? <SignUp handleSignUp={handleSignUp} /> : <Navigate to= "/dashboard"/>} />
            <Route path="/login" element={!isVerified ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard"/> } />
            <Route path="/profile" element={isVerified? <Profile userName={userName} /> : <Navigate to="/login"/>} />
            <Route path="/dashboard" element={authenticated ? <Dashboard userPoints={userPoints} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/badass-x" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
            <Route path="/verify-email" element={!isVerified ? <VerifyEmail /> : <Navigate to="/login" />} />
            <Route path="/" element={authenticated ? (isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/login" />) : <LandingPage />} />
          </Routes>
        </main>
        <ChatPanel isOpen={isChatOpen} closeChat={toggleChat} />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

