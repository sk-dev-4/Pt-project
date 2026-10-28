import React, { useState, useRef, useEffect } from 'react';

export default function Header({
  teacher,
  onUpdateTeacher,
  highContrast,
  setHighContrast,
  soundEnabled,
  setSoundEnabled,
  onLogout,
  onSwitchToParent,
  currentClass
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-badge">
          <span className="logo-icon" role="img" aria-label="assistive logo">🗣️</span>
          <div>
            <h1 className="system-title">NIS Assistive Communication System</h1>
            <span className="system-subtitle">Special Education & Classroom Management Dashboard</span>
          </div>
        </div>
        <span className="project-pill">NIS Project</span>
      </div>

      <div className="header-center-info">
        <div className="active-class-pill">
          <span className="pulse-dot"></span>
          <span>Active Session: <strong>{currentClass?.name || 'Class 1A'}</strong></span>
        </div>

        {onSwitchToParent && (
          <button
            className="switch-parent-pill-btn"
            onClick={onSwitchToParent}
            title="Switch to Parent Portal & Child Communication Reports"
          >
            👨‍👩‍👧 Open Parent Portal & Reports
          </button>
        )}
      </div>

      <div className="header-right" ref={menuRef}>
        <button
          className={`profile-button ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Teacher profile options"
          aria-expanded={menuOpen}
        >
          <div className="avatar-wrapper">
            <span className="avatar-initials">{teacher.initials || 'SJ'}</span>
            <span className="status-indicator"></span>
          </div>
          <div className="teacher-brief">
            <span className="teacher-name">{teacher.name || 'Ms. Sarah Jenkins'}</span>
            <span className="teacher-role">{teacher.role || 'Lead Special Educator'}</span>
          </div>
          <svg className={`chevron-icon ${menuOpen ? 'rotated' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {menuOpen && (
          <div className="profile-dropdown-card">
            <div className="dropdown-header">
              <div className="large-avatar">
                <span>{teacher.initials || 'SJ'}</span>
              </div>
              <div>
                <h4 className="dropdown-name">{teacher.name || 'Ms. Sarah Jenkins'}</h4>
                <p className="dropdown-email">{teacher.email || 'sarah.teacher@nis.edu'}</p>
                <span className="badge-verified">Faculty • Special Education</span>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-section">
              <h5 className="section-label">Portal Navigation</h5>
              <button
                className="role-switch-dropdown-btn"
                onClick={() => {
                  setMenuOpen(false);
                  if (onSwitchToParent) onSwitchToParent();
                }}
              >
                👨‍👩‍👧 Access Parent Portal & Reports
              </button>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-section">
              <h5 className="section-label">Assistive Settings</h5>
              <div className="setting-row">
                <span className="setting-title">🔊 Speech & Audio Output</span>
                <button
                  className={`toggle-btn ${soundEnabled ? 'on' : 'off'}`}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="setting-row">
                <span className="setting-title">🌓 High Contrast Mode</span>
                <button
                  className={`toggle-btn ${highContrast ? 'on' : 'off'}`}
                  onClick={() => setHighContrast(!highContrast)}
                >
                  {highContrast ? 'Active' : 'Standard'}
                </button>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-section">
              <button
                className="logout-button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onLogout) onLogout();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
