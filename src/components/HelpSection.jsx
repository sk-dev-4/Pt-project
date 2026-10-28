import { useState } from 'react';

const HELP_STEPS = [
  {
    step: 1,
    icon: '🔑',
    title: 'Logging In to Your Account',
    summary: 'Access your specialized Teacher or Parent dashboard.',
    details: [
      'Click the "Log In" button located on the top right navigation bar.',
      'Enter your registered email address and password.',
      'Optionally toggle the eye icon to view your password or check "Remember Me".',
      'For demonstration purposes, click the "Teacher Login Preset" or "Parent Login Preset" buttons to sign in with one click.',
      'Click "Log In to NIS System" to load your customized role interface.'
    ]
  },
  {
    step: 2,
    icon: '📝',
    title: 'Creating an Account (Sign Up)',
    summary: 'Register as a new Special Educator or Parent.',
    details: [
      'Click the "Sign Up" button on the navigation bar (or toggle the Sign Up tab in the auth modal).',
      'Provide your Full Name and a valid Email Address.',
      'Select your Account Type: choose "Teacher" to customize hardware buttons or "Parent" to view student needs reports.',
      'Set a secure password of at least 6 characters and re-enter it in Confirm Password.',
      'Click "Create Account & Continue" to finalize registration.'
    ]
  },
  {
    step: 3,
    icon: '📚',
    title: 'Selecting a Subject (English or Math)',
    summary: 'Choose the active classroom topic.',
    details: [
      'Navigate to the Teacher Customization Interface.',
      'In Step 1, click either the "English Period" or "Mathematics Period" subject card.',
      'Notice that English unlocks letters A through Z, while Mathematics unlocks numbers 1 through 9.',
      'The hardware panel above automatically switches into the selected subject mode.'
    ]
  },
  {
    step: 4,
    icon: '⚙️',
    title: 'Customizing Buttons 3, 4, and 5',
    summary: 'Assign letters or numbers to the three flexible buttons.',
    details: [
      'In Step 2 of the customizer, review the three dynamic button tiles: Button 3, Button 4, and Button 5.',
      'Open the dropdown selector for each button and choose your desired letter or number.',
      'Alternatively, click a "Quick Lesson Preset" (e.g., "Set: A, B, C" or "Set: 1, 2, 3") to populate all three buttons instantly.',
      'Observe the physical Hardware Panel simulator update its display immediately.'
    ]
  },
  {
    step: 5,
    icon: '💾',
    title: 'Saving Your Configuration',
    summary: 'Persist your settings for classroom use.',
    details: [
      'Click the green "Save Configuration" button at the bottom of the customizer.',
      'A confirmation success message will appear verifying your settings have been saved locally.',
      'If you ever want to reset to initial defaults, click "Reset Defaults".'
    ]
  },
  {
    step: 6,
    icon: '🎮',
    title: 'Understanding the 5-Button Hardware Panel',
    summary: 'Differentiating permanent safety buttons from dynamic ones.',
    details: [
      'Button 1 (🚻 Toilet) and Button 2 (💧 Water) are FIXED and non-editable. They guarantee instant voice requests for essential physical needs in any classroom period.',
      'Buttons 3, 4, and 5 are DYNAMIC and update based on teacher configuration.',
      'Click any button on the simulator to hear the Web Speech voice output and see the action logged in real time.'
    ]
  }
];

export default function HelpSection({ onOpenAuth, onJumpToHardware }) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="help" className="nis-section nis-help-section" aria-labelledby="help-heading">
      <div className="nis-container">
        {/* Section Header */}
        <div className="nis-section-header">
          <div className="nis-pill-badge teal">
            <span className="pill-dot"></span>
            <span>Step-by-Step Instructions</span>
          </div>
          <h2 id="help-heading" className="nis-section-title">Help & User Guide</h2>
          <div className="nis-title-underline"></div>
          <p className="nis-section-lead">
            Clear instructions for educators and parents to configure buttons, manage student accounts, and operate the NIS hardware panel.
          </p>
        </div>

        {/* Step Guide Interactive Tabs */}
        <div className="help-tabs-layout">
          {/* Left Column: Step List */}
          <div className="help-steps-nav" role="tablist" aria-label="Help Guide Steps">
            {HELP_STEPS.map((step) => {
              const isActive = activeStep === step.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`help-step-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(step.step)}
                >
                  <span className="step-icon-bubble">{step.icon}</span>
                  <div className="step-nav-text">
                    <span className="step-nav-number">Step 0{step.step}</span>
                    <strong className="step-nav-title">{step.title}</strong>
                  </div>
                  <span className="step-nav-chevron">›</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Card for Active Step */}
          <div className="help-step-content-card" role="tabpanel">
            {(() => {
              const current = HELP_STEPS.find((s) => s.step === activeStep) || HELP_STEPS[0];
              return (
                <div>
                  <div className="step-detail-header">
                    <span className="detail-icon-large">{current.icon}</span>
                    <div>
                      <span className="detail-step-chip">Step 0{current.step} Guide</span>
                      <h3 className="detail-title">{current.title}</h3>
                      <p className="detail-summary">{current.summary}</p>
                    </div>
                  </div>

                  <div className="step-instruction-list">
                    <h4>Action Checklist:</h4>
                    <ul>
                      {current.details.map((desc, idx) => (
                        <li key={idx}>
                          <span className="bullet-num">{idx + 1}</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="step-quick-actions">
                    {current.step <= 2 && (
                      <button
                        type="button"
                        className="nis-btn nis-btn-primary"
                        onClick={() => onOpenAuth(current.step === 1 ? 'login' : 'signup')}
                      >
                        Open {current.step === 1 ? 'Login' : 'Sign Up'} Window →
                      </button>
                    )}
                    {current.step >= 3 && (
                      <button
                        type="button"
                        className="nis-btn nis-btn-primary"
                        onClick={onJumpToHardware}
                      >
                        Try It on Hardware Panel ↓
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Hardware Connectivity Status & Explanation Box */}
        <div className="hardware-connectivity-status-box">
          <div className="status-box-header">
            <span className="status-indicator-badge in-progress">
              <span className="dot pulse"></span>
              <span>Physical Hardware Connectivity Roadmap</span>
            </span>
            <span className="version-tag">IoT Bridge: ESP32 + MQTT Spec</span>
          </div>

          <div className="status-box-content">
            <h4>Is Physical Hardware Wireless Synchronization Active?</h4>
            <p>
              In this university demonstration phase, the web application runs a high-fidelity frontend simulator with live Web Speech speech synthesis and browser state persistence. Direct hardware connectivity to the physical 5-button microcontroller box is currently being engineered and is not yet physically tethered.
            </p>
            <div className="hardware-specs-grid">
              <div className="spec-card">
                <strong>Microcontroller</strong>
                <span>ESP32-WROOM-32 (Wi-Fi & Bluetooth Dual Core)</span>
              </div>
              <div className="spec-card">
                <strong>Protocol</strong>
                <span>MQTT Broker (Publish/Subscribe over WebSockets)</span>
              </div>
              <div className="spec-card">
                <strong>Data Payload</strong>
                <span>JSON (<code>{JSON.stringify({ btn3: 'A', btn4: 'B', btn5: 'C' })}</code>)</span>
              </div>
              <div className="spec-card">
                <strong>Hardware Buttons</strong>
                <span>5 Sanwa 24mm Arcade Tactile Pushbuttons + Braille caps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
