import React from 'react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function Contact() {
  return (
    <div>
      <SiteHeader />
      <div className="container">
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you. For support, feedback, or questions, send us an email:
        </p>
        <p>
          <a href="mailto:support@vehicle-vitals.com">support@vehicle-vitals.com</a>
        </p>
        <p className="muted" style={{ fontSize: 14 }}>
          Include your browser/app version and a brief description of the issue to help us assist you faster.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
