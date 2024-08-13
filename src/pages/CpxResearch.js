import React, { useEffect, useState } from 'react';
//const { APPID, SECURE_H } = require('../encrypt');
import { APPID, SECURE_H  } from '../config';


function CpxResearch() {
  const [surveyURL, setSurveyURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const uniqueUserID = localStorage.getItem('uuid');
    const userFullName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');
    const appID = APPID;
    const secureHash = SECURE_H;


    const surveyURL = `https://offers.cpx-research.com/index.php?app_id=${appID}&ext_user_id=${uniqueUserID}&secure_hash=${secureHash}&username=${userFullName}&email=${userEmail}&subid_1=&subid_2`;
    setSurveyURL(surveyURL);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading survey...</p>
        </div> }
      {surveyURL && (
        <iframe
          width="100%"
          height="1000px"
          src={surveyURL}
          title="Survey"
          onLoad={handleIframeLoad}
          style={{ display: isLoading ? 'none' : 'block', border: 'none' }}
        ></iframe>
      )}
    </div>
  );
}

export default CpxResearch;
