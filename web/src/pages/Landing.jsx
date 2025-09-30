import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function Landing() {
  const heroSrc = import.meta.env.VITE_HERO_IMAGE_URL || '/images/hero-garage.jpg';
  return (
    <div>
      <SiteHeader />
      {/* Full-bleed Hero Section */}
      <section
        className="hero hero-full"
        style={{ ['--hero-image']: `url(${heroSrc})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="container">
            <div className="hero-inner">
              <div className="kicker">Care for every mile</div>
              <div className="title">Track your vehicle’s story with confidence</div>
              <div className="subtitle">Vehicle Vitals helps you log maintenance, plan service, and keep a timeless record—on web and mobile.</div>
              <div className="cta">
                <Link to="/app" className="button primary">Open the app</Link>
                <span style={{ marginLeft: 12 }}>
                  or <Link to="/instructions">read the instructions</Link>
                </span>
              </div>
            </div>

            {/* Feature Cards now overlaying the hero background */}
            <section className="grid-2 spacing-lg">
              <div className="card glass">
                <h3>VIN decode & quick add</h3>
                <p className="muted">Enter a VIN to prefill year, make, and model from the NHTSA database.</p>
              </div>
              <div className="card glass">
                <h3>Maintenance, organized</h3>
                <p className="muted">Log services, notes, and costs. Stay on top of what’s due next.</p>
              </div>
              <div className="card glass">
                <h3>Your garage, anywhere</h3>
                <p className="muted">Access your vehicles from the web and our companion mobile apps.</p>
              </div>
              <div className="card glass">
                <h3>Own your history</h3>
                <p className="muted">A clear record helps with resale and long-term care—one place to remember it all.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
