import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cpalead() {
  useEffect(() => {
    window.open('https://fastsvr.com/list/1724', '_blank');
  }, []);

  return (
    <div className="container text-center mt-5">
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <i className="bi bi-arrow-up-right-circle-fill mr-2" style={{ fontSize: '1.5rem' }}></i>
        <div>
          This offer will open in a new window.
        </div>
      </div>
    </div>
  );
}

export default Cpalead;
