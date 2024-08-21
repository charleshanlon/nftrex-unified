import React from 'react';

const style = {
    backgroundColor: '#fff8e7',
    color: '#242424',
    padding: '2rem',
    minHeight: '70rem',
    fontFamily: 'Arial, sans-serif'
  };

const PrivacyPolicy = () => {
  return (
    <div style={style}>
      <h1>Privacy Policy for NFT-Rex</h1>
      <p><strong>Last Updated:</strong> 8/13/2024</p>
      <p>Welcome to NFT-Rex.</p>

      <h2>1. Data Collection</h2>
      <p>At NFT-Rex, we value your privacy. We do not collect, store, or share any personal data from our users.</p>

      <h2>2. Cookies</h2>
      <p>We do not use cookies to track or store user information.</p>

      <h2>3. Third-party Links</h2>
      <p>Our web app may contain links to external sites. Please be aware that we are not responsible for the content or privacy practices of such other sites.</p>

      <h2>4. Changes to This Privacy Policy</h2>
      <p>We may update this privacy policy occasionally. Any changes will be posted on this page.</p>

      <h2>5. Contact Us</h2>
      <p>For any questions regarding this privacy policy, please contact us at:</p>
      <p>charles@titorlabs.io</p>
    </div>
  );
}

export default PrivacyPolicy;