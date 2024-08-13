// src/components/HowItWorks.js
import React, { useEffect, useRef } from 'react';
import './HowItWorks.css';
import { HandlePageClick } from '../App';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HowItWorks = () => {
  const howItWorksRef = useRef(null);
  const x = useRef(null);
  const navigate =  useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const element = howItWorksRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          element.classList.add('visible');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={howItWorksRef} className="how-it-works my-5">
      <div className="container-how">
        <h2 className="mb-4 text-center"><strong>How It Works?</strong></h2>
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 position-relative">
            <div className="card-2 h-100">
              <img src='https://od.lk/s/NjFfODU0OTEzMjZf/community-Photoroom.png' className="card2-img-top" alt="Community" />
              <div className="card-body">
                <h5 className="card-title"><strong>1. Sign Up</strong></h5>
                <p className="card2-text">Create a free account and join our community. It's quick and easy!</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3 position-relative">
            <div className="card-2 h-100">
              <img src='https://od.lk/s/NjFfODU0OTM1MjJf/dollarblack-Photoroom.png' className="card2-img-top" alt="Complete Tasks" />
              <div className="card-body">
                <h5 className="card-title"><strong>2. Earn $CUAN</strong></h5>
                <p className="card2-text">Participate in surveys, play games, watch videos, and more to earn $CUAN.</p>
              </div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card-2 h-100">
              <img src='https://od.lk/s/NjFfODU1MzcwNTJf/handgift-Photoroom.png' className="card2-img-top" alt="Earn Rewards" />
              <div className="card-body">
                <h5 className="card-title"><strong>3. Cash Out</strong></h5>
                <p className="card2-text">Collect $CUAN and redeem them for cash, gift cards, and other exciting rewards.</p>
              </div>
            </div>
          </div>
        </div>
        <a className="btn btn-primary btn-lg" href="#/signup" role="button" onClick={(e) => HandlePageClick(e, '/signup', x, navigate)}>Let's Try</a>
      </div>
    </section>
  );
};

export default HowItWorks;