import React from 'react';
import { FileUp, Users, MessageSquare, Trophy, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onStartMission }) {
  const steps = [
    {
      num: '01',
      title: 'Submit Your Requirement',
      desc: 'Select your subject, describe your academic requirement, provide your preferred deadline, and upload relevant assignment or syllabus files.',
      icon: <FileUp size={28} />,
    },
    {
      num: '02',
      title: 'Expert Matching',
      desc: 'Our academic coordination team reviews your submission and precisely matches it with a qualified subject specialist from our network of 40+ scholars.',
      icon: <Users size={28} />,
    },
    {
      num: '03',
      title: 'Connect With Your Expert',
      desc: 'Receive direct confirmation, review your assigned mentor’s background, and access direct communication to align on learning objectives.',
      icon: <MessageSquare size={28} />,
    },
    {
      num: '04',
      title: 'Learn And Achieve',
      desc: 'Engage in 1-on-1 consultations, receive structured problem-solving explanations and feedback, and gain the confidence to excel academically.',
      icon: <Trophy size={28} />,
    },
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>STRUCTURED 4-STEP PROCESS</span>
        </div>
        <h2 className="section-title">
          How Expert Tutors <span className="gold-text">Delivers Excellence</span>
        </h2>
        <p className="section-subtitle centered-max">
          A transparent, professional workflow connecting students with verified subject specialists for personalized academic support.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-connector-bar" />
        <div className="timeline-steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="timeline-step-card">
              <div className="timeline-node">
                <span className="step-num-badge">{step.num}</span>
                <div className="step-icon-wrap">{step.icon}</div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="how-it-works-cta text-center">
        <button className="gold-btn" onClick={onStartMission}>
          <span>Submit Your Requirement Now</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
