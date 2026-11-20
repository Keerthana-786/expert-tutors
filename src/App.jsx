import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Bell } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubjectDiscovery from './components/SubjectDiscovery';
import ExpertNetwork from './components/ExpertNetwork';
import AcademicServices from './components/AcademicServices';
import HowItWorks from './components/HowItWorks';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import ExpertDashboard from './components/ExpertDashboard';
import GamificationView from './components/GamificationView';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

import SpiderIntro from './SpiderIntro';
import SpiderSplitting from './SpiderSplitting';

import {
  CATEGORIES,
  SUBJECTS,
  ACADEMIC_SERVICES,
  INITIAL_EXPERTS,
  INITIAL_REQUESTS,
  INITIAL_STUDENTS,
} from './data/mockData';

// Local storage helper
const getSavedData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    return fallback;
  }
};

export default function App() {
  const [intro, setIntro] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [currentRole, setCurrentRole] = useState('Student'); // 'Student' | 'Expert' | 'Admin'

  // Persistent platform data
  const [requests, setRequests] = useState(() => getSavedData('et_requests', INITIAL_REQUESTS));
  const [experts, setExperts] = useState(() => getSavedData('et_experts', INITIAL_EXPERTS));
  const [students, setStudents] = useState(() => getSavedData('et_students', INITIAL_STUDENTS));

  // Portal and Modal triggers
  const [newRequirementModalOpen, setNewRequirementModalOpen] = useState(false);
  const [prefilledSubject, setPrefilledSubject] = useState(null);
  const [prefilledService, setPrefilledService] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('et_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('et_experts', JSON.stringify(experts));
  }, [experts]);

  useEffect(() => {
    localStorage.setItem('et_students', JSON.stringify(students));
  }, [students]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGetHelp = (subject = null, service = null) => {
    setPrefilledSubject(subject);
    setPrefilledService(service);
    if (currentRole !== 'Student') {
      setCurrentRole('Student');
    }
    setCurrentView('student-portal');
    setNewRequirementModalOpen(true);
  };

  // Submit academic brief
  const handleRequestSubmit = (newReq) => {
    setRequests((prev) => [newReq, ...prev]);
    // Award student XP
    setStudents((prev) =>
      prev.map((s, idx) => (idx === 0 ? { ...s, xp: s.xp + 50, activeRequests: s.activeRequests + 1 } : s))
    );
    showToast(`Academic requirement "${newReq.id}" submitted successfully (+50 XP)`);
  };

  // Admin assigning expert
  const handleAssignExpert = (reqId, expId, expName) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              assignedExpertId: expId || null,
              assignedExpertName: expName || 'Matching in Progress',
              status: expId ? 'Expert Assigned' : 'Under Review',
            }
          : r
      )
    );
    showToast(`Assigned ${expName} to request ${reqId}`);
  };

  // Admin status update
  const handleUpdateStatus = (reqId, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    );
    showToast(`Request ${reqId} status updated to: ${newStatus}`);
  };

  // Admin adding expert
  const handleAddExpert = (newExp) => {
    setExperts((prev) => [newExp, ...prev]);
    showToast(`Scholar ${newExp.name} registered to network.`);
  };

  // Admin removing expert
  const handleDeleteExpert = (expId) => {
    setExperts((prev) => prev.filter((e) => e.id !== expId));
    showToast('Expert removed from active network roster.');
  };

  // Toggle PhD verification badge
  const handleTogglePhdVerification = (expId) => {
    setExperts((prev) =>
      prev.map((e) => (e.id === expId ? { ...e, hasPhd: !e.hasPhd } : e))
    );
    showToast('Doctoral credential status updated.');
  };

  // Student/Expert messaging
  const handleSendMessage = (reqId, text, sender = 'student') => {
    const newMsg = {
      sender,
      text,
      time: 'Just now',
    };
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, messages: [...(r.messages || []), newMsg] }
          : r
      )
    );
  };

  // Expert accepting request
  const handleAcceptRequest = (reqId) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'In Progress' } : r))
    );
    showToast('Assignment accepted. Student notified.');
  };

  // Expert declining request
  const handleDeclineRequest = (reqId) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, status: 'Under Review', assignedExpertId: null, assignedExpertName: 'Matching in Progress' }
          : r
      )
    );
    showToast('Assignment declined. Returned to coordinator matching queue.');
  };

  // Expert uploading notes
  const handleUploadGuidanceDocument = (reqId, docName) => {
    const sysMsg = {
      sender: 'expert',
      text: `Uploaded new guidance documentation: ${docName}`,
      time: 'Just now',
    };
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, messages: [...(r.messages || []), sysMsg] }
          : r
      )
    );
  };

  // Admin broadcast
  const handleBroadcastAnnouncement = (text, target) => {
    showToast(`Broadcast announced to ${target}`);
  };

  const activeStudent = students[0];
  const currentExpert = experts[0];

  return (
    <div className="expert-tutors-app">
      {/* Spider Splitting and Button Breakdown Canvas */}
      <SpiderSplitting />

      {/* Cinematic Opening Superhero Screen */}
      <AnimatePresence>
        {intro && <SpiderIntro onFinish={() => setIntro(false)} />}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        onOpenGetHelp={() => handleOpenGetHelp()}
        onReplayIntro={() => setIntro(true)}
      />

      {/* VIEW ROUTING */}
      <main className="main-content-flow">
        {/* HOMEPAGE VIEW */}
        {currentView === 'home' && (
          <>
            <Hero
              onGetHelp={() => handleOpenGetHelp()}
              onExploreSubjects={() => handleNavigate('subjects')}
            />

            <SubjectDiscovery
              experts={experts}
              onRequestSubject={(sub) => handleOpenGetHelp(sub)}
              onSelectExpert={(exp) => {
                handleOpenGetHelp({ name: exp.primarySubject, categoryName: 'Science and Mathematics' });
              }}
            />

            <ExpertNetwork
              experts={experts}
              onBookConsultation={(exp) => {
                handleOpenGetHelp({ name: exp.primarySubject, categoryName: 'Science and Mathematics' });
              }}
            />

            <AcademicServices
              onRequestService={(srv) => handleOpenGetHelp(null, srv)}
            />

            <HowItWorks
              onStartMission={() => handleOpenGetHelp()}
            />

            <GamificationView
              students={students}
              experts={experts}
            />

            <AboutSection
              onExploreSubjects={() => handleNavigate('subjects')}
              onContactUs={() => handleNavigate('contact')}
            />

            <FaqSection />

            <ContactSection />
          </>
        )}

        {/* SUBJECTS VIEW */}
        {currentView === 'subjects' && (
          <div className="standalone-view-container">
            <SubjectDiscovery
              experts={experts}
              onRequestSubject={(sub) => handleOpenGetHelp(sub)}
              onSelectExpert={(exp) => {
                handleOpenGetHelp({ name: exp.primarySubject, categoryName: 'Science and Mathematics' });
              }}
            />
          </div>
        )}

        {/* EXPERTS VIEW */}
        {currentView === 'experts' && (
          <div className="standalone-view-container">
            <ExpertNetwork
              experts={experts}
              onBookConsultation={(exp) => {
                handleOpenGetHelp({ name: exp.primarySubject, categoryName: 'Science and Mathematics' });
              }}
            />
          </div>
        )}

        {/* SERVICES VIEW */}
        {currentView === 'services' && (
          <div className="standalone-view-container">
            <AcademicServices
              onRequestService={(srv) => handleOpenGetHelp(null, srv)}
            />
          </div>
        )}

        {/* HOW IT WORKS VIEW */}
        {currentView === 'how-it-works' && (
          <div className="standalone-view-container">
            <HowItWorks
              onStartMission={() => handleOpenGetHelp()}
            />
          </div>
        )}

        {/* ABOUT VIEW */}
        {currentView === 'about' && (
          <div className="standalone-view-container">
            <AboutSection
              onExploreSubjects={() => handleNavigate('subjects')}
              onContactUs={() => handleNavigate('contact')}
            />
            <FaqSection />
          </div>
        )}

        {/* CONTACT VIEW */}
        {currentView === 'contact' && (
          <div className="standalone-view-container">
            <ContactSection />
          </div>
        )}

        {/* STUDENT PORTAL VIEW */}
        {currentView === 'student-portal' && (
          <div className="standalone-view-container">
            <StudentPortal
              requests={requests}
              onRequestSubmit={handleRequestSubmit}
              onSendMessage={handleSendMessage}
              activeStudent={activeStudent}
              initialNewModalOpen={newRequirementModalOpen}
              onCloseNewModal={() => setNewRequirementModalOpen(false)}
              prefilledSubject={prefilledSubject}
              prefilledService={prefilledService}
            />
          </div>
        )}

        {/* EXPERT PORTAL VIEW */}
        {currentView === 'expert-portal' && (
          <div className="standalone-view-container">
            <ExpertDashboard
              currentExpert={currentExpert}
              assignedRequests={requests.filter((r) => r.assignedExpertId === currentExpert.id || r.status === 'Expert Assigned')}
              onAcceptRequest={handleAcceptRequest}
              onDeclineRequest={handleDeclineRequest}
              onSendExpertMessage={(reqId, text) => handleSendMessage(reqId, text, 'expert')}
              onUploadGuidanceDocument={handleUploadGuidanceDocument}
            />
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentView === 'admin-dashboard' && (
          <div className="standalone-view-container">
            <AdminDashboard
              requests={requests}
              experts={experts}
              students={students}
              onAssignExpert={handleAssignExpert}
              onUpdateStatus={handleUpdateStatus}
              onAddExpert={handleAddExpert}
              onDeleteExpert={handleDeleteExpert}
              onTogglePhdVerification={handleTogglePhdVerification}
              onBroadcastAnnouncement={handleBroadcastAnnouncement}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onReplayIntro={() => setIntro(true)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <div className="global-toast-notification">
            <CheckCircle2 size={18} className="gold-icon" />
            <span>{toastMessage}</span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
