import React from 'react';
import { Link } from 'react-router-dom';
import StackedVLogo from './StackedVLogo';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="site-nav">
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StackedVLogo size={26} showText />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/instructions">Instructions</Link>
            <Link to="/login">Login</Link>
            <Link to="/app">Open App</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
