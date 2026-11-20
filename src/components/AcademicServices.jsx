import React from 'react';
import {
  BookOpen, Calculator, Cpu, Code2, Search, FileText,
  Presentation, GraduationCap, BarChart, TrendingUp, HeartPulse, Scale,
  ShieldCheck, ArrowRight
} from 'lucide-react';
import { ACADEMIC_SERVICES } from '../data/mockData';

// Icon mapping
const ICON_MAP = {
  BookOpen: <BookOpen />,
  Calculator: <Calculator />,
  Cpu: <Cpu />,
  Code2: <Code2 />,
  Search: <Search />,
  FileText: <FileText />,
  Presentation: <Presentation />,
  GraduationCap: <GraduationCap />,
  BarChart: <BarChart />,
  TrendingUp: <TrendingUp />,
  HeartPulse: <HeartPulse />,
  Scale: <Scale />,
};

export default function AcademicServices({ onRequestService }) {
  return (
    <section className="services-section" id="services-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>MANAGED ACADEMIC SUPPORT</span>
        </div>
        <h2 className="section-title">
          Our Academic <span className="gold-text">Support Services</span>
        </h2>
        <p className="section-subtitle centered-max">
          Comprehensive, ethical mentoring and subject guidance designed to help learners understand complex curriculum requirements and master problem sets.
        </p>
      </div>

      {/* 12 Academic Services Grid */}
      <div className="services-grid-12">
        {ACADEMIC_SERVICES.map((srv, idx) => (
          <div key={srv.id} className="service-card">
            <div className="service-card-top">
              <span className="service-number">0{idx + 1}</span>
              <div className="service-icon-box">
                {ICON_MAP[srv.icon] || <BookOpen />}
              </div>
            </div>

            <h3 className="service-name">{srv.name}</h3>
            <p className="service-desc">{srv.shortDesc}</p>

            <div className="service-coverage-box">
              <small className="coverage-label">SUBJECTS COVERED</small>
              <span className="coverage-text">{srv.subjectsCovered}</span>
            </div>

            <button
              className="request-service-btn"
              onClick={() => onRequestService(srv)}
            >
              <span>Request Service</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Prominent Academic Integrity Statement */}
      <div className="academic-integrity-banner">
        <div className="integrity-icon-col">
          <ShieldCheck size={36} className="gold-icon" />
        </div>
        <div className="integrity-content-col">
          <h4>Platform Academic Integrity Standard</h4>
          <p>
            Expert Tutors operates strictly as an educational support service, tutoring platform, and academic mentoring network.
            Our specialists provide conceptual tutoring, problem-solving explanations, research methodology assistance, and analytical feedback.
            In strict compliance with global institutional standards, we do not complete graded examinations or submit assessed work on behalf of students.
          </p>
        </div>
      </div>
    </section>
  );
}
