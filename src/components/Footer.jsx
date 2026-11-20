import React from 'react';
import { ShieldCheck, Flame, ArrowUpRight, Zap, GraduationCap } from 'lucide-react';

export default function Footer({ onNavigate, onReplayIntro }) {
  return (
    <footer className="main-footer">
      <div className="footer-top-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo-row">
            <img src="/expert-tutors-logo.png" alt="Expert Tutors" className="footer-logo-img" />
            <h3 className="footer-brand-name">
              EXPERT <span className="gold-text">TUTORS</span>
            </h3>
          </div>
          <p className="footer-mission-text">
            Premium Academic Expert Network connecting students with over 40 qualified subject specialists and PhD scholars across 23 academic disciplines.
          </p>
          <div className="footer-integrity-pill">
            <ShieldCheck size={16} className="gold-icon" />
            <span>Strict Academic Integrity Compliant</span>
          </div>
        </div>

        {/* Faculties */}
        <div className="footer-nav-col">
          <h4>Academic Faculties</h4>
          <button onClick={() => onNavigate('subjects')}>Science and Mathematics</button>
          <button onClick={() => onNavigate('subjects')}>Engineering & Computer Science</button>
          <button onClick={() => onNavigate('subjects')}>Biology & Medical Sciences</button>
          <button onClick={() => onNavigate('subjects')}>Finance & Business Studies</button>
          <button onClick={() => onNavigate('subjects')}>Law & Architecture</button>
        </div>

        {/* Services & Portals */}
        <div className="footer-nav-col">
          <h4>Platform Portals</h4>
          <button onClick={() => onNavigate('student-portal')}>Student Request Portal</button>
          <button onClick={() => onNavigate('expert-portal')}>Expert Scholar Portal</button>
          <button onClick={() => onNavigate('admin-dashboard')}>Executive Admin Dashboard</button>
          <button onClick={() => onNavigate('services')}>12 Academic Services</button>
          <button onClick={() => onNavigate('how-it-works')}>4-Step Matching Workflow</button>
        </div>

        {/* Trust & Company */}
        <div className="footer-nav-col">
          <h4>Integrity & Replay</h4>
          <button onClick={() => onNavigate('about')}>About Expert Tutors</button>
          <button onClick={() => onNavigate('contact')}>Academic Coordination Desk</button>
          <button className="replay-intro-footer-btn" onClick={onReplayIntro}>
            <Flame size={14} className="gold-icon" />
            <span>Replay Cinematic Spider Blast Intro</span>
          </button>
          <p className="academic-disclaimer">
            Expert Tutors focuses strictly on tutoring, explanations, problem-solving feedback, and academic guidance.
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 EXPERT TUTORS. All rights reserved. Premium Academic Expert Network.</span>
        <div className="footer-meta-links">
          <span>Academic Excellence</span>
          <span>·</span>
          <span>Confidentiality Protected</span>
          <span>·</span>
          <span>Credential Verified Scholars</span>
        </div>
      </div>
    </footer>
  );
}
