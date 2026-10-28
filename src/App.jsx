import React, { useState } from 'react';
import Header from './components/Header';
import ClassSelector from './components/ClassSelector';
import InbuiltNeeds from './components/InbuiltNeeds';
import SubjectBoard from './components/SubjectBoard';
import RecentActivity from './components/RecentActivity';
import LoginPlaceholder from './components/LoginPlaceholder';
import StudentInterface from './components/StudentInterface';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeRole, setActiveRole] = useState('parent'); // 'parent' or 'teacher'

  // Teacher metadata
  const [teacher, setTeacher] = useState({
    name: 'Ms. Sarah Jenkins',
    email: 'sarah.teacher@nis.edu',
    role: 'Lead Special Needs Educator',
    initials: 'SJ'
  });

  // Parent & Child metadata
  const [parent, setParent] = useState({
    name: 'Mr. Rajesh Patel',
    childName: 'Aarav Patel',
    childClass: 'Class 1A - Primary AAC & Speech',
    email: 'rajesh.patel@parent.nis.edu',
    initials: 'RP'
  });

  // Registered classes
  const [classes, setClasses] = useState([
    {
      id: 'class-1',
      name: 'Class 1A - Primary AAC & Speech',
      room: 'Room 101',
      studentCount: 7
    },
    {
      id: 'class-2',
      name: 'Class 2B - Life Skills & Phonics',
      room: 'Room 104',
      studentCount: 8
    },
    {
      id: 'class-3',
      name: 'Class 3 - Sunshine Explorers',
      room: 'Room 108',
      studentCount: 5
    }
  ]);
  const [currentClassId, setCurrentClassId] = useState('class-1');

  // Accessibility & Settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // Urgent alerts for Inbuilt Needs (Water & Toilet)
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 'alert-init-1',
      type: 'water',
      label: 'Water Request 💧',
      message: 'Student Aarav Patel indicated hydration requirement',
      timestamp: '10:15 AM',
      priority: 'normal'
    }
  ]);

  // Live interaction history
  const [history, setHistory] = useState([
    {
      id: 'h-1',
      icon: '💧',
      label: 'Water Request',
      phrase: 'Aarav Patel indicated hydration requirement via AAC board',
      time: '10:15 AM',
      type: 'water'
    },
    {
      id: 'h-2',
      icon: '1️⃣',
      label: 'Number 1 Mastery',
      phrase: 'Number One articulated during numerical task',
      time: '09:50 AM',
      type: 'speech'
    },
    {
      id: 'h-3',
      icon: '🍎',
      label: 'Phonics: Letter A',
      phrase: 'A for Apple articulated during literacy period',
      time: '09:30 AM',
      type: 'speech'
    }
  ]);

  const currentClass = classes.find((c) => c.id === currentClassId) || classes[0];

  const handleRequestTriggered = (newAlert) => {
    setActiveAlerts((prev) => [newAlert, ...prev]);
    setHistory((prev) => [
      {
        id: 'hist-' + Date.now(),
        icon: newAlert.type === 'toilet' ? '🚻' : newAlert.type === 'water' ? '💧' : '💬',
        label: newAlert.label,
        phrase: newAlert.phrase || newAlert.message,
        time: newAlert.time || newAlert.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: newAlert.type
      },
      ...prev
    ]);
  };

  const handleResolveAlert = (alertId) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleButtonSpoken = (card) => {
    setHistory((prev) => [
      {
        id: 'hist-' + Date.now(),
        icon: card.icon || '💬',
        label: card.label,
        phrase: card.speechText || card.label,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'speech'
      },
      ...prev.slice(0, 40)
    ]);
  };

  const handleAddClass = (newCls) => {
    setClasses((prev) => [...prev, newCls]);
    setCurrentClassId(newCls.id);
  };

  // If not authenticated, render Login Portal
  if (!isLoggedIn) {
    return (
      <LoginPlaceholder
        onLoginSuccess={(userData) => {
          if (userData.role === 'parent') {
            setParent((prev) => ({ ...prev, ...userData }));
            setActiveRole('parent');
          } else {
            setTeacher((prev) => ({ ...prev, ...userData }));
            setActiveRole('teacher');
          }
          setIsLoggedIn(true);
        }}
      />
    );
  }

  // 1. PARENT PORTAL & CHILD AAC INTERFACE VIEW
  if (activeRole === 'parent') {
    return (
      <StudentInterface
        parent={parent}
        soundEnabled={soundEnabled}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onTriggerNeed={handleRequestTriggered}
        onSwitchToTeacher={() => setActiveRole('teacher')}
        onLogout={() => setIsLoggedIn(false)}
        interactions={history}
      />
    );
  }

  // 2. TEACHER DASHBOARD VIEW
  return (
    <div className={`dashboard-root ${highContrast ? 'high-contrast-mode' : ''}`}>
      <Header
        teacher={teacher}
        onUpdateTeacher={setTeacher}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onLogout={() => setIsLoggedIn(false)}
        onSwitchToParent={() => setActiveRole('parent')}
        currentClass={currentClass}
      />

      <main className="dashboard-main-container">
        <section className="teacher-hero-banner">
          <div className="banner-copy">
            <span className="welcome-tag">Faculty Administration</span>
            <h2>Welcome back, {teacher.name}</h2>
            <p>
              Assistive Communication Hub for students with special needs. Manage enrolled classrooms, supervise vital physiological alerts, and track IEP competencies.
            </p>
          </div>
          <div className="banner-quick-stats">
            <div className="stat-box">
              <span className="stat-number">{classes.length}</span>
              <span className="stat-desc">Enrolled Classes</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{classes.reduce((acc, c) => acc + (c.studentCount || 0), 0)}</span>
              <span className="stat-desc">Active Learners</span>
            </div>
            <div className="stat-box urgent-stat">
              <span className="stat-number">{activeAlerts.length}</span>
              <span className="stat-desc">Pending Alerts</span>
            </div>
          </div>
        </section>

        <ClassSelector
          classes={classes}
          currentClassId={currentClassId}
          onSelectClass={setCurrentClassId}
          onAddClass={handleAddClass}
          activeAlertsCount={activeAlerts.length}
        />

        <InbuiltNeeds
          soundEnabled={soundEnabled}
          onRequestTriggered={handleRequestTriggered}
          activeAlerts={activeAlerts}
          onResolveAlert={handleResolveAlert}
        />

        <SubjectBoard
          soundEnabled={soundEnabled}
          onButtonSpoken={handleButtonSpoken}
        />

        <RecentActivity
          history={history}
          onClearHistory={() => setHistory([])}
        />
      </main>

      <footer className="dashboard-footer">
        <p>
          NIS Assistive Communication System • Institutional Special Education Platform • Compliant with AAC & Web Speech Guidelines
        </p>
      </footer>
    </div>
  );
}

export default App;
