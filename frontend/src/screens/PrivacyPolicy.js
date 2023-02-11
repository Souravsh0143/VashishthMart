import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <h1>Privacy Policy</h1>
      <p>
        At our VashishthMart shopping website, we take the privacy of our
        customers very seriously. We collect personal information, such as name,
        address, and payment information, in order to process orders and provide
        a more personalized shopping experience. We may also collect information
        about how you use our website, including pages you visit and items you
        purchase, in order to improve our offerings and website functionality.
        We take appropriate security measures to protect against unauthorized
        access to or unauthorized alteration, disclosure, or destruction of
        data. However, no method of transmission over the Internet or method of
        electronic storage is 100% secure, so we cannot guarantee its absolute
        security. We will never sell or rent your personal information to third
        parties, and we will only share your information as necessary to fulfill
        your order or as required by law. By using our website, you consent to
        the collection and use of your personal information as outlined in this
        Privacy Policy. We reserve the right to modify this Privacy Policy at
        any time, and it is your responsibility to review the Privacy Policy
        regularly to ensure that you are aware of any changes.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
