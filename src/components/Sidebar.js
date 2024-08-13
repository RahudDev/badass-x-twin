import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Dashboard</div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">Home</Link>
        <Link to="/tasks" className="list-group-item list-group-item-action bg-light">Tasks</Link>
        <Link to="/profile" className="list-group-item list-group-item-action bg-light">Profile</Link>
      </div>
    </div>
  );
};

export default Sidebar;
