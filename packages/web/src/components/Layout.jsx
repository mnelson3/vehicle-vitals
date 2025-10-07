import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout({ forceOverlay = false }) {
  const location = useLocation();
  const overlay = forceOverlay || location.pathname === '/';
  return (
    <div>
      <SiteHeader overlay={overlay} />
      <main className={`page-content${overlay ? ' overlay' : ''}`}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
