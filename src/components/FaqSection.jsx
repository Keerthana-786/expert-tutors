import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-section" id="faq-section">
      <div className="section-header-wrap text-center">
        <div className="section-eyebrow">
          <span className="gold-dot" />
          <span>CLARITY & ASSURANCE</span>
        </div>
        <h2 className="section-title">
          Frequently Asked <span className="gold-text">Questions</span>
        </h2>
        <p className="section-subtitle centered-max">
          Everything you need to know about expert matching, credential audits, consultation logistics, and our academic integrity standards.
        </p>
      </div>

      <div className="faq-accordion-wrap">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className={`faq-item-card ${openIdx === idx ? 'expanded' : ''}`}
            onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
          >
            <div className="faq-question-row">
              <h3>{faq.q}</h3>
              <ChevronDown size={18} className={`faq-chevron ${openIdx === idx ? 'rotate' : ''}`} />
            </div>
            {openIdx === idx && (
              <div className="faq-answer-content">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
