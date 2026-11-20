import React, { useState } from 'react';
import {
  Award, ShieldCheck, Clock, CheckCircle2, XCircle, Calendar,
  MessageSquare, UploadCloud, DollarSign, FileText, Send, User, Download, Plus
} from 'lucide-react';

export default function ExpertDashboard({
  currentExpert,
  assignedRequests,
  onAcceptRequest,
  onDeclineRequest,
  onSendExpertMessage,
  onUploadGuidanceDocument,
}) {
  const [activeTab, setActiveTab] = useState('assignments'); // 'assignments' | 'schedule' | 'earnings' | 'profile'
  const [selectedReq, setSelectedReq] = useState(assignedRequests[0] || null);
  const [chatInput, setChatInput] = useState('');
  const [uploadedMaterialName, setUploadedMaterialName] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedReq) return;
    onSendExpertMessage(selectedReq.id, chatInput.trim());
    setChatInput('');
  };

  const handleUploadNotes = (e) => {
    e.preventDefault();
    if (!uploadedMaterialName.trim() || !selectedReq) return;
    onUploadGuidanceDocument(selectedReq.id, uploadedMaterialName.trim());
    alert(`Learning material "${uploadedMaterialName}" uploaded for student.`);
    setUploadedMaterialName('');
  };

  return (
    <div className="expert-dashboard-container">
      {/* Top Banner */}
      <div className="expert-top-bar">
        <div className="expert-header-profile">
          <img src={currentExpert.avatar} alt={currentExpert.name} className="expert-dash-avatar" />
          <div>
            <div className="name-verified-row">
              <h1 className="expert-dash-name">{currentExpert.name}</h1>
              {currentExpert.hasPhd && <span className="phd-badge-sm">PhD Verified</span>}
              {currentExpert.isVerified && <span className="verified-check"><ShieldCheck size={17} /></span>}
            </div>
            <p className="expert-dash-title">{currentExpert.qualification} · <b>{currentExpert.primarySubject}</b></p>
          </div>
        </div>

        <div className="expert-quick-stats">
          <div className="quick-stat">
            <small>ASSIGNED MISSIONS</small>
            <b className="gold-text">{assignedRequests.length}</b>
          </div>
          <div className="quick-stat">
            <small>COMPLETED SESSIONS</small>
            <b>{currentExpert.consultationsCompleted}</b>
          </div>
          <div className="quick-stat">
            <small>VERIFIED STATUS</small>
            <b style={{ color: '#4ade80' }}>Active Scholar</b>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="expert-tabs-bar">
        <button
          className={`expert-tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          Assigned Student Missions ({assignedRequests.length})
        </button>
        <button
          className={`expert-tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Consultation Schedule & Calendar
        </button>
        <button
          className={`expert-tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings & Payment History
        </button>
        <button
          className={`expert-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Credential & Verification Profile
        </button>
      </div>

      {/* TAB: ASSIGNED REQUESTS */}
      {activeTab === 'assignments' && (
        <div className="expert-split-layout">
          {/* List of assignments */}
          <div className="expert-assignments-list">
            <h4>Assigned Inquiries</h4>
            {assignedRequests.map((req) => (
              <div
                key={req.id}
                className={`expert-assignment-card ${selectedReq?.id === req.id ? 'active' : ''}`}
                onClick={() => setSelectedReq(req)}
              >
                <div className="card-top-status">
                  <span className="code-badge">{req.id}</span>
                  <span className="status-pill status-assigned">{req.status}</span>
                </div>
                <h5>{req.title}</h5>
                <p className="student-meta">Student: <b>{req.studentName}</b></p>
                <small className="deadline-text"><Clock size={12} /> Due: {req.deadline}</small>

                {req.status === 'Expert Assigned' && (
                  <div className="accept-decline-row" onClick={(e) => e.stopPropagation()}>
                    <button className="accept-btn" onClick={() => onAcceptRequest(req.id)}>
                      <CheckCircle2 size={13} /> Accept
                    </button>
                    <button className="decline-btn" onClick={() => onDeclineRequest(req.id)}>
                      <XCircle size={13} /> Decline
                    </button>
                  </div>
                )}
              </div>
            ))}

            {assignedRequests.length === 0 && (
              <div className="empty-box">
                <FileText size={32} className="gold-icon" />
                <p>No active assignments assigned to your profile right now.</p>
              </div>
            )}
          </div>

          {/* Assignment Workspace */}
          {selectedReq ? (
            <div className="expert-workspace-pane">
              <div className="workspace-header">
                <div>
                  <span className="cat-badge">{selectedReq.subject}</span>
                  <h3>{selectedReq.title}</h3>
                  <p>Student: <b>{selectedReq.studentName}</b> ({selectedReq.studentEmail})</p>
                </div>
                <div className="budget-box">
                  <small>STIPEND ESTIMATE</small>
                  <b className="gold-text">{selectedReq.budgetEstimate}</b>
                </div>
              </div>

              <div className="req-full-desc-box">
                <h4>Student Brief & Requirements</h4>
                <p>{selectedReq.description}</p>
                <div className="file-pill">
                  <FileText size={15} className="gold-icon" />
                  <span>Student Attached: <b>{selectedReq.fileName}</b></span>
                </div>
              </div>

              {/* Upload Guidance Materials & Notes for the student */}
              <div className="upload-guidance-box">
                <h4>Upload Learning Materials & Conceptual Notes</h4>
                <form onSubmit={handleUploadNotes} className="upload-notes-form">
                  <input
                    type="text"
                    required
                    value={uploadedMaterialName}
                    onChange={(e) => setUploadedMaterialName(e.target.value)}
                    placeholder="e.g. Stokes_Theorem_Derivation_Notes.pdf"
                  />
                  <button type="submit" className="gold-btn-sm">
                    <UploadCloud size={15} /> Upload for Student
                  </button>
                </form>
              </div>

              {/* Chat with Student */}
              <div className="expert-chat-box">
                <div className="chat-title">
                  <MessageSquare size={16} className="gold-icon" />
                  <h4>Direct Academic Communication with {selectedReq.studentName}</h4>
                </div>

                <div className="chat-scroll">
                  {selectedReq.messages?.map((msg, idx) => (
                    <div key={idx} className={`chat-line ${msg.sender}`}>
                      <div className="msg-content">
                        <small className="sender-tag">
                          {msg.sender === 'expert' ? 'You (Specialist)' : msg.sender === 'system' ? 'System' : selectedReq.studentName}
                        </small>
                        <p>{msg.text}</p>
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-send-form" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Reply to ${selectedReq.studentName} with explanations or meeting links...`}
                  />
                  <button type="submit" className="gold-btn-sm" disabled={!chatInput.trim()}>
                    <Send size={15} /> Send
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="no-selection-box">
              <p>Select an assignment on the left to review the syllabus brief and assist the student.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB: SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="expert-panel-card">
          <h3>Upcoming 1-on-1 Consultation Calendar</h3>
          <p>Structured video slots for student problem-solving walkthroughs and capstone reviews.</p>

          <div className="schedule-cards-grid">
            <div className="schedule-slot-card">
              <div className="slot-date-badge">
                <Calendar size={18} className="gold-icon" />
                <b>Today, 4:00 PM</b>
              </div>
              <h4>Distributed Hash Table Optimization</h4>
              <p>Student: <b>Aarav Menon</b> · Subject: Computer Science Engineering</p>
              <button className="gold-btn-sm" onClick={() => alert('Launching Secure Academic Video Consultation Room...')}>
                Launch Video Session
              </button>
            </div>

            <div className="schedule-slot-card">
              <div className="slot-date-badge">
                <Calendar size={18} className="gold-icon" />
                <b>Tomorrow, 11:30 AM</b>
              </div>
              <h4>Multivariable Calculus & Triple Integrals</h4>
              <p>Student: <b>Isha Raman</b> · Subject: Calculus III</p>
              <button className="gold-btn-sm" onClick={() => alert('Launching Secure Academic Video Consultation Room...')}>
                Launch Video Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: EARNINGS */}
      {activeTab === 'earnings' && (
        <div className="expert-panel-card">
          <h3>Earnings, Mentoring Hours & Settlements</h3>
          <div className="earnings-summary-row">
            <div className="earning-stat-card">
              <small>TOTAL EARNED (LIFETIME)</small>
              <b className="gold-text">₹78,400</b>
            </div>
            <div className="earning-stat-card">
              <small>PENDING SETTLEMENT</small>
              <b>₹4,200</b>
            </div>
            <div className="earning-stat-card">
              <small>AVERAGE RATING</small>
              <b>4.98 / 5.0</b>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PROFILE */}
      {activeTab === 'profile' && (
        <div className="expert-panel-card">
          <h3>Credential & Academic Dossier</h3>
          <div className="profile-details-grid">
            <div>
              <small>ACADEMIC DEGREE</small>
              <b>{currentExpert.qualification}</b>
            </div>
            <div>
              <small>DOCTORAL VERIFICATION STATUS</small>
              <b className="gold-text">{currentExpert.hasPhd ? '✓ Verified by Administration' : 'Subject Specialist'}</b>
            </div>
            <div>
              <small>PRIMARY FACULTY</small>
              <b>{currentExpert.primarySubject}</b>
            </div>
            <div>
              <small>SUB-SPECIALIZATIONS</small>
              <b>{currentExpert.subjectSpecialization}</b>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
