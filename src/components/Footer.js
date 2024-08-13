import React, { useState, useRef } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { HandlePageClick } from '../App';


const Footer = () => {
  const contactSectionRef = useRef(null);
  const navigate = useNavigate();

  const languageOptions = {
    en: 'https://od.lk/s/NjFfODU2NzMwMzFf/uk%20flag.jpg',
    es: 'https://od.lk/s/NjFfODU2NzM4MDRf/espanolflag.jpg',
    fr: 'https://od.lk/s/NjFfODU2NzM4OTJf/francisflag.jpg',
    de: 'https://od.lk/s/NjFfODU2NzM4Nzhf/germanflag.jpg',
    zh: 'https://od.lk/s/NjFfODU2NzQwNTVf/chinaflag.jpg',
    ja: 'https://od.lk/s/NjFfODU2NzQwNTdf/japan%20flag.jpg',
    ko: 'https://od.lk/s/NjFfODU2NzQwNTlf/koreanflag.jpg',
    ru: 'https://od.lk/s/NjFfODU2NzQwNjVf/russianflag.jpg',
    pt: 'https://od.lk/s/NjFfODU2NzQwNjdf/portugalflag.jpg',
    it: 'https://od.lk/s/NjFfODU2NzQwNzFf/italianflag.jpg',
    ar: 'https://od.lk/s/NjFfODU2NzQwNzVf/arabicflag.jpg',
    in: 'https://od.lk/s/NjFfODU2NzQxMDZf/hindiflag.jpg',
  };

  // State to manage the selected language and image path
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [imageSrc, setImageSrc] = useState(languageOptions.en);

  // Handle language change
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setImageSrc(languageOptions[language]);
  };
   return (
  <footer>
    <div className="footer-container">
      <div className="footer-section">
        <h4>Language</h4>
        <div className="language">
      <img src={imageSrc} alt={selectedLanguage} />
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ru">Русский</option>
        <option value="pt">Português</option>
        <option value="it">Italiano</option>
        <option value="ar">العربية</option>
        <option value="in">Hindi</option>
      </select>
    </div>
      </div>
      <div className="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="#/faq" onClick={(e) => HandlePageClick(e, '/faq',contactSectionRef, navigate)}>FAQ</a></li>
          <li><a href="#/contact-us" onClick={(e) => HandlePageClick(e, '/contact-us', contactSectionRef, navigate)}>Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="link_to_x">X<i className="fab fa-x"></i></a></li>
          <li><a href="link_to_facebook">Facebok<i className="fab fa-facebook-f"></i></a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Our App Available in : </h4>
        <ul className="app-links">
         <li><a href="link_to_google_play" className="app-link">
         <img src="https://od.lk/s/NjFfODU2NzMxMTJf/google%20play%20logo-Photoroom.png" alt="Google Play" />
        <span></span>
         </a>
         </li>
          <li>
           <a href="link_to_app_store" className="app-link">
           <img src="https://od.lk/s/NjFfODU2NzMyNTNf/app_store_logo-removebg-preview.png" alt="App Store" />
           <span></span>
           </a>
            </li>
             </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p><a href="#/terms-of-service" onClick={(e) => HandlePageClick(e, '/terms-of-service',contactSectionRef, navigate)}>Terms of Service</a> | <a href="#/privacy-policy" onClick={(e) => HandlePageClick(e, '/privacy-policy',contactSectionRef, navigate)}>Privacy Policy</a></p>
      <p>&copy; 2024 Free Cuan. All Rights Reserved.</p>
    </div>
  </footer>
   )
  };

export default Footer;
