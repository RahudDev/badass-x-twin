import React from 'react';
import './about.css';


const About = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';

  return (
    <div className="about-us-container">
    <div className={`container mt-5 about-us ${!isVerified ? 'animate-slide' : ''}`}>
     <h1 className="about-us-title">About Us</h1>
        <p className="about-us-text">
          FreeCuan is a platform where you can earn rewards by completing tasks such as surveys, watching videos, and more. Our mission is to provide a fun and easy way for users to earn extra income in their spare time. Whether you're looking to supplement your earnings or just want to make some extra cash, FreeCuan offers a wide range of activities that cater to different interests and skill levels.
        </p>
        <h2 className="about-us-subtitle">How It Works</h2>
        <p className="about-us-text">
          At FreeCuan, we believe that everyone should have the opportunity to earn rewards without the need for special skills or experience. That's why we've partnered with leading brands and advertisers to bring you a variety of simple tasks that you can complete from the comfort of your home. Here's how you can start earning:
        </p>
        <ul className="about-us-list">
          <li><strong>Sign Up:</strong> Create a free account on FreeCuan and instantly become a part of our growing community.</li>
          <li><strong>Participate in Tasks:</strong> Once you're signed up, you'll have access to a wide array of tasks, including surveys, games, videos, and more. Each task is designed to be quick and easy, allowing you to earn rewards in just a few minutes.</li>
          <li><strong>Earn $Cuan:</strong> For every task you complete, you'll earn $Cuan, our platform's virtual currency. The more tasks you complete, the more $Cuan you'll accumulate.</li>
          <li><strong>Redeem Your Rewards:</strong> Once you've collected enough $Cuan, you can redeem it for real money or other exciting rewards. On FreeCuan, 100 $Cuan is equivalent to $1 USD, and you can choose to cash out via PayPal, gift cards, or even cryptocurrency.</li>
        </ul>
        <h2 className="about-us-subtitle">Why Choose FreeCuan?</h2>
        <p className="about-us-text">
          <strong>Flexibility:</strong> With FreeCuan, you're in control of when and how you earn. Our platform is available 24/7, so you can complete tasks whenever it fits your schedule.
        </p>
        <p className="about-us-text">
          <strong>Diverse Opportunities:</strong> We offer a wide variety of tasks to ensure that there's something for everyone. Whether you enjoy taking surveys, playing games, or watching videos, you'll find activities that suit your interests.
        </p>
        <p className="about-us-text">
          <strong>Transparency and Fairness:</strong> We believe in rewarding our users fairly for their time and effort. Our platform is designed to be transparent, so you always know how much $Cuan you're earning and how to redeem it.
        </p>
        <p className="about-us-text">
          <strong>Community and Support:</strong> Join a vibrant community of users who share tips, tricks, and encouragement. Our customer support team is always ready to assist you with any questions or concerns you may have.
        </p>
        <h2 className="about-us-subtitle">Get Started Today</h2>
        <p className="about-us-text">
          Earning rewards has never been easier. With FreeCuan, you can turn your free time into real money, all while having fun and engaging with a variety of tasks. Don't miss out on this opportunity to earn extra income—sign up today and start earning with FreeCuan!
        </p>
    </div>
    </div>
  );
};

export default About;
