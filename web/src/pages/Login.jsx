import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function Login() {
  return (
    <div>
      <SiteHeader />
      <div className="container narrow">
        <h1>Login</h1>
        <p>
          Use the sign-in controls at the top to access your account. Anonymous sign-in may be available for quick trials.
        </p>
        <p>
          Once signed in, head to the <Link to="/app">app</Link> to manage your vehicles.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
