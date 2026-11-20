import React, { useState } from 'react';
import {
  Menu, X, Sparkles, Shield, User, ArrowRight, Flame, Bell,
  BookOpen, Users, Cpu, FileText, ChevronDown, CheckCircle
} from 'lucide-react';

export default function Navbar({
  currentView,
  onNavigate,
  currentRole,
  onChangeRole,
  onOpenGetHelp,
  onReplayIntro,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'subjects', label: 'Explore Subjects' },
    { id: 'experts', label: 'Our Experts' },
    { id: 'services', label: 'Academic Services' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="main-navbar">
      <div className="navbar-inner-wrap">
        {/* Brand Logo */}
        <button className="nav-brand-btn" onClick={() => handleNavClick('home')}>
          <img src="/expert-tutors-logo.png" alt="Expert Tutors Official Logo" className="nav-brand-logo" />
          <span className="brand-text">
            EXPERT <span className="gold-text">TUTORS</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          {navLinks.map((item) => (
            <button
              key={item.id}
              className={`nav-link-btn ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
              {currentView === item.id && <span className="active-gold-line" />}
            </button>
          ))}
        </nav>

        {/* Right Actions: Role Switcher & Primary CTA */}
        <div className="navbar-actions-group">
          {/* Replay Spider Blast Intro */}
          <button
            className="icon-circle-btn"
            title="Replay Spider Blast Intro"
            onClick={onReplayIntro}
            aria-label="Replay Cinematic Intro"
          >
            <Flame size={16} className="gold-icon" />
          </button>

          {/* Role Portal Switcher */}
          <div className="role-switcher-wrap">
            <button
              className="role-pill-btn"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              title="Switch user perspective"
            >
              <User size={14} className="gold-icon" />
              <span>{currentRole} Mode</span>
              <ChevronDown size={13} />
            </button>

            {roleDropdownOpen && (
              <div className="role-dropdown-popover">
                <div className="dropdown-label">SWITCH INTERFACE</div>
                <button
                  className={`role-option ${currentRole === 'Student' ? 'selected' : ''}`}
                  onClick={() => {
                    onChangeRole('Student');
                    setRoleDropdownOpen(false);
                    onNavigate('student-portal');
                  }}
                >
                  <b>Student Portal</b>
                  <small>Submit requests & track missions</small>
                </button>
                <button
                  className={`role-option ${currentRole === 'Expert' ? 'selected' : ''}`}
                  onClick={() => {
                    onChangeRole('Expert');
                    setRoleDropdownOpen(false);
                    onNavigate('expert-portal');
                  }}
                >
                  <b>Expert Portal</b>
                  <small>Manage assigned inquiries & notes</small>
                </button>
                <button
                  className={`role-option ${currentRole === 'Admin' ? 'selected' : ''}`}
                  onClick={() => {
                    onChangeRole('Admin');
                    setRoleDropdownOpen(false);
                    onNavigate('admin-dashboard');
                  }}
                >
                  <b className="gold-text">Admin Dashboard</b>
                  <small>Business owner full network control</small>
                </button>
              </div>
            )}
          </div>

          {/* Get Expert Help Button */}
          <button className="gold-btn nav-cta-btn" onClick={onOpenGetHelp}>
            <span>Get Expert Help</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-links-stack">
            {navLinks.map((item) => (
              <button
                key={item.id}
                className={`mobile-link-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-role-buttons">
              <button
                className={`m-role-btn ${currentRole === 'Student' ? 'on' : ''}`}
                onClick={() => { onChangeRole('Student'); onNavigate('student-portal'); setMobileMenuOpen(false); }}
              >
                Student
              </button>
              <button
                className={`m-role-btn ${currentRole === 'Expert' ? 'on' : ''}`}
                onClick={() => { onChangeRole('Expert'); onNavigate('expert-portal'); setMobileMenuOpen(false); }}
              >
                Expert
              </button>
              <button
                className={`m-role-btn ${currentRole === 'Admin' ? 'on' : ''}`}
                onClick={() => { onChangeRole('Admin'); onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
              >
                Admin
              </button>
            </div>
            <button className="gold-btn full-width" onClick={() => { onOpenGetHelp(); setMobileMenuOpen(false); }}>
              Get Expert Help →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
