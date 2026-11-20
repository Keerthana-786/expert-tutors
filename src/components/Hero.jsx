import React from 'react';
import {
  Sparkles, ShieldCheck, ArrowRight, BookOpen, GraduationCap,
  Users, CheckCircle2, ChevronRight, Layers, Award
} from 'lucide-react';

export default function Hero({ onGetHelp, onExploreSubjects }) {
  return (
    <section className="hero-section">
      <div className="hero-grid-pattern" />
      <div className="hero-glow-golden" />

      <div className="hero-container">
        {/* Left Column: Headline & Description */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="gold-dot" />
            <span>40+ QUALIFIED ACADEMIC EXPERTS</span>
          </div>

          <h1 className="hero-title">
            EVERY CHALLENGE<br />
            DESERVES AN<br />
            <span className="gold-text">EXPERT.</span>
          </h1>

          <p className="hero-desc">
            From Mathematics and Engineering to Medical Sciences, Finance, Law, and Business, connect with qualified academic specialists who help you move forward with confidence.
          </p>

          <div className="hero-actions">
            <button className="gold-btn hero-cta-btn" onClick={onGetHelp}>
              <span>GET EXPERT HELP</span>
              <ArrowRight size={17} />
            </button>
            <button className="ghost-btn" onClick={onExploreSubjects}>
              <span>EXPLORE OUR SUBJECTS</span>
            </button>
          </div>

          {/* Company Trust Metrics */}
          <div className="hero-trust-strip">
            <div className="trust-metric">
              <span className="metric-number">40<span className="gold-symbol">+</span></span>
              <span className="metric-label">Qualified Experts</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-metric">
              <span className="metric-number">23</span>
              <span className="metric-label">Academic Disciplines</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-metric">
              <span className="metric-number">100<span className="gold-symbol">%</span></span>
              <span className="metric-label">Personalized Matching</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-metric">
              <span className="metric-number">Dedicated</span>
              <span className="metric-label">Academic Support</span>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Emblem Visual */}
        <div className="hero-visual">
          <div className="emblem-halo halo-large" />
          <div className="emblem-halo halo-small" />

          {/* Central Emblem */}
          <div className="golden-emblem-core">
            <div className="emblem-rings">
              <div className="ring-outer" />
              <div className="ring-inner" />
            </div>
            <div className="emblem-center-circle">
              <GraduationCap size={70} className="emblem-cap-icon" />
              <span className="emblem-sigil">ET</span>
              <div className="emblem-text-arc">ACADEMIC EXCELLENCE</div>
            </div>
          </div>

          {/* Floating Premium Information Cards */}
          <div className="floating-card card-top-right">
            <div className="card-icon-gold">
              <Award size={18} />
            </div>
            <div className="card-text">
              <b>40+ Academic Experts</b>
              <small>Verified PhDs & Specialists</small>
            </div>
          </div>

          <div className="floating-card card-mid-left">
            <div className="card-icon-gold">
              <Layers size={18} />
            </div>
            <div className="card-text">
              <b>Multiple Subject Specialists</b>
              <small>Science, Eng, Med, Business & Law</small>
            </div>
          </div>

          <div className="floating-card card-bottom-right">
            <div className="card-icon-gold">
              <ShieldCheck size={18} />
            </div>
            <div className="card-text">
              <b>Personalized Academic Support</b>
              <small>Direct Mentoring & Guidance</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
