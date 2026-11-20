import React from 'react';
import {
  Sparkles, ShieldCheck, ArrowRight, BookOpen, GraduationCap,
  Users, CheckCircle2, ChevronRight, Award, Star, Flame, Zap,
  TrendingUp, Clock, BookMarked, Compass
} from 'lucide-react';

export default function Hero({ onGetHelp, onExploreSubjects, onSelectTutor }) {
  const handleTutorClick = () => {
    if (onSelectTutor) {
      onSelectTutor({
        name: 'Aarav Menon',
        role: 'Mathematics & Programming Tutor',
        primarySubject: 'Computer Science Engineering',
      });
    } else if (onGetHelp) {
      onGetHelp({ name: 'Mathematics & Programming', categoryName: 'Science and Mathematics' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid-pattern" />
      {/* Spider-themed dual glows */}
      <div className="hero-spider-glow glow-red" />
      <div className="hero-spider-glow glow-blue" />
      <div className="hero-glow-golden" />

      <div className="hero-container">
        {/* ============================================================== */}
        {/* LEFT COLUMN: HEADLINE, SUBTITLE & CTAS                         */}
        {/* ============================================================== */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-pulse-dot" />
            <span>40+ QUALIFIED ACADEMIC EXPERTS ONLINE</span>
          </div>

          {/* 3. MAIN HERO HEADLINE (PINK MARKING) */}
          <h1 className="hero-title hero-headline-redesigned">
            Welcome to <span className="spider-red-gradient">Expert Tutors</span> –<br />
            Smart Support for <span className="electric-blue-gradient">Academic Excellence</span>.
          </h1>

          {/* 2. SUBTITLE / DESCRIPTION (ORANGE MARKING) */}
          <p className="hero-desc hero-desc-exact">
            Meet Our Experts. Choose Your Tutor. Book Your Session. Start Achieving More!
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button
              className="gold-btn hero-cta-btn"
              onClick={onGetHelp}
              title="Submit your academic homework requirement"
            >
              <Zap size={16} className="btn-lightning-icon" fill="#F5BD32" />
              <span>Submit Your Homework</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="ghost-btn hero-explore-btn"
              onClick={onExploreSubjects}
              title="Browse academic missions and subjects"
            >
              <Compass size={16} />
              <span>Explore Missions</span>
            </button>
          </div>

          {/* Company Trust Metrics Strip */}
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

        {/* ============================================================== */}
        {/* 1. RIGHT SIDE: PROFILE SHOWCASE (GREEN MARKING)                */}
        {/* ============================================================== */}
        <div className="hero-visual hero-showcase-stage">
          {/* Subtle Background Orbital Circles */}
          <div className="showcase-orbit-ring ring-outer" />
          <div className="showcase-orbit-ring ring-inner" />

          {/* Floating Live Match Status Pill */}
          <div className="live-status-pill floating-element float-top">
            <span className="pulse-beacon" />
            <span className="live-text">40+ Specialists Online</span>
            <span className="pill-divider">•</span>
            <span className="response-time">~3 min avg match</span>
          </div>

          {/* TUTOR PROFILE CARD (Aarav Menon) */}
          <div
            className="profile-card tutor-card glass-panel floating-element float-mid-left"
            onClick={handleTutorClick}
            title="Click to view Aarav Menon's profile or book a session"
            role="button"
            tabIndex={0}
          >
            <div className="profile-card-header">
              <div className="avatar-wrapper tutor-avatar-ring">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80"
                  alt="Aarav Menon"
                  className="profile-avatar-img"
                />
                <span className="online-badge-dot" title="Available Now" />
              </div>

              <div className="profile-header-info">
                <div className="name-verified-row">
                  <h3 className="profile-name">Aarav Menon</h3>
                  <span className="badge-verified-tutor" title="Verified Mentor">
                    <ShieldCheck size={13} />
                    <span>Verified</span>
                  </span>
                </div>
                <p className="profile-role">Mathematics &amp; Programming Tutor</p>
                <div className="profile-rating-row">
                  <div className="stars-cluster-mini">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#F5BD32" className="star-gold" />
                    ))}
                  </div>
                  <b className="rating-val">4.9/5</b>
                  <span className="exp-pill">3+ yrs exp</span>
                </div>
              </div>
            </div>

            {/* Achievement & XP Strip */}
            <div className="profile-badge-strip">
              <span className="xp-badge">
                <Zap size={11} fill="#F5BD32" />
                2,450 XP
              </span>
              <span className="rank-badge">Level 8 Elite Mentor</span>
            </div>

            {/* Success Indicators */}
            <div className="profile-success-metrics">
              <div className="success-metric-item">
                <span className="success-val">120+</span>
                <span className="success-lbl">Sessions Done</span>
              </div>
              <div className="metric-v-sep" />
              <div className="success-metric-item">
                <span className="success-val">99%</span>
                <span className="success-lbl">Positive Feedback</span>
              </div>
              <div className="metric-v-sep" />
              <div className="success-metric-item">
                <span className="success-val">Fast</span>
                <span className="success-lbl">Explanation Rate</span>
              </div>
            </div>

            <div className="profile-card-action">
              <span className="action-hint">⚡ Click to Book Mentorship</span>
              <ChevronRight size={15} className="action-arrow" />
            </div>
          </div>

          {/* STUDENT PROFILE CARD (Diya Sharma) */}
          <div
            className="profile-card student-card glass-panel floating-element float-bottom-right"
            onClick={onGetHelp}
            title="Click to submit requirement or view student progress"
            role="button"
            tabIndex={0}
          >
            <div className="profile-card-header">
              <div className="avatar-wrapper student-avatar-ring">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=260&q=80"
                  alt="Diya Sharma"
                  className="profile-avatar-img"
                />
                <span className="active-study-dot" title="Currently Studying" />
              </div>

              <div className="profile-header-info">
                <div className="name-verified-row">
                  <h3 className="profile-name">Diya Sharma</h3>
                  <span className="badge-scholar" title="Level 6 Scholar">
                    <GraduationCap size={12} />
                    <span>Level 6 Scholar</span>
                  </span>
                </div>
                <p className="profile-role">Computer Science Undergrad</p>
                <div className="student-xp-line">
                  <span className="xp-text">1,850 XP</span>
                  <span className="streak-pill">
                    <Flame size={12} className="flame-gold" />
                    5-Day Streak
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Progress & Current Focus */}
            <div className="student-focus-box">
              <div className="focus-header">
                <span className="focus-label">Current Academic Focus:</span>
                <span className="grade-boost-tag">Grade: B- → A</span>
              </div>
              <p className="focus-subject-text">Calculus II &amp; Data Structures</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: '88%' }} />
              </div>
              <div className="progress-labels">
                <small>88% Mastery</small>
                <small>Next Session: Today @ 4 PM</small>
              </div>
            </div>
          </div>

          {/* Mini Interactive Connection Chip */}
          <div className="connection-chip glass-panel floating-element float-bottom-left">
            <div className="chip-icon-box">
              <CheckCircle2 size={16} className="chip-check" />
            </div>
            <div className="chip-text">
              <b>Live Match Confirmed</b>
              <small>Tutor Aarav M. &bull; Student Diya S.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
