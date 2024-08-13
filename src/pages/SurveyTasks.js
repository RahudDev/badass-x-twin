import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const SurveyTasks = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Survey Tasks</h1>
      <div className="row">
        <div className="col-md-4 animate__animated animate__fadeInLeft">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pollfish</h5>
              <p className="card-text">Complete surveys from Pollfish and earn $CUAN.</p>
              <Link to="/pollfish" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 animate__animated animate__fadeInLeft animate__delay-1s">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cpx Research</h5>
              <p className="card-text">Complete surveys from Cpx Research and earn $CUAN.</p>
              <Link to="/cpx-research" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 animate__animated animate__fadeInLeft animate__delay-2s">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bitlabs</h5>
              <p className="card-text">Complete surveys from Bitlabs and earn $CUAN.</p>
              <Link to="/bitlabs" className="btn btn-primary">View Tasks</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTasks;
