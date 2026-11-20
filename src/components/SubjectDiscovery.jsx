import React, { useState, useMemo } from 'react';
import {
  Search, Filter, ArrowRight, UserCheck, BookOpen, Layers,
  ChevronRight, Award, GraduationCap, X, CheckCircle, Shield
} from 'lucide-react';
import { CATEGORIES, SUBJECTS, ACADEMIC_SERVICES } from '../data/mockData';

export default function SubjectDiscovery({ experts, onRequestSubject, onSelectExpert }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalSubject, setActiveModalSubject] = useState(null);

  // Filter subjects based on category & search
  const filteredSubjects = useMemo(() => {
    return SUBJECTS.filter((sub) => {
      const matchesCat = selectedCat === 'all' || sub.categoryId === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        sub.name.toLowerCase().includes(q) ||
        sub.categoryName.toLowerCase().includes(q) ||
        sub.tagline.toLowerCase().includes(q) ||
        sub.popularTopics.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  // Find experts matched to a specific subject
  const getSubjectExperts = (subjectName) => {
    return experts.filter(
      (exp) =>
        exp.primarySubject.toLowerCase() === subjectName.toLowerCase() ||
        exp.subjectSpecialization.toLowerCase().includes(subjectName.toLowerCase())
    );
  };

  return (
    <section className="subjects-section" id="subjects-section">
      <div className="section-header-wrap">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>ACADEMIC DISCIPLINES · PINTEREST-INSPIRED DISCOVERY</span>
        </div>
        <h2 className="section-title">
          Explore Our <span className="gold-text">Academic Subjects</span>
        </h2>
        <p className="section-subtitle">
          Organized across 5 specialized faculties. Connect directly with PhD researchers, engineers, mathematicians, and professional practitioners.
        </p>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="subjects-controls-bar">
        <div className="subject-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, calculus, thermodynamics, legal briefing, algorithms..."
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="category-pills-row">
          <button
            className={`category-pill ${selectedCat === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            All Subjects ({SUBJECTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              Cat {cat.code}: {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      <div className="pinterest-masonry-grid">
        {filteredSubjects.map((sub) => {
          const matchedExperts = getSubjectExperts(sub.name);
          return (
            <div key={sub.id} className="pinterest-card">
              <div className="card-top-tag">
                <span className="cat-badge">{sub.categoryName}</span>
                <span className="experts-count-badge">
                  <UserCheck size={12} />
                  <span>{sub.expertCount} Experts</span>
                </span>
              </div>

              <div className="subject-card-header">
                <h3 className="subject-name">{sub.name}</h3>
                <p className="subject-tagline">{sub.tagline}</p>
              </div>

              <p className="subject-desc">{sub.description}</p>

              {/* Popular Topic Tags */}
              <div className="topic-tags">
                {sub.popularTopics.map((topic) => (
                  <span key={topic} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>

              {/* Card Actions */}
              <div className="subject-card-footer">
                <button
                  className="explore-experts-btn"
                  onClick={() => setActiveModalSubject(sub)}
                >
                  <span>Explore Experts</span>
                  <ChevronRight size={15} />
                </button>
                <button
                  className="request-help-btn"
                  onClick={() => onRequestSubject(sub)}
                >
                  <span>Request Help</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="empty-search-state">
          <BookOpen size={44} className="empty-icon" />
          <h3>No subjects matched "{searchQuery}"</h3>
          <p>Try searching for a broader term like Mathematics, Engineering, or Law.</p>
          <button className="gold-btn" onClick={() => { setSearchQuery(''); setSelectedCat('all'); }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* DEDICATED SUBJECT DETAIL MODAL */}
      {activeModalSubject && (
        <div className="modal-backdrop" onClick={() => setActiveModalSubject(null)}>
          <div className="subject-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="cat-badge">{activeModalSubject.categoryName}</span>
                <h2>{activeModalSubject.name} Specialist Network</h2>
              </div>
              <button className="close-modal-btn" onClick={() => setActiveModalSubject(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="subject-overview-banner">
                <p><b>Overview:</b> {activeModalSubject.description}</p>
                <div className="topic-tags" style={{ marginTop: '10px' }}>
                  {activeModalSubject.popularTopics.map((t) => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
              </div>

              <h4 className="modal-subheading">
                <GraduationCap size={18} className="gold-icon" />
                <span>Available Subject Specialists ({getSubjectExperts(activeModalSubject.name).length})</span>
              </h4>

              <div className="modal-experts-list">
                {getSubjectExperts(activeModalSubject.name).length > 0 ? (
                  getSubjectExperts(activeModalSubject.name).map((exp) => (
                    <div key={exp.id} className="modal-expert-item">
                      <img src={exp.avatar} alt={exp.name} className="expert-avatar-sm" />
                      <div className="expert-item-info">
                        <div className="expert-name-row">
                          <b>{exp.name}</b>
                          {exp.hasPhd && <span className="phd-badge-sm">PhD Verified</span>}
                        </div>
                        <p className="qualification-text">{exp.qualification}</p>
                        <p className="specialization-text">{exp.subjectSpecialization}</p>
                      </div>
                      <button
                        className="consult-mini-btn"
                        onClick={() => {
                          setActiveModalSubject(null);
                          onSelectExpert(exp);
                        }}
                      >
                        Book
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary" style={{ padding: '12px 0' }}>
                    Qualified specialists are currently on rotation. Click "Request Help" to be matched immediately with our next available specialist in {activeModalSubject.name}.
                  </p>
                )}
              </div>

              <h4 className="modal-subheading" style={{ marginTop: '24px' }}>
                <Layers size={18} className="gold-icon" />
                <span>Recommended Academic Support for {activeModalSubject.name}</span>
              </h4>
              <div className="modal-services-preview">
                {ACADEMIC_SERVICES.slice(0, 4).map((srv) => (
                  <div key={srv.id} className="service-preview-pill">
                    <CheckCircle size={14} className="gold-icon" />
                    <span>{srv.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="gold-btn full-width"
                onClick={() => {
                  const sub = activeModalSubject;
                  setActiveModalSubject(null);
                  onRequestSubject(sub);
                }}
              >
                <span>Submit Academic Request in {activeModalSubject.name}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
