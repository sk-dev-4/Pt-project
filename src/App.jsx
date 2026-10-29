import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import OurSolution from './components/OurSolution';
import HardwarePanel from './components/HardwarePanel';
import TeacherCustomizer from './components/TeacherCustomizer';
import ParentView from './components/ParentView';
import AuthModal from './components/AuthModal';
import FAQSection from './components/FAQSection';
import HelpSection from './components/HelpSection';
import './App.css';

// Initial default configuration
const DEFAULT_CONFIG = {
  subject: 'English',
  button3: { value: 'A', label: 'A', speechText: 'Letter A', icon: '🅰️' },
  button4: { value: 'B', label: 'B', speechText: 'Letter B', icon: '🅱️' },
  button5: { value: 'C', label: 'C', speechText: 'Letter C', icon: '🔤' }
};

function App() {
  // Navigation active section
  const [activeSection, setActiveSection] = useState('home');

  // Accessibility State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null); // null, { name, email, role: 'teacher' | 'parent' }
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  // Hardware Button Configuration
  const [configuration, setConfiguration] = useState(() => {
    try {
      const saved = localStorage.getItem('nis_button_config_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const [saveNotification, setSaveNotification] = useState(null);

  // Live Student Communication Interaction History
  const [interactions, setInteractions] = useState([
    {
      id: 'init-1',
      buttonNumber: 2,
      isFixed: true,
      label: 'I need water.',
      value: 'Water',
      phrase: 'I need water.',
      type: 'water',
      icon: '💧',
      timestamp: '10:15 AM'
    },
    {
      id: 'init-2',
      buttonNumber: 1,
      isFixed: true,
      label: 'Can I go to the restroom?',
      value: 'Restroom',
      phrase: 'Can I go to the restroom?',
      type: 'toilet',
      icon: '🚻',
      timestamp: '09:40 AM'
    },
    {
      id: 'init-3',
      buttonNumber: 3,
      isFixed: false,
      label: 'Letter A',
      value: 'A',
      phrase: 'Letter A',
      type: 'speech',
      icon: '🔤',
      timestamp: '09:20 AM'
    }
  ]);

  // Handle hardware button triggered
  const handleHardwareButtonTriggered = (buttonEvent) => {
    const newRecord = {
      id: 'hist-' + Date.now(),
      buttonNumber: buttonEvent.buttonNumber,
      isFixed: buttonEvent.isFixed,
      label: buttonEvent.label,
      value: buttonEvent.value,
      phrase: buttonEvent.phrase,
      type: buttonEvent.type,
      icon: buttonEvent.type === 'toilet' ? '🚻' : buttonEvent.type === 'water' ? '💧' : '🔤',
      timestamp: buttonEvent.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInteractions((prev) => [newRecord, ...prev.slice(0, 19)]);
  };

  // Handle Save Configuration locally
  const handleSaveConfiguration = () => {
    try {
      localStorage.setItem('nis_button_config_v2', JSON.stringify(configuration));
      setSaveNotification(
        `Active configuration for ${configuration.subject} saved to browser storage. Button 3="${configuration.button3.value}", Button 4="${configuration.button4.value}", Button 5="${configuration.button5.value}". Fixed Buttons 1 & 2 remain active.`
      );
      setTimeout(() => {
        setSaveNotification(null);
      }, 5000);
    } catch {
      setSaveNotification('Configuration updated in session memory.');
    }
  };

  // Handle Reset Configuration
  const handleResetConfiguration = () => {
    setConfiguration(DEFAULT_CONFIG);
    try {
      localStorage.setItem('nis_button_config_v2', JSON.stringify(DEFAULT_CONFIG));
    } catch {
      // ignore
    }
    setSaveNotification('Buttons reset to default English alphabet presets (A, B, C).');
    setTimeout(() => {
      setSaveNotification(null);
    }, 4000);
  };

  // Navigation Helper with smooth scroll
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Auth Modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Login Success
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'teacher') {
      setActiveSection('hardware');
      setTimeout(() => {
        const hw = document.getElementById('hardware');
        if (hw) hw.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setActiveSection('parent');
      setTimeout(() => {
        const p = document.getElementById('parent-portal');
        if (p) p.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('home');
  };

  return (
    <div className={`nis-app-root ${highContrast ? 'high-contrast-mode' : ''}`}>
      {/* Top Header & Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
      />

      <main id="main-content" tabIndex={-1}>
        {/* Hero Banner: Institutional Welcome */}
        <section className="nis-hero-banner" aria-labelledby="hero-title">
          <div className="nis-container">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-department-pill">
                  <span className="inst-badge-dot"></span>
                  <span>Sathyabama Institute of Science and Technology</span>
                </div>
                <h1 id="hero-title" className="hero-headline">
                  NIS Assistive Communication System
                </h1>
                <p className="hero-subhead">
                  Department of Artificial Intelligence & Machine Learning (AIML), Section A5. An inclusive five-button hardware interface and web customizer empowering physically challenged students in classroom environments.
                </p>

                <div className="hero-cta-group">
                  <button
                    type="button"
                    className="nis-btn nis-btn-primary btn-large"
                    onClick={() => handleNavigate('hardware')}
                  >
                    🎮 Try 5-Button Hardware Simulator
                  </button>
                  <button
                    type="button"
                    className="nis-btn nis-btn-outline btn-large"
                    onClick={() => handleNavigate('solution')}
                  >
                    📖 Learn About Our Solution
                  </button>
                </div>

                <div className="hero-meta-badges">
                  <span className="meta-badge">
                    <strong>2 Fixed Buttons:</strong> Restroom & Water
                  </span>
                  <span className="meta-badge">
                    <strong>3 Dynamic Buttons:</strong> English (A–Z) & Math (1–9)
                  </span>
                </div>
              </div>

              <div className="hero-visual-card">
                <div className="hero-device-snapshot">
                  <div className="snapshot-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="title">Physical 5-Button Tactile Unit</span>
                  </div>
                  <div className="snapshot-body">
                    <div className="snapshot-buttons-row">
                      <div className="snap-btn fixed" title="Button 1: Restroom (Fixed)">
                        <span>🚻</span>
                        <small>Restroom</small>
                      </div>
                      <div className="snap-btn fixed" title="Button 2: Water (Fixed)">
                        <span>💧</span>
                        <small>Water</small>
                      </div>
                      <div className="snap-btn dynamic" title="Button 3: Customizable">
                        <span>{configuration.button3.value}</span>
                        <small>Dynamic</small>
                      </div>
                      <div className="snap-btn dynamic" title="Button 4: Customizable">
                        <span>{configuration.button4.value}</span>
                        <small>Dynamic</small>
                      </div>
                      <div className="snap-btn dynamic" title="Button 5: Customizable">
                        <span>{configuration.button5.value}</span>
                        <small>Dynamic</small>
                      </div>
                    </div>
                    <div className="snapshot-footer">
                      <span className="sync-pulse"></span>
                      <span>Synced with Teacher Web Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. About Us Section */}
        <AboutUs />

        {/* 2. Our Solution Section */}
        <OurSolution onJumpToHardware={() => handleNavigate('hardware')} />

        {/* 3. Five-Button Hardware Panel & Teacher Customizer Section */}
        <section id="hardware" className="nis-section nis-hardware-section" aria-labelledby="hardware-heading">
          <div className="nis-container">
            <div className="nis-section-header">
              <div className="nis-pill-badge navy">
                <span className="pill-dot"></span>
                <span>Interactive Hardware Simulation</span>
              </div>
              <h2 id="hardware-heading" className="nis-section-title">
                Five-Button Hardware Panel & Teacher Customizer
              </h2>
              <div className="nis-title-underline"></div>
              <p className="nis-section-lead">
                Experience the physical tactile panel designed for students, alongside the teacher control interface to customize the three flexible buttons in real time.
              </p>
            </div>

            {/* Visual Five-Button Hardware Panel */}
            <HardwarePanel
              configuration={configuration}
              soundEnabled={soundEnabled}
              onButtonTriggered={handleHardwareButtonTriggered}
            />

            {/* Teacher Customization Interface */}
            <div className="customizer-mount-point">
              <TeacherCustomizer
                configuration={configuration}
                onUpdateConfiguration={setConfiguration}
                onSaveConfiguration={handleSaveConfiguration}
                onResetConfiguration={handleResetConfiguration}
                saveNotification={saveNotification}
              />
            </div>
          </div>
        </section>

        {/* 4. Parent Interface Section (Always accessible, or personalized if logged in) */}
        <div id="parent-portal">
          <ParentView
            currentUser={currentUser}
            interactions={interactions}
            onSwitchToTeacher={() => handleNavigate('hardware')}
            onOpenHardware={() => handleNavigate('hardware')}
          />
        </div>

        {/* 5. Frequently Asked Questions (FAQ) Section */}
        <FAQSection />

        {/* 6. Help Section */}
        <HelpSection
          onOpenAuth={handleOpenAuth}
          onJumpToHardware={() => handleNavigate('hardware')}
        />
      </main>

      {/* Accessible Footer */}
      <footer className="nis-footer" role="contentinfo">
        <div className="nis-container">
          <div className="footer-top-row">
            <div className="footer-brand-column">
              <div className="footer-logo">
                <span className="logo-icon">🗣️</span>
                <strong>NIS Assistive Communication System</strong>
              </div>
              <p className="footer-dept-tag">
                Sathyabama Institute of Science and Technology<br />
                Department of Artificial Intelligence and Machine Learning (AIML)<br />
                Section A5 • Final Year Special Education Engineering Project
              </p>
            </div>

            <div className="footer-nav-column">
              <h4>Quick Navigation</h4>
              <ul>
                <li><button type="button" onClick={() => handleNavigate('about')}>About Us</button></li>
                <li><button type="button" onClick={() => handleNavigate('solution')}>Our Solution</button></li>
                <li><button type="button" onClick={() => handleNavigate('hardware')}>5-Button Hardware</button></li>
                <li><button type="button" onClick={() => handleNavigate('faq')}>FAQ</button></li>
                <li><button type="button" onClick={() => handleNavigate('help')}>Help & Guide</button></li>
              </ul>
            </div>

            <div className="footer-portal-column">
              <h4>User Access</h4>
              <ul>
                <li><button type="button" onClick={() => handleOpenAuth('login')}>Teacher / Parent Log In</button></li>
                <li><button type="button" onClick={() => handleOpenAuth('signup')}>Create New Account (Sign Up)</button></li>
                <li><button type="button" onClick={() => handleNavigate('parent-portal')}>Parent Portal Overview</button></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p>© {new Date().getFullYear()} NIS Project • Sathyabama Institute of Science and Technology (AIML Section A5). Built with React & Web Speech API.</p>
            <div className="footer-a11y-badge">
              <span>♿ WCAG 2.1 AA Compliant Design</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal Dialog (Log In / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
