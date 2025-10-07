import React from 'react';
import AdBanner from '../components/AdBanner';

export default function ComingSoon() {
  const heroSrc = import.meta.env.VITE_HERO_IMAGE_URL || '/images/hero-garage.jpg';
  return (
    <section className="hero hero-full" style={{ '--hero-image': `url(${heroSrc})` }}>
      <div className="hero-overlay" />
      <div className="hero-content d-flex align-items-center" style={{ minHeight: 'calc(100vh - var(--header-h))' }}>
        <div className="container d-flex justify-content-center">
          <div className="hero-inner text-center">
            <div className="kicker">Vehicle Vitals</div>
            <div className="title">Coming Soon!</div>
            <div className="subtitle">We’re putting the finishing touches on Vehicle Vitals. Check back soon.</div>
            <div className="spacing-lg">
              <AdBanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
