import React from 'react';
import AdBanner from '../components/AdBanner';
// Header and footer provided by Layout

export default function Contact() {
  return (
    <div>
      <div className="container">
        <AdBanner />
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
    </div>
  );
}
