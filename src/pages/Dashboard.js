import React, { useEffect, useState } from 'react';
import {Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({userPoints}) => {
  const [userFullName, setUserName] = useState('');
  const [balanceuser, setbalanceuser] = useState(0);
  const firstName2 = userFullName.split(' ')[0];
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    const virtualpoints = userPoints;
    if (storedUserName) {
      setUserName(storedUserName);
      setbalanceuser(virtualpoints);
    }
  }, [userPoints]);

  const handleNavigateToRedeemPage = () => {
    navigate('/redeem');
  };

  

  return (
    <div className="page-content">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img src="https://od.lk/s/NjFfODI4MjEzNjhf/SmilingEmojiSunglasses.jpg" alt="Profile" className="img-fluid rounded-circle mb-3" />
              <h5 className="card-title">Hai , {firstName2}!</h5>
              <p className="card-text">$CUAN : {balanceuser}</p>
              <a href="#/profile" className="btn btn-primary btn-sm">View Profile</a> &emsp;
            </div>
            <Button onClick={handleNavigateToRedeemPage} className="btn btn-success">Redeem $CUAN</Button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Dashboard</h5>
              <p className="card-text">Here you can see your recent activity and tasks.</p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Complete profile</td>
                      <td>Completed</td>
                      <td>2024-05-19</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>First survey</td>
                      <td>Pending</td>
                      <td>2024-05-20</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
              <a href="#/tasks" className="btn btn-primary">View All Tasks</a>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;