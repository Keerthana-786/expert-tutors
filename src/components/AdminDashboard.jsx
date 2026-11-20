import React, { useState } from 'react';
import {
  Users, UserCheck, FileText, CheckCircle2, Clock, DollarSign,
  TrendingUp, Award, Plus, Trash2, Edit3, ShieldCheck, Search,
  Download, Filter, MessageSquare, Send, AlertTriangle, Eye, X
} from 'lucide-react';
import { CATEGORIES, SUBJECTS, ACADEMIC_SERVICES } from '../data/mockData';

export default function AdminDashboard({
  requests,
  experts,
  students,
  onAssignExpert,
  onUpdateStatus,
  onAddExpert,
  onDeleteExpert,
  onTogglePhdVerification,
  onBroadcastAnnouncement,
}) {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'experts' | 'students' | 'finance' | 'broadcast' | 'analytics'
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddExpertModalOpen, setIsAddExpertModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('All Users (Students & Experts)');
  const [pricingList, setPricingList] = useState([
    { service: 'Assignment Guidance', rate: '₹1,500 - ₹2,500', commission: '25%' },
    { service: 'Mathematics Problem Solving', rate: '₹1,200 - ₹2,200', commission: '20%' },
    { service: 'Engineering Project Mentoring', rate: '₹3,000 - ₹6,000', commission: '25%' },
    { service: 'Programming Guidance', rate: '₹2,000 - ₹4,500', commission: '25%' },
    { service: '1-on-1 Video Consultation', rate: '₹850 / hour', commission: '20%' },
  ]);

  // New Expert Form
  const [newExpForm, setNewExpForm] = useState({
    name: '',
    qualification: 'Ph.D. in ',
    hasPhd: true,
    isVerified: true,
    primarySubject: 'Mathematics',
    subjectSpecialization: '',
    experienceYears: 5,
    languages: 'English',
    availability: 'Available Today',
    bio: '',
  });

  // Calculate high-level KPIs
  const totalStudents = students.length;
  const totalExperts = experts.length;
  const newRequests = requests.filter((r) => r.status === 'New Request').length;
  const pendingRequests = requests.filter((r) => r.status === 'Under Review' || r.status === 'Expert Matching').length;
  const assignedExperts = requests.filter((r) => r.status === 'Expert Assigned' || r.status === 'In Progress').length;
  const activeConsultations = requests.filter((r) => r.status === 'Consultation Scheduled' || r.status === 'In Progress').length;
  const completedServices = requests.filter((r) => r.status === 'Completed').length;
  const totalRevenue = '₹1,48,600';

  const handleCreateExpert = (e) => {
    e.preventDefault();
    if (!newExpForm.name) return;
    const exp = {
      id: `exp-${Date.now().toString().slice(-4)}`,
      name: newExpForm.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      qualification: newExpForm.qualification,
      hasPhd: newExpForm.hasPhd,
      isVerified: newExpForm.isVerified,
      primarySubject: newExpForm.primarySubject,
      subjectSpecialization: newExpForm.subjectSpecialization || `${newExpForm.primarySubject} Theory & Applied Methods`,
      experienceYears: Number(newExpForm.experienceYears) || 5,
      languages: newExpForm.languages.split(',').map((s) => s.trim()),
      availability: newExpForm.availability,
      status: 'Active',
      consultationsCompleted: 0,
      ratingScore: newExpForm.hasPhd ? 'Verified PhD Specialist' : 'Verified Subject Specialist',
      bio: newExpForm.bio || 'Verified academic specialist dedicated to student mentorship and rigorous subject conceptualization.',
    };
    onAddExpert(exp);
    setIsAddExpertModalOpen(false);
    setNewExpForm({
      name: '',
      qualification: 'Ph.D. in ',
      hasPhd: true,
      isVerified: true,
      primarySubject: 'Mathematics',
      subjectSpecialization: '',
      experienceYears: 5,
      languages: 'English',
      availability: 'Available Today',
      bio: '',
    });
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    onBroadcastAnnouncement?.(broadcastText, broadcastTarget);
    setBroadcastText('');
    alert(`System Announcement dispatched to: ${broadcastTarget}`);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-top-bar">
        <div>
          <div className="admin-eyebrow">
            <span className="gold-dot" />
            <span>EXPERT TUTORS · BUSINESS OWNER & EXECUTIVE COMMAND CENTER</span>
          </div>
          <h1 className="admin-title">
            Administrator <span className="gold-text">Control Portal</span>
          </h1>
          <p className="admin-subtitle">
            Oversee requests, assign network experts, monitor consultations, manage pricing, and inspect business operations.
          </p>
        </div>

        <div className="admin-actions-group">
          <button className="gold-btn" onClick={() => setIsAddExpertModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Expert</span>
          </button>
        </div>
      </div>

      {/* 8 Primary KPI Metric Cards */}
      <div className="admin-metrics-grid">
        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><Users size={20} className="gold-icon" /></div>
          <div>
            <small>TOTAL STUDENTS</small>
            <b>{totalStudents} Enrolled</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><UserCheck size={20} className="gold-icon" /></div>
          <div>
            <small>EXPERT NETWORK</small>
            <b>{totalExperts} Qualified</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><FileText size={20} className="gold-icon" /></div>
          <div>
            <small>NEW REQUESTS</small>
            <b className="gold-text">{newRequests} Waiting</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><Clock size={20} className="gold-icon" /></div>
          <div>
            <small>PENDING MATCHES</small>
            <b>{pendingRequests} Requests</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><Award size={20} className="gold-icon" /></div>
          <div>
            <small>ASSIGNED EXPERTS</small>
            <b>{assignedExperts} Active</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><TrendingUp size={20} className="gold-icon" /></div>
          <div>
            <small>CONSULTATIONS</small>
            <b>{activeConsultations} Scheduled</b>
          </div>
        </div>

        <div className="metric-kpi-card">
          <div className="kpi-icon-box"><CheckCircle2 size={20} className="gold-icon" /></div>
          <div>
            <small>COMPLETED</small>
            <b>{completedServices} Missions</b>
          </div>
        </div>

        <div className="metric-kpi-card highlight-revenue">
          <div className="kpi-icon-box"><DollarSign size={20} className="gold-icon" /></div>
          <div>
            <small>PLATFORM VOLUME</small>
            <b className="gold-text">{totalRevenue}</b>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs-nav">
        {[
          { id: 'requests', label: 'C. Request Management', count: requests.length },
          { id: 'experts', label: 'B. Expert Management', count: experts.length },
          { id: 'students', label: 'A. Student Management', count: students.length },
          { id: 'finance', label: 'D. Financial Management' },
          { id: 'broadcast', label: 'E. Communications' },
          { id: 'analytics', label: 'F. Analytics & Reports' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && <span className="tab-badge">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* TAB C: REQUEST MANAGEMENT */}
      {activeTab === 'requests' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Incoming & Active Academic Requests</h3>
              <p>Review student briefs, assign matching subject specialists, and control workflow milestones.</p>
            </div>
            <div className="panel-filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="New Request">New Request</option>
                <option value="Under Review">Under Review</option>
                <option value="Expert Matching">Expert Matching</option>
                <option value="Expert Assigned">Expert Assigned</option>
                <option value="Consultation Scheduled">Consultation Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student & University</th>
                  <th>Subject & Category</th>
                  <th>Title & Description</th>
                  <th>Deadline</th>
                  <th>Assigned Specialist</th>
                  <th>Status Workflow</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests
                  .filter((r) => statusFilter === 'All' || r.status === statusFilter)
                  .map((req) => (
                    <tr key={req.id}>
                      <td><span className="code-badge">{req.id}</span></td>
                      <td>
                        <b>{req.studentName}</b>
                        <small className="table-subtext">{req.studentEmail}</small>
                      </td>
                      <td>
                        <span className="cat-pill">{req.category}</span>
                        <div className="subject-text-cell">{req.subject}</div>
                      </td>
                      <td className="desc-table-cell">
                        <b>{req.title}</b>
                        <p>{req.description.slice(0, 95)}...</p>
                        <small className="file-tag">📎 {req.fileName}</small>
                      </td>
                      <td>
                        <span className="deadline-badge"><Clock size={11} /> {req.deadline}</span>
                      </td>
                      <td>
                        <select
                          className="expert-assign-dropdown"
                          value={req.assignedExpertId || ''}
                          onChange={(e) => {
                            const expId = e.target.value;
                            const matchedExp = experts.find((x) => x.id === expId);
                            onAssignExpert(req.id, expId, matchedExp ? matchedExp.name : 'Matching in Progress');
                          }}
                        >
                          <option value="">-- Match Expert --</option>
                          {experts.map((exp) => (
                            <option key={exp.id} value={exp.id}>
                              {exp.name} ({exp.hasPhd ? 'PhD' : 'Spec.'} - {exp.primarySubject})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="status-change-dropdown"
                          value={req.status}
                          onChange={(e) => onUpdateStatus(req.id, e.target.value)}
                        >
                          <option value="New Request">New Request</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Expert Matching">Expert Matching</option>
                          <option value="Expert Assigned">Expert Assigned</option>
                          <option value="Consultation Scheduled">Consultation Scheduled</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="action-icon-btn"
                          title="View brief details"
                          onClick={() => alert(`Reviewing Full Brief:\n\nID: ${req.id}\nStudent: ${req.studentName}\nSubject: ${req.subject}\nTitle: ${req.title}\n\nDescription: ${req.description}\n\nAttachment: ${req.fileName}`)}
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB B: EXPERT MANAGEMENT */}
      {activeTab === 'experts' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Network Expert Roster ({experts.length} Specialists)</h3>
              <p>Add new specialists, toggle verified PhD credentials, adjust availability, and maintain roster quality.</p>
            </div>
            <button className="gold-btn-sm" onClick={() => setIsAddExpertModalOpen(true)}>
              <Plus size={15} /> Add Expert
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Expert Scholar</th>
                  <th>Primary Subject</th>
                  <th>Verified Qualification</th>
                  <th>PhD Status</th>
                  <th>Experience</th>
                  <th>Availability</th>
                  <th>Consultations</th>
                  <th>Management Actions</th>
                </tr>
              </thead>
              <tbody>
                {experts.map((exp) => (
                  <tr key={exp.id}>
                    <td className="expert-table-cell">
                      <img src={exp.avatar} alt={exp.name} className="expert-mini-avatar" />
                      <div>
                        <b>{exp.name}</b>
                        <small className="table-subtext">{exp.languages.join(', ')}</small>
                      </div>
                    </td>
                    <td><span className="cat-pill">{exp.primarySubject}</span></td>
                    <td>{exp.qualification}</td>
                    <td>
                      <button
                        className={`phd-toggle-btn ${exp.hasPhd ? 'verified' : 'unverified'}`}
                        onClick={() => onTogglePhdVerification(exp.id)}
                        title="Click to toggle verified PhD badge"
                      >
                        {exp.hasPhd ? '✓ PhD Verified' : 'Standard Spec.'}
                      </button>
                    </td>
                    <td>{exp.experienceYears} Years</td>
                    <td><span className="availability-pill">{exp.availability}</span></td>
                    <td><b>{exp.consultationsCompleted} sessions</b></td>
                    <td>
                      <button
                        className="delete-icon-btn"
                        onClick={() => {
                          if (confirm(`Remove ${exp.name} from active expert network?`)) {
                            onDeleteExpert(exp.id);
                          }
                        }}
                        title="Remove Expert"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB A: STUDENT MANAGEMENT */}
      {activeTab === 'students' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Student Accounts & Activity Directory</h3>
              <p>Monitor student progress, enrolled universities, learning streaks, and total completed missions.</p>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name & Email</th>
                  <th>Enrolled Academic Institution</th>
                  <th>Active Requirements</th>
                  <th>Completed Mentorships</th>
                  <th>Gamification XP</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stu) => (
                  <tr key={stu.id}>
                    <td><span className="code-badge">{stu.id}</span></td>
                    <td>
                      <b>{stu.name}</b>
                      <small className="table-subtext">{stu.email}</small>
                    </td>
                    <td>{stu.university}</td>
                    <td><b>{stu.activeRequests} active</b></td>
                    <td>{stu.totalCompleted} completed</td>
                    <td><span className="gold-text">⭐ {stu.xp} XP</span></td>
                    <td><span className="status-pill status-completed">Active Scholar</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB D: FINANCIAL MANAGEMENT */}
      {activeTab === 'finance' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Financial & Service Pricing Management</h3>
              <p>Oversee service pricing benchmarks, customer deposits, expert disbursements, and platform commissions.</p>
            </div>
          </div>

          <div className="finance-summary-cards">
            <div className="finance-card">
              <small>TOTAL GROSS VOLUME</small>
              <b>₹1,48,600</b>
              <span>+18.4% this month</span>
            </div>
            <div className="finance-card">
              <small>EXPERT DISBURSEMENTS</small>
              <b>₹1,14,200</b>
              <span>Promptly settled</span>
            </div>
            <div className="finance-card">
              <small>PLATFORM MARGIN (AVG 23%)</small>
              <b className="gold-text">₹34,400</b>
              <span>Operational net</span>
            </div>
          </div>

          <h4 style={{ margin: '24px 0 12px 0' }}>Current Benchmark Service Pricing</h4>
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Standard Student Pricing</th>
                <th>Platform Commission</th>
                <th>Payout Schedule</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((p, idx) => (
                <tr key={idx}>
                  <td><b>{p.service}</b></td>
                  <td><span className="gold-text">{p.rate}</span></td>
                  <td>{p.commission}</td>
                  <td>Weekly upon student verification</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB E: COMMUNICATIONS & ANNOUNCEMENTS */}
      {activeTab === 'broadcast' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Academic Coordination & Platform Communications</h3>
              <p>Broadcast critical updates to students and registered scholars, or address administrative advisories.</p>
            </div>
          </div>

          <form className="broadcast-form" onSubmit={handleSendBroadcast}>
            <label>
              Target Audience
              <select value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)}>
                <option value="All Users (Students & Experts)">All Users (Students & Experts)</option>
                <option value="All Registered Experts">All Registered Experts</option>
                <option value="All Enrolled Students">All Enrolled Students</option>
              </select>
            </label>

            <label>
              Announcement Advisory Message
              <textarea
                rows={4}
                required
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="e.g., Examination season scheduling advisory: please review updated consultation slot availability for Calculus and Thermodynamics..."
              />
            </label>

            <button type="submit" className="gold-btn">
              <Send size={16} />
              <span>Broadcast Announcement</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB F: ANALYTICS & REPORTS */}
      {activeTab === 'analytics' && (
        <div className="admin-panel-card">
          <div className="panel-header-row">
            <div>
              <h3>Academic Demand & Subject Analytics</h3>
              <p>Subject volume distribution and monthly trend tracking.</p>
            </div>
          </div>

          <div className="analytics-layout">
            <div className="analytics-chart-box">
              <h4>Top Most Requested Subjects</h4>
              <div className="bar-stat-row">
                <span>Computer Science Engineering</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '92%' }} /></div>
                <b>22 Requests</b>
              </div>
              <div className="bar-stat-row">
                <span>Calculus I - IV</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '84%' }} /></div>
                <b>18 Requests</b>
              </div>
              <div className="bar-stat-row">
                <span>Probability and Statistics</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '70%' }} /></div>
                <b>14 Requests</b>
              </div>
              <div className="bar-stat-row">
                <span>Corporate Finance</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '62%' }} /></div>
                <b>13 Requests</b>
              </div>
              <div className="bar-stat-row">
                <span>Physics & Mechanics</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: '55%' }} /></div>
                <b>12 Requests</b>
              </div>
            </div>

            <div className="analytics-kpi-summary">
              <h4>Operational Health</h4>
              <div className="health-stat">
                <small>Average Expert Response Time</small>
                <b>1.8 Hours</b>
              </div>
              <div className="health-stat">
                <small>Matching Accuracy</small>
                <b className="gold-text">98.4%</b>
              </div>
              <div className="health-stat">
                <small>Active PhD Scholars Ratio</small>
                <b>62% of Network</b>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW EXPERT */}
      {isAddExpertModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddExpertModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register New Academic Expert</h3>
              <button className="close-modal-btn" onClick={() => setIsAddExpertModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateExpert} className="admin-form">
              <label>
                Expert Full Name & Title *
                <input
                  type="text"
                  required
                  value={newExpForm.name}
                  onChange={(e) => setNewExpForm({ ...newExpForm, name: e.target.value })}
                  placeholder="e.g. Dr. Aris Thorne"
                />
              </label>

              <div className="form-row-two">
                <label>
                  Academic Qualification *
                  <input
                    type="text"
                    required
                    value={newExpForm.qualification}
                    onChange={(e) => setNewExpForm({ ...newExpForm, qualification: e.target.value })}
                    placeholder="e.g. Ph.D. in Mechanical Engineering"
                  />
                </label>

                <label>
                  Primary Academic Subject
                  <select
                    value={newExpForm.primarySubject}
                    onChange={(e) => setNewExpForm({ ...newExpForm, primarySubject: e.target.value })}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Subject Specialization & Research Focus
                <input
                  type="text"
                  value={newExpForm.subjectSpecialization}
                  onChange={(e) => setNewExpForm({ ...newExpForm, subjectSpecialization: e.target.value })}
                  placeholder="e.g. Fluid Dynamics, Heat Transfer & Finite Element Modeling"
                />
              </label>

              <div className="form-row-two">
                <label>
                  Years of Verified Experience
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={newExpForm.experienceYears}
                    onChange={(e) => setNewExpForm({ ...newExpForm, experienceYears: e.target.value })}
                  />
                </label>

                <label>
                  Availability Status
                  <select
                    value={newExpForm.availability}
                    onChange={(e) => setNewExpForm({ ...newExpForm, availability: e.target.value })}
                  >
                    <option value="Available Today">Available Today</option>
                    <option value="Available Tomorrow">Available Tomorrow</option>
                    <option value="Available This Week">Available This Week</option>
                  </select>
                </label>
              </div>

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newExpForm.hasPhd}
                    onChange={(e) => setNewExpForm({ ...newExpForm, hasPhd: e.target.checked })}
                  />
                  <span>Doctoral Degree (Ph.D.) Verified</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newExpForm.isVerified}
                    onChange={(e) => setNewExpForm({ ...newExpForm, isVerified: e.target.checked })}
                  />
                  <span>Official Credentials Verified</span>
                </label>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="ghost-btn" onClick={() => setIsAddExpertModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="gold-btn">
                  <span>Register Specialist</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
