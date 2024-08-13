import React, { useEffect, useState } from 'react';
import { APP_KEY_POLLFISH, REQUEST_UUID, PLACEMENT_KEY } from '../config';



const PollfishSurvey = () => {
  const [surveyURL, setSurveyURL] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [warningMessageNotEligible, setWarningMessageNotEligible] = useState(false);
  const [warningMessageSurveyClosed, setWarningMessageSurveyClosed] = useState(false);
  const [warningMessageNoSurveyAvailable, setWarningMessageNoSurveyAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const uniqueUserID = localStorage.getItem('uuid');

  useEffect(() => {
    const fetchSurvey = () => {
      const api_key = APP_KEY_POLLFISH;
      const debug = true;
      const device_id = uniqueUserID;
      const request_uuid = REQUEST_UUID;
      const placement_key = PLACEMENT_KEY;
      

      setLoadingMessage(true);
      const url = `https://wss.pollfish.com/v2/device/register/true?json=%7B%22api_key%22%3A%22${api_key}%22%2C%22offerwall%22%3A%22true%22%2C%22debug%22%3A%22${debug}%22%2C%22ip%22%3A%221.2.3.4%22%2C%22device_id%22%3A%22${device_id}%22%2C%22timestamp%22%3A%221517312061131%22%2C%22encryption%22%3A%22NONE%22%2C%22version%22%3A%229%22%2C%22device_descr%22%3A%22UNKNOWN%22%2C%22os%22%3A%223%22%2C%22os_ver%22%3A%2210.13.2%22%2C%22scr_h%22%3A%221178%22%2C%22src_w%22%3A%221920%22%2C%22scr_size%22%3A%2223.46429949294128%22%2C%22manufacturer%22%3A%22UNKNOWN%22%2C%22locale%22%3A%22en-US%2Cen%2Cel%22%2C%22request_uuid%22%3A%22${request_uuid}%22%2C%22hardware_accelerated%22%3A%22false%22%2C%22video%22%3A%22true%22%2C%22survey_format%22%3A%220%22%2C%22placement_key%22%3A%22${placement_key}%22%7D&dontencrypt=true&webplugin=false&iframewidth=400px&position=BOTTOM_RIGHT`;

      const oReq = new XMLHttpRequest();

      oReq.addEventListener("load", function () {
        setLoadingMessage(false);
        if (this.status === 400 || this.status === 500) {
          setErrorMessage(true);
          setTimeout(() => setErrorMessage(false), 3000);
        } else {
          setSurveyURL(url);
        }
      });

      oReq.open("GET", url);
      oReq.send();
    };

    fetchSurvey();

    const handlePollfishEvents = (e) => {
      if (e.data === 'webViewLoaded') {
        console.log('webViewLoaded');
      } else if (e.data === 'close') {
        setWarningMessageSurveyClosed(true);
        setTimeout(() => setWarningMessageSurveyClosed(false), 3000);
        setSurveyURL(null);
      } else if (e.data === 'userNotEligible') {
        setWarningMessageNotEligible(true);
        setTimeout(() => setWarningMessageNotEligible(false), 3000);
      } else if (e.data === 'closeAndNoShow') {
        setWarningMessageSurveyClosed(true);
        setTimeout(() => setWarningMessageSurveyClosed(false), 3000);
        setSurveyURL(null);
      } else if (e.data === 'noSurveyAvailable') {
        setWarningMessageNoSurveyAvailable(true);
        setTimeout(() => setWarningMessageNoSurveyAvailable(false), 3000);
      } else if (typeof e.data === 'string' && e.data.indexOf('setSurveyCompleted') > -1) {
        const data = JSON.parse(e.data);
        if (data.type === 'setSurveyCompleted') {
          const survey = {
            survey_price: data.survey_price,
            reward_name: data.reward_name,
            reward_value: data.reward_value,
            survey_class: data.survey_class,
            survey_loi: data.survey_loi,
            survey_ir: data.survey_ir,
          };
          setSuccessMessage(true);
          setTimeout(() => setSuccessMessage(false), 3000);
        }
      }
    };

    window.addEventListener('message', handlePollfishEvents);

    return () => {
      window.removeEventListener('message', handlePollfishEvents);
    };
  }, [uniqueUserID]);

  return (
    <div>
      <style>{`
        .text-center {
          text-align: center;
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
        }
        
        iframe {
          width: 100%;
          height: 1000px;
        }
      `}</style>
      <div>
        <div className="container">
          {successMessage && <span id='successMessage'>You have finished the survey successfully.</span>}
          {warningMessageNotEligible && <span id='warningMessageNotEligible'>You are not eligible to take the survey.</span>}
          {warningMessageSurveyClosed && <span id='warningMessageSurveyClosed'>The survey has closed.</span>}
          {warningMessageNoSurveyAvailable && <span id='warningMessageNoSurveyAvailable'>No survey available. Please try again!</span>}
          {errorMessage && <span id='errorMessage'>Something went wrong!</span>}
          {loadingMessage && <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading survey...</p>
        </div> }
        </div>
      </div>
      <div id='surveyContainer'>
        <div id="survey">
          {surveyURL && <iframe title='survey' id="pollfishSurveyFrame" frameBorder="0" name="pollfishSurveyFrame" seamless="seamless" src={surveyURL}></iframe>}
        </div>
      </div>
    </div>
  );
};

export default PollfishSurvey;
