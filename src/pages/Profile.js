import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUserName = localStorage.getItem('name');
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserName && storedUserEmail) {
      setUserProfile({ name: storedUserName, email: storedUserEmail });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Profile</h1>
      <div className="mb-3">
        <label htmlFor="profileName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="profileName"
          value={userProfile.name}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="profileEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="profileEmail"
          value={userProfile.email}
          readOnly
        />
      </div>
      {/* Add more profile details here */}
    </div>
  );
};

export default Profile;
