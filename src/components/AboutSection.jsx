import React from 'react';
import { Award, ShieldCheck, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onExploreSubjects, onContactUs }) {
  return (
    <section className="about-section" id="about-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>ABOUT EXPERT TUTORS · ACADEMIC NETWORK</span>
        </div>
        <h2 className="section-title">
          Built on Trust, Rigor, and <span className="gold-text">Academic Mentorship</span>
        </h2>
        <p className="section-subtitle centered-max">
          Expert Tutors operates as a managed academic support service connecting ambitious learners with an elite network of over 40 vetted scholars and subject specialists.
        </p>
      </div>

      <div className="about-two-col-grid">
        <div className="about-story-col">
          <h3>Empowering Higher Education Through Personalized Mentoring</h3>
          <p>
            Higher education presents complex, rigorous challenges across engineering mathematics, theoretical science, clinical foundations, corporate finance, and comparative jurisprudence. Students frequently find standard lecture formats insufficient when tackling advanced problem sets or capstone investigations.
          </p>
          <p>
            Expert Tutors bridges this gap by functioning as a bespoke academic expert network. When a student submits an assignment brief or conceptual hurdle, our operations team identifies and assigns a qualified specialist whose doctoral or master's research directly encompasses the requested subject matter.
          </p>

          <div className="about-pillars-stack">
            <div className="pillar-item">
              <CheckCircle2 size={18} className="gold-icon" />
              <div>
                <b>Human-Managed Specialist Matching:</b>
                <span>We do not rely on automated guessing; every requirement is matched by experienced academic coordinators.</span>
              </div>
            </div>
            <div className="pillar-item">
              <CheckCircle2 size={18} className="gold-icon" />
              <div>
                <b>Rigorous Doctoral & Master's Credential Audits:</b>
                <span>Every expert in our network undergoes multi-tiered degree verification before entering rotation.</span>
              </div>
            </div>
            <div className="pillar-item">
              <CheckCircle2 size={18} className="gold-icon" />
              <div>
                <b>Strict Academic Integrity Adherence:</b>
                <span>We provide tutoring, explanation, and research guidance — never taking exams or submitting proxy work.</span>
              </div>
            </div>
          </div>

          <div className="about-actions-row">
            <button className="gold-btn" onClick={onExploreSubjects}>
              Explore Subjects
            </button>
            <button className="ghost-btn" onClick={onContactUs}>
              Contact Coordination Team
            </button>
          </div>
        </div>

        <div className="about-stats-graphic-col">
          <div className="about-card-stat">
            <b className="stat-large">40<span className="gold-text">+</span></b>
            <h4>Qualified Academic Experts</h4>
            <p>Subject specialists across 23 distinct academic disciplines.</p>
          </div>

          <div className="about-card-stat">
            <b className="stat-large">62<span className="gold-text">%</span></b>
            <h4>Ph.D. Qualified Specialists</h4>
            <p>Active doctoral researchers and university faculty fellows.</p>
          </div>

          <div className="about-card-stat">
            <b className="stat-large">100<span className="gold-text">%</span></b>
            <h4>Confidential & Managed Service</h4>
            <p>Protected document transfer and ethical academic support.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
