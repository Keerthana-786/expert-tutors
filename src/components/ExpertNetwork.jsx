import React, { useState, useMemo } from 'react';
import {
  Award, CheckCircle2, ShieldCheck, Globe, Calendar, ArrowRight,
  Filter, Search, Clock, GraduationCap, X, Mail, Star
} from 'lucide-react';
import { SUBJECTS } from '../data/mockData';

export default function ExpertNetwork({ experts, onBookConsultation }) {
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [qualificationFilter, setQualificationFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertModal, setSelectedExpertModal] = useState(null);

  // Filter experts
  const filteredExperts = useMemo(() => {
    return experts.filter((exp) => {
      const matchesSearch =
        !searchQuery ||
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.subjectSpecialization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        subjectFilter === 'All' ||
        exp.primarySubject.toLowerCase() === subjectFilter.toLowerCase() ||
        exp.subjectSpecialization.toLowerCase().includes(subjectFilter.toLowerCase());

      const matchesQual =
        qualificationFilter === 'All' ||
        (qualificationFilter === 'PhD' && exp.hasPhd) ||
        (qualificationFilter === 'Verified' && exp.isVerified);

      const matchesAvail =
        availabilityFilter === 'All' ||
        exp.availability.toLowerCase().includes(availabilityFilter.toLowerCase());

      return matchesSearch && matchesSubject && matchesQual && matchesAvail;
    });
  }, [experts, searchQuery, subjectFilter, qualificationFilter, availabilityFilter]);

  return (
    <section className="experts-section" id="experts-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>VERIFIED SCHOLARS & SUBJECT SPECIALISTS</span>
        </div>
        <h2 className="section-title">
          Meet the Minds <span className="gold-text">Behind Your Success.</span>
        </h2>
        <p className="section-subtitle centered-max">
          With a network of more than 40 highly qualified academic experts, we connect students with subject specialists across multiple academic disciplines.
        </p>
      </div>

      {/* Network Trust Highlights */}
      <div className="experts-highlight-grid">
        <div className="highlight-box">
          <div className="highlight-icon-wrap">
            <GraduationCap size={24} className="gold-icon" />
          </div>
          <div>
            <h4>40+ Academic Experts</h4>
            <p>Spanning Science, Engineering, Medicine, Finance & Law</p>
          </div>
        </div>
        <div className="highlight-box">
          <div className="highlight-icon-wrap">
            <Award size={24} className="gold-icon" />
          </div>
          <div>
            <h4>Verified PhD Qualifications</h4>
            <p>Rigorous credential auditing by our academic management</p>
          </div>
        </div>
        <div className="highlight-box">
          <div className="highlight-icon-wrap">
            <ShieldCheck size={24} className="gold-icon" />
          </div>
          <div>
            <h4>Personalized Expert Matching</h4>
            <p>Every request is manually reviewed for precise specialist alignment</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="experts-filter-bar">
        <div className="expert-search-field">
          <Search size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experts by name, specialty, or subject..."
          />
        </div>

        <div className="filter-dropdowns">
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option value="All">All Subjects (23)</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>

          <select value={qualificationFilter} onChange={(e) => setQualificationFilter(e.target.value)}>
            <option value="All">All Qualifications</option>
            <option value="PhD">PhD Verified Only</option>
            <option value="Verified">Credential Verified</option>
          </select>

          <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
            <option value="All">All Availability</option>
            <option value="Today">Available Today</option>
            <option value="Tomorrow">Available Tomorrow</option>
          </select>
        </div>
      </div>

      {/* Expert Cards Grid */}
      <div className="experts-cards-grid">
        {filteredExperts.map((exp) => (
          <div key={exp.id} className="expert-profile-card">
            <div className="expert-card-top">
              <div className="avatar-wrapper">
                <img src={exp.avatar} alt={exp.name} className="expert-profile-photo" />
                {exp.hasPhd && exp.isVerified && (
                  <span className="phd-seal-badge" title="Verified PhD Degree">
                    PhD
                  </span>
                )}
              </div>

              <div className="expert-main-meta">
                <div className="name-verified-row">
                  <h3 className="expert-name">{exp.name}</h3>
                  {exp.isVerified && (
                    <span className="verified-check" title="Academic Credentials Verified">
                      <ShieldCheck size={16} />
                    </span>
                  )}
                </div>
                <p className="expert-degree">{exp.qualification}</p>
                <span className="primary-subject-chip">{exp.primarySubject}</span>
              </div>
            </div>

            {/* Specialization & Bio */}
            <div className="expert-card-body">
              <div className="info-row">
                <span className="info-label">Specialization:</span>
                <span className="info-value">{exp.subjectSpecialization}</span>
              </div>
              <p className="expert-bio">{exp.bio}</p>
            </div>

            {/* Experience, Languages & Availability */}
            <div className="expert-meta-strip">
              <div className="meta-item">
                <Clock size={13} className="gold-icon" />
                <span>{exp.experienceYears} Years Verified Exp.</span>
              </div>
              <div className="meta-item">
                <Globe size={13} className="gold-icon" />
                <span>{exp.languages.join(', ')}</span>
              </div>
              <div className="meta-item">
                <span className="availability-dot" />
                <span className="availability-text">{exp.availability}</span>
              </div>
            </div>

            {/* Action */}
            <div className="expert-card-action">
              <button
                className="consult-btn"
                onClick={() => setSelectedExpertModal(exp)}
              >
                <span>Request Consultation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: EXPERT CONSULTATION DETAILS */}
      {selectedExpertModal && (
        <div className="modal-backdrop" onClick={() => setSelectedExpertModal(null)}>
          <div className="expert-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-profile">
                <img src={selectedExpertModal.avatar} alt={selectedExpertModal.name} className="expert-modal-avatar" />
                <div>
                  <div className="name-verified-row">
                    <h3>{selectedExpertModal.name}</h3>
                    {selectedExpertModal.hasPhd && <span className="phd-badge-sm">PhD Verified</span>}
                  </div>
                  <p className="expert-degree">{selectedExpertModal.qualification}</p>
                  <span className="availability-pill">{selectedExpertModal.availability}</span>
                </div>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedExpertModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="expert-full-details">
                <h4>Subject Specialization</h4>
                <p>{selectedExpertModal.subjectSpecialization}</p>

                <h4>Academic Background & Mentoring Overview</h4>
                <p>{selectedExpertModal.bio}</p>

                <div className="modal-stats-row">
                  <div>
                    <small>VERIFIED EXPERIENCE</small>
                    <b>{selectedExpertModal.experienceYears} Years</b>
                  </div>
                  <div>
                    <small>CONSULTATIONS COMPLETED</small>
                    <b>{selectedExpertModal.consultationsCompleted}+</b>
                  </div>
                  <div>
                    <small>LANGUAGES</small>
                    <b>{selectedExpertModal.languages.join(', ')}</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="gold-btn full-width"
                onClick={() => {
                  const exp = selectedExpertModal;
                  setSelectedExpertModal(null);
                  onBookConsultation(exp);
                }}
              >
                <span>Book 1-on-1 Academic Session with {selectedExpertModal.name}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
