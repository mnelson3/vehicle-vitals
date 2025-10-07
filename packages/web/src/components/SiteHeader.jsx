import React from 'react';
import { Link } from 'react-router-dom';
import StackedVLogo from './StackedVLogo';
import { useAuth } from '../shared/AuthContext';

export default function SiteHeader({ overlay = false }) {
  const { user, signOut } = useAuth();
  return (
    <header className={`site-header${overlay ? ' overlay' : ''}`}>
      <div className="container">
        <nav className="site-nav" style={{ width: '100%' }}>
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
            <Link to="/" aria-label="Go to home" style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}>
              <StackedVLogo
                size={34}
                showText
                color={overlay ? '#ffffff' : 'currentColor'}
                accent={overlay ? 'var(--gold)' : 'var(--primary)'}
                wordmarkColor={overlay ? '#ffffff' : 'var(--muted)'}
              />
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 12, marginLeft: 'auto', flex: '0 0 auto', textAlign: 'right', alignItems: 'center' }}>
            <Link to="/instructions">Instructions</Link>
            {user ? (
              <>
                <Link to="/app">My Garage</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={signOut} className="p-0" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
