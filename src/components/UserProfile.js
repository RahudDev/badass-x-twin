import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Profile</h5>
        <p className="card-text"><strong>Name:</strong> {user.name}</p>
        <p className="card-text"><strong>Email:</strong> {user.email}</p>
        <p className="card-text"><strong>Points:</strong> {user.points}</p>
      </div>
    </div>
  );
};

export default UserProfile;
