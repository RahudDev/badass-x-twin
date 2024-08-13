
import React from 'react';
import './TermsOfService.css'; 

const TermsOfService = () => {
  const storeinfo = localStorage.getItem('isVerified');
  const isVerified = storeinfo === 'true';

  return (
    <div className="container-terms mt-5">
      <div className={`container mt-5 terms ${!isVerified ? 'animate-center-out' : ''}`}>
      <h1 className="terms-us-title">Terms of Service</h1>
      <p className="terms-us-text">
        Welcome to FreeCuan, where you can earn money online by participating in surveys, playing games, watching videos, and engaging in many other activities. By using our services, you agree to the following terms:
      </p>

      <h2 className="terms-us-subtitle">1. Acceptance of Terms</h2>
      <p className="terms-us-text">
        By accessing or using FreeCuan, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with these terms, please do not use our services.
      </p>

      <h2 className="terms-us-subtitle">2. Service Description</h2>
      <p className="terms-us-text">
        FreeCuan offers a platform where users can earn rewards by completing various tasks such as surveys, playing games, watching videos, and more. The rewards earned can be redeemed for cash or other benefits.
      </p>

      <h2 className="terms-us-subtitle">3. Account Registration</h2>
      <p className="terms-us-text">
        To access certain features of FreeCuan, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2 className="terms-us-subtitle">4. User Obligations</h2>
      <p className="terms-us-text">
        You agree to use FreeCuan only for lawful purposes and in accordance with these terms. You will not engage in any fraudulent activities, including but not limited to creating multiple accounts, using false information, or attempting to cheat the system.
      </p>

      <h2 className="terms-us-subtitle">5. Rewards and Redemption</h2>
      <p className="terms-us-text">
        Rewards earned through FreeCuan are subject to verification and may be adjusted or voided at our discretion. The redemption of rewards is subject to our policies, which may change from time to time.
      </p>

      <h2 className="terms-us-subtitle">6. Content and Intellectual Property</h2>
      <p className="terms-us-text">
        All content provided through FreeCuan, including text, graphics, logos, and software, is the property of FreeCuan or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from such content without our explicit permission.
      </p>

      <h2 className="terms-us-subtitle">7. Termination</h2>
      <p className="terms-us-text">
        We reserve the right to suspend or terminate your account if you violate these terms or if we believe you have engaged in any fraudulent or unlawful behavior. You may also terminate your account at any time by contacting us.
      </p>

      <h2 className="terms-us-subtitle">8. Disclaimers and Limitation of Liability</h2>
      <p className="terms-us-text">
        FreeCuan provides its services on an "as-is" basis and makes no warranties or representations regarding the accuracy, reliability, or availability of the services. To the fullest extent permitted by law, FreeCuan shall not be liable for any indirect, incidental, or consequential damages arising from your use of the services.
      </p>

      <h2 className="terms-us-subtitle">9. Changes to Terms</h2>
      <p className="terms-us-text">
        We may update these Terms of Service from time to time. We will notify you of any significant changes, and your continued use of FreeCuan constitutes your acceptance of the updated terms.
      </p>

      <h2 className="terms-us-subtitle">10. Contact Information</h2>
      <p className="terms-us-text">
        If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:support@freecuan.com">support@freecuan.com</a>.
      </p>

      <p className="terms-us-text">
        Thank you for using FreeCuan. We hope you enjoy our platform and the opportunities it provides to earn money online!
      </p>
    </div>
    </div>
  );
};

export default TermsOfService;
