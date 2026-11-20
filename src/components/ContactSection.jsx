import React, { useState } from 'react';
import {
  Mail, MessageSquare, Phone, Send, CheckCircle2, Shield, ArrowRight, Clock
} from 'lucide-react';
import { SUBJECTS } from '../data/mockData';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Academic Inquiry',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Academic Inquiry',
        message: '',
      });
    }, 4000);
  };

  return (
    <section className="contact-section" id="contact-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>CONTACT & ACADEMIC ENQUIRY</span>
        </div>
        <h2 className="section-title">
          Connect With Our <span className="gold-text">Academic Coordinators</span>
        </h2>
        <p className="section-subtitle centered-max">
          Have questions regarding syllabus coverage, expert matching timelines, or institutional inquiries? Our academic coordination team is available to assist you.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Information & Channels */}
        <div className="contact-info-col">
          <div className="info-channel-card">
            <div className="channel-icon-box">
              <Mail size={22} className="gold-icon" />
            </div>
            <div>
              <h4>Official Email Inquiries</h4>
              <p>For syllabus submissions, enterprise academic partnerships, and administrative support.</p>
              <a href="mailto:inquiries@experttutors.example" className="channel-link gold-text">
                inquiries@experttutors.example
              </a>
            </div>
          </div>

          <div className="info-channel-card">
            <div className="channel-icon-box">
              <MessageSquare size={22} className="gold-icon" />
            </div>
            <div>
              <h4>Direct Academic Support Channel</h4>
              <p>Connect with a student coordination specialist for urgent matching queries and status updates.</p>
              <button
                className="channel-action-btn"
                onClick={() => alert('Official WhatsApp Support Channel: Connecting to Expert Tutors coordination desk...')}
              >
                Launch WhatsApp Coordination Desk →
              </button>
            </div>
          </div>

          <div className="info-channel-card">
            <div className="channel-icon-box">
              <Clock size={22} className="gold-icon" />
            </div>
            <div>
              <h4>Academic Coordination Hours</h4>
              <p>Monday – Saturday: 08:00 to 22:00 IST</p>
              <small className="text-secondary">Emergency problem set escalations monitored 24/7</small>
            </div>
          </div>

          <div className="contact-integrity-box">
            <Shield size={18} className="gold-icon" />
            <span>All student communications and uploaded documentation are strictly confidential and protected by privacy protocols.</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <h3>Send an Academic Enquiry</h3>

            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 size={36} className="gold-icon" />
                <h4>Enquiry Received Successfully</h4>
                <p>An academic coordinator will review your requirement and follow up within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label>
                  Your Full Name *
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya R."
                  />
                </label>

                <div className="form-row-two">
                  <label>
                    Email Address *
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. maya@university.edu"
                    />
                  </label>

                  <label>
                    Phone / WhatsApp Number
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </label>
                </div>

                <label>
                  Subject Area of Interest
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Academic Inquiry">General Academic Inquiry</option>
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.name}>{s.name} ({s.categoryName})</option>
                    ))}
                  </select>
                </label>

                <label>
                  Detailed Message / Requirement *
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your course, the specific questions or chapters you need assistance with, and any upcoming deadlines..."
                  />
                </label>

                <button type="submit" className="gold-btn full-width">
                  <span>Submit Academic Enquiry</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
