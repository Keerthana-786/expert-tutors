import React, { useState } from 'react';
import {
  FileText, UploadCloud, Calendar, Clock, CheckCircle2, MessageSquare,
  Download, ArrowRight, Shield, Plus, AlertCircle, Send, Check, UserCheck, X
} from 'lucide-react';
import { CATEGORIES, SUBJECTS, ACADEMIC_SERVICES } from '../data/mockData';

export default function StudentPortal({
  requests,
  onRequestSubmit,
  onSendMessage,
  activeStudent,
  initialNewModalOpen = false,
  onCloseNewModal,
  prefilledSubject = null,
  prefilledService = null
}) {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'new' | 'chat'
  const [selectedRequest, setSelectedRequest] = useState(requests[0] || null);
  const [chatInput, setChatInput] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(initialNewModalOpen);

  // Form State
  const [form, setForm] = useState({
    category: prefilledSubject?.categoryName || 'Engineering',
    subject: prefilledSubject?.name || 'Computer Science Engineering',
    service: prefilledService?.name || 'Assignment Guidance',
    title: '',
    description: '',
    deadline: '3 days',
    consultationMode: '1-on-1 Online Consultation',
    fileName: '',
    fileSize: '',
    budget: '₹2,000',
  });

  // Filter subjects based on chosen category
  const availableSubjects = SUBJECTS.filter((s) => s.categoryName === form.category);

  const handleCategoryChange = (catName) => {
    const subs = SUBJECTS.filter((s) => s.categoryName === catName);
    setForm({
      ...form,
      category: catName,
      subject: subs[0]?.name || '',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const newReq = {
      id: `REQ-2026-${String(Math.floor(100 + Math.random() * 900))}`,
      studentName: activeStudent?.name || 'Aarav Menon',
      studentEmail: activeStudent?.email || 'student@university.edu',
      category: form.category,
      subject: form.subject,
      service: form.service,
      title: form.title,
      description: form.description,
      deadline: form.deadline,
      consultationMode: form.consultationMode,
      status: 'New Request',
      assignedExpertId: null,
      assignedExpertName: 'Matching in Progress',
      fileName: form.fileName || 'assignment_brief.pdf',
      dateSubmitted: new Date().toISOString().split('T')[0],
      budgetEstimate: form.budget,
      messages: [
        {
          sender: 'system',
          text: `Your request has been received by Expert Tutors administration. We are currently reviewing your syllabus and matching a verified specialist in ${form.subject}.`,
          time: 'Just now',
        },
      ],
    };

    onRequestSubmit(newReq);
    setSelectedRequest(newReq);
    setIsSubmitModalOpen(false);
    onCloseNewModal?.();
    setForm({
      category: 'Engineering',
      subject: 'Computer Science Engineering',
      service: 'Assignment Guidance',
      title: '',
      description: '',
      deadline: '3 days',
      consultationMode: '1-on-1 Online Consultation',
      fileName: '',
      fileSize: '',
      budget: '₹2,000',
    });
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedRequest) return;
    onSendMessage(selectedRequest.id, chatInput.trim(), 'student');
    setChatInput('');
  };

  const statusColors = {
    'New Request': 'status-new',
    'Under Review': 'status-review',
    'Expert Matching': 'status-matching',
    'Expert Assigned': 'status-assigned',
    'Consultation Scheduled': 'status-scheduled',
    'In Progress': 'status-progress',
    'Completed': 'status-completed',
  };

  return (
    <div className="student-portal-wrapper">
      {/* Student Welcome Header & Gamification Bar */}
      <div className="portal-header-bar">
        <div>
          <div className="portal-eyebrow">
            <span className="gold-dot" />
            <span>STUDENT REQUEST & MENTORING PORTAL</span>
          </div>
          <h1 className="portal-title">
            Welcome, <span className="gold-text">{activeStudent?.name || 'Student'}</span>
          </h1>
          <p className="portal-subtitle">
            Manage your academic support briefs, track assigned specialists, and communicate directly with your mentor.
          </p>
        </div>

        <div className="portal-quick-actions">
          <button className="gold-btn" onClick={() => setIsSubmitModalOpen(true)}>
            <Plus size={16} />
            <span>Submit New Requirement</span>
          </button>
        </div>
      </div>

      {/* Gamification Bar */}
      <div className="gamification-strip">
        <div className="game-stat">
          <small>CURRENT LEVEL</small>
          <b>Academic Hero</b>
        </div>
        <div className="game-divider" />
        <div className="game-stat">
          <small>LEARNING XP</small>
          <b className="gold-text">{activeStudent?.xp || 920} XP</b>
        </div>
        <div className="game-divider" />
        <div className="game-stat">
          <small>ACTIVE STREAK</small>
          <b>🔥 {activeStudent?.streak || 5} Days</b>
        </div>
        <div className="game-divider" />
        <div className="game-stat">
          <small>ACTIVE MISSIONS</small>
          <b>{requests.length} Requests</b>
        </div>
      </div>

      {/* Portal Main Grid: Requests List & Details */}
      <div className="portal-split-layout">
        {/* Left List of Student Requests */}
        <div className="requests-list-col">
          <div className="col-header">
            <h3>Your Academic Requests ({requests.length})</h3>
          </div>

          <div className="requests-cards-stack">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`request-summary-card ${selectedRequest?.id === req.id ? 'active' : ''}`}
                onClick={() => setSelectedRequest(req)}
              >
                <div className="req-card-top">
                  <span className="req-id-badge">{req.id}</span>
                  <span className={`status-pill ${statusColors[req.status] || 'status-new'}`}>
                    {req.status}
                  </span>
                </div>
                <h4 className="req-title">{req.title}</h4>
                <p className="req-subject-meta">
                  {req.category} · <b>{req.subject}</b>
                </p>
                <div className="req-card-bottom">
                  <span><Clock size={12} /> Due: {req.deadline}</span>
                  <span className="expert-assigned-note">
                    {req.assignedExpertName !== 'Matching in Progress' ? `Mentor: ${req.assignedExpertName}` : 'Matching...'}
                  </span>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <div className="empty-requests-box">
                <FileText size={38} className="gold-icon" />
                <p>You have not submitted any academic requirements yet.</p>
                <button className="gold-btn-sm" onClick={() => setIsSubmitModalOpen(true)}>
                  Submit First Brief
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane: Active Request Overview & Chat */}
        {selectedRequest ? (
          <div className="request-detail-pane">
            <div className="detail-pane-header">
              <div>
                <span className={`status-pill ${statusColors[selectedRequest.status]}`}>
                  {selectedRequest.status}
                </span>
                <h2>{selectedRequest.title}</h2>
                <p className="detail-sub-meta">
                  ID: {selectedRequest.id} · Subject: <b>{selectedRequest.subject}</b> · Service: {selectedRequest.service}
                </p>
              </div>
              <div className="detail-price-box">
                <small>ESTIMATED BUDGET</small>
                <b>{selectedRequest.budgetEstimate}</b>
              </div>
            </div>

            {/* Workflow Progress Tracker */}
            <div className="request-progress-flow">
              {[
                'New Request',
                'Under Review',
                'Expert Assigned',
                'In Progress',
                'Completed',
              ].map((stepName, sIdx) => {
                const isCurrent = selectedRequest.status === stepName;
                const isPast = [
                  'New Request',
                  'Under Review',
                  'Expert Assigned',
                  'In Progress',
                  'Completed',
                ].indexOf(selectedRequest.status) >= sIdx;

                return (
                  <div key={stepName} className={`progress-step-node ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="step-circle">{isPast ? <Check size={11} /> : sIdx + 1}</div>
                    <span>{stepName}</span>
                  </div>
                );
              })}
            </div>

            {/* Assigned Expert Box */}
            <div className="assigned-expert-box">
              <UserCheck size={20} className="gold-icon" />
              <div>
                <b>Assigned Subject Specialist:</b>
                <span>{selectedRequest.assignedExpertName}</span>
              </div>
              <span className="consult-mode-badge">{selectedRequest.consultationMode}</span>
            </div>

            {/* Requirement Brief Content */}
            <div className="brief-content-box">
              <h4>Requirement Description & Syllabus Focus</h4>
              <p>{selectedRequest.description}</p>

              {/* Uploaded Files & Permitted Learning Resources */}
              <div className="attached-files-row">
                <div className="attached-file-item">
                  <FileText size={16} className="gold-icon" />
                  <span>Student Brief: <b>{selectedRequest.fileName}</b></span>
                  <a href="#download" onClick={(e) => { e.preventDefault(); alert(`Downloading student file: ${selectedRequest.fileName}`); }} className="file-dl-link">
                    <Download size={14} /> Download
                  </a>
                </div>

                <div className="attached-file-item guidance-doc">
                  <CheckCircle2 size={16} className="gold-icon" />
                  <span>Mentor Learning Guidance: <b>{selectedRequest.subject}_Explanatory_Notes.pdf</b></span>
                  <a href="#download" onClick={(e) => { e.preventDefault(); alert('Downloading mentor guidance notes & problem set walkthroughs.'); }} className="file-dl-link">
                    <Download size={14} /> Download Notes
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Communication with Assigned Specialist */}
            <div className="expert-communication-box">
              <div className="comm-header">
                <h4><MessageSquare size={17} className="gold-icon" /> Direct Specialist Communication</h4>
                <small>Secure academic discussion channel</small>
              </div>

              <div className="chat-messages-container">
                {selectedRequest.messages?.length > 0 ? (
                  selectedRequest.messages.map((msg, mIdx) => (
                    <div key={mIdx} className={`chat-bubble-row ${msg.sender}`}>
                      <div className="chat-bubble">
                        <small className="chat-sender-label">
                          {msg.sender === 'student' ? 'You (Student)' : msg.sender === 'system' ? 'System Operations' : selectedRequest.assignedExpertName}
                        </small>
                        <p>{msg.text}</p>
                        <span className="chat-time">{msg.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-messages-placeholder">No messages yet. Send a note to your assigned specialist below.</p>
                )}
              </div>

              <form className="chat-input-bar" onSubmit={handleSendChatMessage}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Ask a question or clarify your requirement with ${selectedRequest.assignedExpertName}...`}
                />
                <button type="submit" className="gold-btn-sm" disabled={!chatInput.trim()}>
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="no-request-selected">
            <p>Select a request from the list to view progress and mentor communications.</p>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MULTI-STEP SUBMIT REQUIREMENT MODAL                             */}
      {/* ============================================================== */}
      {isSubmitModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="requirement-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="gold-dot" />
                <h2>Submit Academic Requirement</h2>
                <p className="modal-lead">Fill in the brief details to be matched with a qualified subject specialist.</p>
              </div>
              <button className="close-modal-btn" onClick={() => setIsSubmitModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="requirement-form">
              {/* Category & Subject selection */}
              <div className="form-row-two">
                <label>
                  Academic Category
                  <select
                    value={form.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        Cat {c.code} – {c.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Specific Subject ({availableSubjects.length} available)
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    {availableSubjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Service Type & Consultation Mode */}
              <div className="form-row-two">
                <label>
                  Requested Academic Service
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    {ACADEMIC_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.name}>
                        {srv.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Consultation Mode
                  <select
                    value={form.consultationMode}
                    onChange={(e) => setForm({ ...form, consultationMode: e.target.value })}
                  >
                    <option value="1-on-1 Online Consultation">1-on-1 Online Video Consultation</option>
                    <option value="Written Guidance & Step-by-Step Proof">Written Guidance & Conceptual Walkthrough</option>
                    <option value="Ongoing Project Mentoring">Ongoing Multi-Week Project Mentoring</option>
                  </select>
                </label>
              </div>

              {/* Assignment or Project Title */}
              <label>
                Assignment / Project / Problem Title *
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Multivariable Integration and Stokes Theorem Problem Set"
                />
              </label>

              {/* Requirement Description */}
              <label>
                Detailed Requirements & Instructions *
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your syllabus, specific problems, rubric expectations, and what concepts you need help understanding..."
                />
              </label>

              {/* File Attachment & Deadline */}
              <div className="form-row-two">
                <label>
                  Preferred Deadline
                  <select
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  >
                    <option value="24 Hours (Urgent)">24 Hours (Urgent)</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                  </select>
                </label>

                <label>
                  Estimated Budget (INR)
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="e.g. ₹2,000"
                  />
                </label>
              </div>

              {/* File Upload Box */}
              <label className="file-drop-zone">
                <UploadCloud size={28} className="gold-icon" />
                <div className="drop-zone-text">
                  <b>{form.fileName ? form.fileName : 'Upload assignment brief, problem set, or syllabus'}</b>
                  <small>Supports PDF, DOCX, PPTX, ZIP, PNG, JPG (up to 50MB)</small>
                </div>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.pptx,.ppt,.zip,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </label>

              <div className="modal-integrity-note">
                <Shield size={14} className="gold-icon" />
                <small>
                  Academic Integrity Notice: Guidance provided is for tutoring, conceptual feedback, and educational support.
                </small>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="ghost-btn" onClick={() => setIsSubmitModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="gold-btn">
                  <span>Confirm & Submit Brief</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
