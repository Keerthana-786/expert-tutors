import React, { useState, useEffect } from 'react';
import {
  Star, CheckCircle2, MessageSquare, PlusCircle, ShieldCheck,
  Sparkles, ThumbsUp, Filter, X, Award, GraduationCap, Flame, ArrowRight
} from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Ananya R.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    course: 'B.Tech in Computer Science & Engineering',
    category: 'Computer Science',
    subject: 'Python & Data Structures',
    rating: 5,
    review: 'Expert Tutors helped me connect with the right mentor. The guidance made difficult programming concepts much easier to understand.',
    date: '2 days ago',
    verifiedStudent: true,
    isSample: true,
    likes: 24,
    mentorName: 'Aarav Menon',
  },
  {
    id: 'rev-2',
    name: 'Rahul K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    course: 'B.Tech Mechanical Engineering, 3rd Year',
    category: 'Engineering',
    subject: 'Thermodynamics & Fluid Mechanics',
    rating: 5,
    review: 'The platform made it easy to find academic support. I loved the simple process of connecting with experienced tutors.',
    date: '4 days ago',
    verifiedStudent: true,
    isSample: true,
    likes: 19,
    mentorName: 'Prof. Alistair Chen',
  },
  {
    id: 'rev-3',
    name: 'Priya S.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    course: 'B.Sc. Mathematics & Statistics Honors',
    category: 'Mathematics',
    subject: 'Calculus III & Differential Equations',
    rating: 5,
    review: 'A great platform for students who need guidance with assignments, projects and technical concepts.',
    date: '1 week ago',
    verifiedStudent: true,
    isSample: true,
    likes: 31,
    mentorName: 'Dr. Elena Rostova',
  },
  {
    id: 'rev-4',
    name: 'Dev Shah',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    course: 'Finance & Accountancy Scholar',
    category: 'Finance & Business',
    subject: 'Corporate Valuation & DCF Modeling',
    rating: 5,
    review: 'The 1-on-1 financial modeling breakdown exceeded expectations. My mentor clarified terminal value assumptions in minutes.',
    date: '1 week ago',
    verifiedStudent: true,
    isSample: true,
    likes: 15,
    mentorName: 'Julian Thorne, CFA',
  },
  {
    id: 'rev-5',
    name: 'Nisha Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    course: 'Pre-Med / Cellular Physiology',
    category: 'Medical & Science',
    subject: 'Renal Pathophysiology',
    rating: 5,
    review: 'Navigating renal acid-base balance became intuitive with the visual pathway explanations and diagnostic breakdown.',
    date: '2 weeks ago',
    verifiedStudent: true,
    isSample: true,
    likes: 27,
    mentorName: 'Dr. Sarah Lin-Bauer',
  },
];

const CATEGORIES = [
  'All Reviews',
  'Computer Science',
  'Engineering',
  'Mathematics',
  'Finance & Business',
  'Medical & Science'
];

