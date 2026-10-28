import React, { useState } from 'react';
import { speechService } from '../utils/speech';

export default function InbuiltNeeds({ soundEnabled, onRequestTriggered, activeAlerts, onResolveAlert }) {
  const [lastPressed, setLastPressed] = useState(null);

  const handleWaterClick = () => {
    setLastPressed('water');
    if (soundEnabled) {
      speechService.playAlertChime('water');
      speechService.speak('Water requested. I need water, please.');
    }
    onRequestTriggered({
      id: 'alert-' + Date.now(),
      type: 'water',
      label: 'Water 💧',
      message: 'Student requested Water',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      student: 'Student Tablet (Classroom)',
      priority: 'normal'
    });
    setTimeout(() => setLastPressed(null), 800);
  };

  const handleToiletClick = () => {
    setLastPressed('toilet');
    if (soundEnabled) {
      speechService.playAlertChime('toilet');
      speechService.speak('Toilet requested. I need to go to the washroom, please.');
    }
    onRequestTriggered({
      id: 'alert-' + Date.now(),
      type: 'toilet',
      label: 'Toilet 🚻',
      message: 'Urgent: Student requested Restroom / Toilet',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      student: 'Student Tablet (Classroom)',
      priority: 'high'
    });
    setTimeout(() => setLastPressed(null), 800);
  };

  return (
    <section className="inbuilt-needs-section">
      <div className="section-header-compact">
        <div className="title-with-pill">
          <h3 className="section-subtitle">Inbuilt Priority Assistive Buttons</h3>
          <span className="inbuilt-tag">Core Essential Needs</span>
        </div>
        <p className="section-description">
          Instant high-priority AAC buttons for immediate physical needs. Tap to speak aloud & send alert.
        </p>
      </div>

      <div className="inbuilt-buttons-grid">
        {/* WATER BUTTON */}
        <button
          className={`need-card water-card ${lastPressed === 'water' ? 'button-pressed' : ''}`}
          onClick={handleWaterClick}
          aria-label="Request Water"
        >
          <div className="card-top-indicator">
            <span className="status-dot-blue"></span>
            <span className="need-badge">Essential Need</span>
          </div>

          <div className="need-icon-container water-icon-bg">
            <span className="big-emoji" role="img" aria-label="water droplet">💧</span>
          </div>

          <div className="need-content">
            <span className="need-title">WATER</span>
            <span className="need-phrase">"I need water to drink"</span>
          </div>

          <div className="need-footer-action">
            <span className="tap-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              Tap to Speak & Alert
            </span>
          </div>
        </button>

        {/* TOILET BUTTON */}
        <button
          className={`need-card toilet-card ${lastPressed === 'toilet' ? 'button-pressed' : ''}`}
          onClick={handleToiletClick}
          aria-label="Request Toilet / Washroom"
        >
          <div className="card-top-indicator">
            <span className="status-dot-amber"></span>
            <span className="need-badge priority-badge">Priority Need</span>
          </div>

          <div className="need-icon-container toilet-icon-bg">
            <span className="big-emoji" role="img" aria-label="restroom">🚻</span>
          </div>

          <div className="need-content">
            <span className="need-title">TOILET</span>
            <span className="need-phrase">"I need to use the restroom"</span>
          </div>

          <div className="need-footer-action">
            <span className="tap-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              Tap to Speak & Alert
            </span>
          </div>
        </button>
      </div>

      {/* Active Needs Alert Queue */}
      {activeAlerts && activeAlerts.length > 0 && (
        <div className="active-alerts-container">
          <div className="alerts-header">
            <h4>
              <span className="blinking-bell">🔔</span> Active Need Requests ({activeAlerts.length})
            </h4>
            <span className="alert-sub">Teacher attention required</span>
          </div>
          <div className="alerts-list">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className={`alert-row ${alert.type}`}>
                <div className="alert-meta">
                  <span className="alert-time">{alert.timestamp}</span>
                  <span className="alert-tag">{alert.label}</span>
                  <span className="alert-text">{alert.message}</span>
                </div>
                <button
                  className="resolve-btn"
                  onClick={() => onResolveAlert(alert.id)}
                  title="Acknowledge and mark resolved"
                >
                  ✓ Mark Assisted
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

