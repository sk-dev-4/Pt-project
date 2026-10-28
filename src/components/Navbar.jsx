import { useState } from 'react';

export default function Navbar({
  activeSection,
  onNavigate,
  onOpenAuth,
  currentUser,
  onLogout,
  soundEnabled,
  onToggleSound,
  highContrast,
  onToggleContrast
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const handleAuthAction = (mode) => {
    onOpenAuth(mode);
    setMobileMenuOpen(false);
  };

  return (
    <header className="nis-navbar-header" role="banner">
      <div className="nis-navbar-container">
        {/* Left: Professional NIS Logo & Symbol */}
        <div className="nis-brand" onClick={() => handleNavClick('home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}>
          <div className="nis-logo-badge" aria-hidden="true">
            <span className="nis-logo-letters">NIS</span>
            <div className="nis-pulse-ring"></div>
          </div>
          <div className="nis-brand-text">
            <span className="nis-brand-title">NIS Assistive System</span>
            <span className="nis-brand-tagline">Sathyabama AIML • Section A5</span>
          </div>
        </div>

        {/* Center / Navigation Links for in-page anchors & sections */}
        <nav className="nis-nav-links" aria-label="Main Navigation">
          <button
            type="button"
            className={`nis-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          <button
            type="button"
            className={`nis-nav-link ${activeSection === 'solution' ? 'active' : ''}`}
            onClick={() => handleNavClick('solution')}
          >
            Our Solution
          </button>
          <button
            type="button"
            className={`nis-nav-link ${activeSection === 'hardware' ? 'active' : ''}`}
            onClick={() => handleNavClick('hardware')}
          >
            Hardware Panel
          </button>
          <button
            type="button"
            className={`nis-nav-link ${activeSection === 'faq' ? 'active' : ''}`}
            onClick={() => handleNavClick('faq')}
          >
            FAQ
          </button>
          <button
            type="button"
            className={`nis-nav-link ${activeSection === 'help' ? 'active' : ''}`}
            onClick={() => handleNavClick('help')}
          >
            Help
          </button>
        </nav>

        {/* Right Navigation: Exactly FAQ, Help, Log In, Sign Up */}
        <div className="nis-nav-actions">
          {/* Accessibility Quick Toggles */}
          <div className="nis-a11y-toggles" aria-label="Accessibility quick settings">
            <button
              type="button"
              className={`a11y-btn ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
              title={soundEnabled ? 'Speech audio enabled' : 'Speech audio muted'}
              aria-label={soundEnabled ? 'Audio speech output on' : 'Audio speech output off'}
            >
              {soundEnabled ? '🔊 Audio ON' : '🔇 Audio OFF'}
            </button>
            <button
              type="button"
              className={`a11y-btn ${highContrast ? 'active' : ''}`}
              onClick={onToggleContrast}
              title="Toggle High Contrast Display"
              aria-label="Toggle High Contrast Display"
            >
              👁️ High Contrast
            </button>
          </div>

          {currentUser ? (
            <div className="nis-user-session">
              <span className={`user-role-badge ${currentUser.role}`}>
                {currentUser.role === 'teacher' ? '👩‍🏫 Teacher' : '👨‍👩‍👧 Parent'}
              </span>
              <span className="user-name-display">{currentUser.name.split(' ')[0]}</span>
              <button
                type="button"
                className="nis-btn nis-btn-outline-sm"
                onClick={onLogout}
                aria-label="Log Out of system"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="nis-auth-group">
              <button
                type="button"
                className="nis-nav-link-subtle"
                onClick={() => handleNavClick('faq')}
              >
                FAQ
              </button>
              <button
                type="button"
                className="nis-nav-link-subtle"
                onClick={() => handleNavClick('help')}
              >
                Help
              </button>
              <button
                type="button"
                className="nis-btn nis-btn-login"
                onClick={() => handleAuthAction('login')}
              >
                Log In
              </button>
              <button
                type="button"
                className="nis-btn nis-btn-signup"
                onClick={() => handleAuthAction('signup')}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="nis-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="nis-mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="nis-mobile-nav-list">
            <button type="button" onClick={() => handleNavClick('about')}>About Us</button>
            <button type="button" onClick={() => handleNavClick('solution')}>Our Solution</button>
            <button type="button" onClick={() => handleNavClick('hardware')}>5-Button Hardware</button>
            <button type="button" onClick={() => handleNavClick('faq')}>FAQ</button>
            <button type="button" onClick={() => handleNavClick('help')}>Help</button>

            <div className="mobile-drawer-divider"></div>

            {!currentUser ? (
              <div className="mobile-auth-stack">
                <button
                  type="button"
                  className="nis-btn nis-btn-login w-full"
                  onClick={() => handleAuthAction('login')}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="nis-btn nis-btn-signup w-full"
                  onClick={() => handleAuthAction('signup')}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="mobile-user-stack">
                <p className="mobile-user-greeting">Signed in as {currentUser.name} ({currentUser.role})</p>
                <button
                  type="button"
                  className="nis-btn nis-btn-outline-sm w-full"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
