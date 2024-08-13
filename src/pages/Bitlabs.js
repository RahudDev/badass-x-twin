import React, { useEffect, useState } from 'react';
import { TOKENBITLABS } from '../config';

function Bitlabs() {
  const [surveyURL, setSurveyURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uniqueUserID = localStorage.getItem('uuid');
    const Token_API = TOKENBITLABS;
    const surveyURL = `https://web.bitlabs.ai/?uid=${uniqueUserID}&token=${Token_API}`;
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

export default Bitlabs;
