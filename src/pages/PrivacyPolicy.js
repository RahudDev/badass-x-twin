
import React from 'react';
import './PrivacyPolicy.css'; 

const PrivacyPolicy = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';

  return (
    <div className="container-privacy">
    <div className={`container mt-5 privacy ${!isVerified ? 'animate-center-out' : ''}`}>
      <h1 className="privacy-us-title">Privacy Policy</h1>
      <p className="privacy-us-text">
        Welcome to FreeCuan! We are committed to protecting your privacy and ensuring you have a positive experience while using our platform. This Privacy Policy explains how we collect, use, and protect your personal information.
      </p>

      <h2 className="privacy-us-subtitle">1. Information We Collect</h2>
      <p className="privacy-us-text">
        We collect information to provide and improve our services. This includes:
      </p>
      <ul className="privacy-us-list">
        <li><strong>Personal Information:</strong> When you register, we collect your email address, and any other information you provide, such as your name or contact details.</li>
        <li><strong>Usage Data:</strong> We collect data about how you use our platform, including the surveys you complete, games you play, and videos you watch.</li>
        <li><strong>Device Information:</strong> We may collect information about the device you use to access our platform, such as your IP address, browser type, and operating system.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience and analyze usage patterns.</li>
      </ul>

      <h2 className="privacy-us-subtitle">2. How We Use Your Information</h2>
      <p className="privacy-us-text">
        We use your information to:
      </p>
      <ul className="privacy-us-list">
        <li><strong>Provide Services:</strong> To manage your account, deliver rewards, and personalize your experience.</li>
        <li><strong>Improve Our Platform:</strong> To analyze user behavior and improve our offerings.</li>
        <li><strong>Communicate with You:</strong> To send updates, promotional materials, and respond to your inquiries.</li>
        <li><strong>Ensure Security:</strong> To monitor and prevent fraudulent activities and ensure the safety of our users.</li>
      </ul>

      <h2 className="privacy-us-subtitle">3. How We Share Your Information</h2>
      <p className="privacy-us-text">
        We do not sell or rent your personal information. We may share your information with:
      </p>
      <ul className="privacy-us-list">
        <li><strong>Service Providers:</strong> Third parties that assist us in operating our platform and providing services.</li>
        <li><strong>Legal Requirements:</strong> If required by law or to protect our rights, we may disclose your information.</li>
        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
      </ul>

      <h2 className="privacy-us-subtitle">4. Your Choices and Rights</h2>
      <p className="privacy-us-text">
        You have the following rights regarding your personal information:
      </p>
      <ul className="privacy-us-list">
        <li><strong>Access and Update:</strong> You can view and update your account information by logging into your account.</li>
        <li><strong>Opt-Out:</strong> You can opt-out of receiving promotional emails by following the instructions in those emails.</li>
        <li><strong>Delete Account:</strong> You can request to delete your account by contacting us.</li>
      </ul>

      <h2 className="privacy-us-subtitle">5. Data Security</h2>
      <p className="privacy-us-text">
        We implement security measures to protect your information from unauthorized access, disclosure, or destruction. However, no online service is completely secure, and we cannot guarantee absolute protection.
      </p>

      <h2 className="privacy-us-subtitle">6. Children's Privacy</h2>
      <p className="privacy-us-text">
        Our platform is not intended for children under 13. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it.
      </p>

      <h2 className="privacy-us-subtitle">7. Changes to This Privacy Policy</h2>
      <p className="privacy-us-text">
        We may update this Privacy Policy from time to time. We will notify you of significant changes, and your continued use of our platform constitutes your acceptance of the updated policy.
      </p>

      <h2 className="privacy-us-subtitle">8. Contact Us</h2>
      <p className="privacy-us-text">
        If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:support@freecuan.com">support@freecuan.com</a>. We are here to help and ensure you have a positive experience with FreeCuan.
      </p>

      <p className="privacy-us-text">
        Thank you for trusting FreeCuan with your personal information. We are dedicated to safeguarding your privacy and providing a secure and enjoyable platform.
      </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
