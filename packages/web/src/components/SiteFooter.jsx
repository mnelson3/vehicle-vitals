import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/terms">Terms of Use</Link>
          <span>•</span>
          <Link to="/privacy">Privacy</Link>
          <span>•</span>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