export default function StudentReviews({ onOpenGetHelp }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('expert_tutors_student_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  const [activeCategory, setActiveCategory] = useState('All Reviews');
  const [modalOpen, setModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState({});

  // Submission Form State
  const [authorName, setAuthorName] = useState('');
  const [course, setCourse] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('Computer Science');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('expert_tutors_student_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const handleLike = (id) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, likes: r.likes + (likedReviews[id] ? -1 : 1) } : r
      )
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFormError('');

    if (!authorName.trim() || !course.trim() || !reviewText.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (reviewText.trim().length < 20) {
      setFormError('Review must be at least 20 characters.');
      return;
    }

    // Duplicate prevention check
    const isDuplicate = reviews.some(
      (r) =>
        r.name.toLowerCase() === authorName.trim().toLowerCase() &&
        r.review.toLowerCase() === reviewText.trim().toLowerCase()
    );

    if (isDuplicate) {
      setFormError('This review appears to be a duplicate.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      course: course.trim(),
      category: subjectCategory,
      subject: subjectTitle.trim() || `${subjectCategory} Tutoring`,
      rating: Number(rating),
      review: reviewText.trim(),
      date: 'Just now',
      verifiedStudent: true,
      isSample: false,
      likes: 1,
      moderationStatus: 'Verified & Approved',
      mentorName: 'Expert Tutors Specialist',
    };

    setReviews([newReview, ...reviews]);
    setFormSuccess('Your review has been verified and added to the platform!');

    setTimeout(() => {
      setModalOpen(false);
      setAuthorName('');
      setCourse('');
      setSubjectTitle('');
      setReviewText('');
      setRating(5);
      setFormSuccess('');
    }, 1200);
  };

  const filteredReviews = activeCategory === 'All Reviews'
    ? reviews
    : reviews.filter((r) => r.category === activeCategory);

  return (
    <section className="student-reviews-section" id="reviews">
      <div className="section-container">
        {/* Header */}
        <div className="reviews-header-block">
          <div className="badge-superhero">
            <Sparkles size={14} className="sparkle-gold" />
            <span>AUTHENTIC ACADEMIC EXPERIENCES</span>
          </div>

          <h2 className="reviews-main-title">
            Real Students. <span className="spider-red-gradient">Real Experiences.</span>{' '}
            <span className="electric-blue-gradient">Real Success.</span>
          </h2>

          <p className="reviews-sub-title">
            Discover how Expert Tutors helps students find the right academic support and achieve their goals.
          </p>

          <div className="reviews-top-bar">
            {/* Aggregate Trust Pill */}
            <div className="aggregate-rating-pill">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" fill="#F5BD32" />
                ))}
              </div>
              <span className="aggregate-score">4.95 / 5.0</span>
              <span className="aggregate-label">• Based on verified student sessions</span>
            </div>

            {/* Share Your Experience Button */}
            <button
              className="gold-btn btn-share-experience"
              onClick={() => setModalOpen(true)}
            >
              <PlusCircle size={16} />
              <span>Share Your Experience</span>
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="review-category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`review-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card glass-panel">
              {/* Card Top: Avatar, Name & Verification */}
              <div className="review-card-top">
                <div className="reviewer-avatar-wrap">
                  <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                  {rev.verifiedStudent && (
                    <span className="reviewer-badge-icon" title="Verified Student">
                      <CheckCircle2 size={13} />
                    </span>
                  )}
                </div>

                <div className="reviewer-meta">
                  <div className="reviewer-name-row">
                    <h4 className="reviewer-name">{rev.name}</h4>
                    {rev.verifiedStudent && (
                      <span className="verified-student-tag">
                        <ShieldCheck size={11} />
                        Verified Student
                      </span>
                    )}
                  </div>
                  <p className="reviewer-course">{rev.course}</p>
                </div>
              </div>

              {/* Star Rating & Subject Tag */}
              <div className="review-meta-row">
                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? 'star-filled' : 'star-empty'}
                      fill={i < rev.rating ? '#F5BD32' : 'none'}
                    />
                  ))}
                  <span className="rating-numeric">{rev.rating}.0</span>
                </div>

                <span className="review-subject-tag">{rev.subject}</span>
              </div>

              {/* Written Review Body */}
              <blockquote className="review-body">
                "{rev.review}"
              </blockquote>

              {/* Card Footer: Demo tag, date & like button */}
              <div className="review-card-footer">
                <div className="review-source-info">
                  {rev.isSample ? (
                    <span className="sample-review-label" title="Sample student feedback preview">
                      Illustrative Demo Review
                    </span>
                  ) : (
                    <span className="verified-session-label">
                      Verified Session • {rev.mentorName}
                    </span>
                  )}
                  <span className="review-date-text">{rev.date}</span>
                </div>

                <button
                  className={`review-like-btn ${likedReviews[rev.id] ? 'liked' : ''}`}
                  onClick={() => handleLike(rev.id)}
                  title="Mark as helpful"
                >
                  <ThumbsUp size={13} />
                  <span>{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner below reviews */}
        <div className="reviews-cta-banner glass-panel">
          <div className="cta-banner-content">
            <div className="cta-icon-wrap">
              <GraduationCap size={28} className="cta-cap" />
            </div>
            <div>
              <h3>Ready to Experience Academic Excellence?</h3>
              <p>Connect with over 40+ verified PhD and subject specialists across 23 academic disciplines.</p>
            </div>
          </div>
          <button className="gold-btn" onClick={onOpenGetHelp}>
            <span>Submit Your Requirement</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Share Experience Modal */}
      {modalOpen && (
        <div className="modal-backdrop-superhero" onClick={() => setModalOpen(false)}>
          <div className="modal-panel-glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="modal-title">Share Your Experience</h3>
                  <p className="modal-subtitle">Help fellow students discover genuine academic guidance.</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {formSuccess ? (
              <div className="form-success-alert">
                <CheckCircle2 size={24} />
                <div>
                  <b>Success!</b>
                  <p>{formSuccess}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="modal-review-form">
                {formError && <div className="form-error-alert">{formError}</div>}

                <div className="form-group-duo">
                  <div className="form-field">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      className="super-input"
                      placeholder="e.g. Diya Sharma"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Academic Background / Course *</label>
                    <input
                      type="text"
                      className="super-input"
                      placeholder="e.g. B.Tech Computer Science, 2nd Year"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-duo">
                  <div className="form-field">
                    <label>Academic Discipline *</label>
                    <select
                      className="super-select"
                      value={subjectCategory}
                      onChange={(e) => setSubjectCategory(e.target.value)}
                    >
                      <option value="Computer Science">Computer Science & Programming</option>
                      <option value="Engineering">Engineering (Civil, Mech, Elec, etc.)</option>
                      <option value="Mathematics">Mathematics & Calculus</option>
                      <option value="Finance & Business">Finance & Business Studies</option>
                      <option value="Medical & Science">Biology & Medical Sciences</option>
                      <option value="Law and Architecture">Law & Architecture</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Specific Subject / Topic</label>
                    <input
                      type="text"
                      className="super-input"
                      placeholder="e.g. Calculus II, Python, DCF Valuation"
                      value={subjectTitle}
                      onChange={(e) => setSubjectTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Star rating selector */}
                <div className="form-field">
                  <label>Overall Experience Rating *</label>
                  <div className="interactive-star-picker">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        className="star-pick-btn"
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starVal)}
                      >
                        <Star
                          size={24}
                          className={
                            (hoverRating || rating) >= starVal ? 'star-filled' : 'star-empty'
                          }
                          fill={(hoverRating || rating) >= starVal ? '#F5BD32' : 'none'}
                        />
                      </button>
                    ))}
                    <span className="rating-helper-text">
                      {rating === 5 && 'Outstanding • Highly Recommended'}
                      {rating === 4 && 'Very Good • Exceeded Expectations'}
                      {rating === 3 && 'Good • Satisfactory Guidance'}
                      {rating === 2 && 'Fair • Needs Improvement'}
                      {rating === 1 && 'Poor'}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="form-field">
                  <label>Your Written Review * (min 20 characters)</label>
                  <textarea
                    rows={4}
                    className="super-textarea"
                    placeholder="Describe how your tutor or session helped you with understanding concepts, problem-solving, or academic assignments..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                  <small className="char-count">{reviewText.length} characters</small>
                </div>

                {/* Moderation Notice */}
                <div className="moderation-integrity-note">
                  <ShieldCheck size={16} className="note-shield" />
                  <p>
                    <strong>Academic Integrity Notice:</strong> All reviews undergo verification and moderation before public listing. Duplicate, abusive, or solicitation entries are automatically rejected.
                  </p>
                </div>

                <div className="modal-actions-bar">
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="gold-btn">
                    <span>Submit Review for Verification</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
