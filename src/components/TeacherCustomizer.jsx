import { useState } from 'react';

// Alphabet options A-Z
const ENGLISH_LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

// Number options 1-9
const MATH_NUMBERS = Array.from({ length: 9 }, (_, i) => String(i + 1));

export default function TeacherCustomizer({
  configuration,
  onUpdateConfiguration,
  onSaveConfiguration,
  onResetConfiguration,
  saveNotification
}) {
  const [selectedSubject, setSelectedSubject] = useState(configuration.subject || 'English');

  // Handle subject change (English vs Mathematics)
  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    if (newSubject === 'English') {
      onUpdateConfiguration({
        subject: 'English',
        button3: { value: 'A', label: 'A', speechText: 'Letter A', icon: '🅰️' },
        button4: { value: 'B', label: 'B', speechText: 'Letter B', icon: '🅱️' },
        button5: { value: 'C', label: 'C', speechText: 'Letter C', icon: '🔤' }
      });
    } else if (newSubject === 'Mathematics') {
      onUpdateConfiguration({
        subject: 'Mathematics',
        button3: { value: '1', label: '1', speechText: 'Number 1', icon: '1️⃣' },
        button4: { value: '2', label: '2', speechText: 'Number 2', icon: '2️⃣' },
        button5: { value: '3', label: '3', speechText: 'Number 3', icon: '3️⃣' }
      });
    }
  };

  // Handle individual button customization
  const handleButtonChange = (buttonKey, value) => {
    const isMath = selectedSubject === 'Mathematics';
    const speechText = isMath ? `Number ${value}` : `Letter ${value}`;
    const icon = isMath ? '🔢' : '🔤';

    onUpdateConfiguration({
      ...configuration,
      subject: selectedSubject,
      [buttonKey]: {
        value,
        label: value,
        speechText,
        icon
      }
    });
  };

  // Quick Preset Helper
  const applyPreset = (b3, b4, b5) => {
    const isMath = selectedSubject === 'Mathematics';
    onUpdateConfiguration({
      ...configuration,
      subject: selectedSubject,
      button3: { value: b3, label: b3, speechText: isMath ? `Number ${b3}` : `Letter ${b3}`, icon: isMath ? '🔢' : '🔤' },
      button4: { value: b4, label: b4, speechText: isMath ? `Number ${b4}` : `Letter ${b4}`, icon: isMath ? '🔢' : '🔤' },
      button5: { value: b5, label: b5, speechText: isMath ? `Number ${b5}` : `Letter ${b5}`, icon: isMath ? '🔢' : '🔤' }
    });
  };

  const availableChoices = selectedSubject === 'English' ? ENGLISH_LETTERS : MATH_NUMBERS;

  return (
    <div className="nis-customizer-card" role="region" aria-label="Teacher Button Customization Interface">
      <div className="customizer-header">
        <div className="header-meta">
          <span className="badge-teacher">Faculty Classroom Controls</span>
          <h3 className="customizer-title">Customize 3 Flexible Hardware Buttons</h3>
          <p className="customizer-subtitle">
            Configure Buttons 3, 4, and 5 for the student's hardware panel. The 2 fixed safety buttons (Restroom & Water) remain unchanged under every configuration.
          </p>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveNotification && (
        <div className="save-alert-banner success" role="alert" aria-live="polite">
          <span className="alert-icon">✅</span>
          <div className="alert-content">
            <strong>Configuration Saved Successfully!</strong>
            <p>{saveNotification}</p>
          </div>
        </div>
      )}

      {/* Step 1: Subject Selection */}
      <div className="customizer-section">
        <label className="section-label-bold">
          Step 1: Select Current Classroom Subject
        </label>
        <div className="subject-toggle-group" role="radiogroup" aria-label="Select Subject">
          <button
            type="button"
            className={`subject-pill-btn ${selectedSubject === 'English' ? 'active english' : ''}`}
            onClick={() => handleSubjectChange('English')}
            role="radio"
            aria-checked={selectedSubject === 'English'}
          >
            <span className="pill-icon">🔤</span>
            <div className="pill-text">
              <strong>English Period</strong>
              <span>Letters A – Z Selection</span>
            </div>
          </button>

          <button
            type="button"
            className={`subject-pill-btn ${selectedSubject === 'Mathematics' ? 'active math' : ''}`}
            onClick={() => handleSubjectChange('Mathematics')}
            role="radio"
            aria-checked={selectedSubject === 'Mathematics'}
          >
            <span className="pill-icon">🔢</span>
            <div className="pill-text">
              <strong>Mathematics Period</strong>
              <span>Numbers 1 – 9 Selection</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="presets-bar">
        <span className="preset-label">Quick Lesson Presets:</span>
        {selectedSubject === 'English' ? (
          <div className="preset-chips">
            <button type="button" className="chip-btn" onClick={() => applyPreset('A', 'B', 'C')}>Set: A, B, C</button>
            <button type="button" className="chip-btn" onClick={() => applyPreset('D', 'E', 'F')}>Set: D, E, F</button>
            <button type="button" className="chip-btn" onClick={() => applyPreset('X', 'Y', 'Z')}>Set: X, Y, Z</button>
          </div>
        ) : (
          <div className="preset-chips">
            <button type="button" className="chip-btn" onClick={() => applyPreset('1', '2', '3')}>Set: 1, 2, 3</button>
            <button type="button" className="chip-btn" onClick={() => applyPreset('4', '5', '6')}>Set: 4, 5, 6</button>
            <button type="button" className="chip-btn" onClick={() => applyPreset('7', '8', '9')}>Set: 7, 8, 9</button>
          </div>
        )}
      </div>

      {/* Step 2: Individual Button Selectors (Buttons 3, 4, 5) */}
      <div className="customizer-section">
        <label className="section-label-bold">
          Step 2: Assign Value to Each Customizable Button
        </label>
        <p className="section-note">
          Changes immediately update the physical hardware simulation above.
        </p>

        <div className="button-assignment-grid">
          {/* Button 3 Selector */}
          <div className="assignment-tile">
            <div className="tile-badge">Button 3 (Dynamic)</div>
            <div className="tile-current-val">
              <span className="current-glyph">{configuration.button3.value}</span>
            </div>
            <div className="tile-control">
              <label htmlFor="b3-select" className="tile-label">Choose {selectedSubject === 'English' ? 'Letter' : 'Number'}:</label>
              <select
                id="b3-select"
                className="nis-select"
                value={configuration.button3.value}
                onChange={(e) => handleButtonChange('button3', e.target.value)}
              >
                {availableChoices.map((choice) => (
                  <option key={`b3-${choice}`} value={choice}>
                    {selectedSubject === 'English' ? `Letter ${choice}` : `Number ${choice}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button 4 Selector */}
          <div className="assignment-tile">
            <div className="tile-badge">Button 4 (Dynamic)</div>
            <div className="tile-current-val">
              <span className="current-glyph">{configuration.button4.value}</span>
            </div>
            <div className="tile-control">
              <label htmlFor="b4-select" className="tile-label">Choose {selectedSubject === 'English' ? 'Letter' : 'Number'}:</label>
              <select
                id="b4-select"
                className="nis-select"
                value={configuration.button4.value}
                onChange={(e) => handleButtonChange('button4', e.target.value)}
              >
                {availableChoices.map((choice) => (
                  <option key={`b4-${choice}`} value={choice}>
                    {selectedSubject === 'English' ? `Letter ${choice}` : `Number ${choice}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button 5 Selector */}
          <div className="assignment-tile">
            <div className="tile-badge">Button 5 (Dynamic)</div>
            <div className="tile-current-val">
              <span className="current-glyph">{configuration.button5.value}</span>
            </div>
            <div className="tile-control">
              <label htmlFor="b5-select" className="tile-label">Choose {selectedSubject === 'English' ? 'Letter' : 'Number'}:</label>
              <select
                id="b5-select"
                className="nis-select"
                value={configuration.button5.value}
                onChange={(e) => handleButtonChange('button5', e.target.value)}
              >
                {availableChoices.map((choice) => (
                  <option key={`b5-${choice}`} value={choice}>
                    {selectedSubject === 'English' ? `Letter ${choice}` : `Number ${choice}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Locked Fixed Buttons Reminder */}
      <div className="fixed-buttons-notice">
        <span className="notice-icon">🔒</span>
        <div className="notice-text">
          <strong>Permanent Fixed Buttons Reminder:</strong>
          <span> Button 1 ("Can I go to the restroom?") and Button 2 ("I need water.") remain permanently locked and active. They cannot be modified or replaced.</span>
        </div>
      </div>

      {/* Action Controls: Save Configuration & Reset */}
      <div className="customizer-actions-bar">
        <button
          type="button"
          className="nis-btn nis-btn-primary"
          onClick={onSaveConfiguration}
          aria-label="Save current button configuration locally"
        >
          💾 Save Configuration
        </button>
        <button
          type="button"
          className="nis-btn nis-btn-outline"
          onClick={onResetConfiguration}
          aria-label="Reset buttons to default subject preset"
        >
          ↺ Reset Defaults
        </button>
        <span className="storage-hint">Configurations are saved locally in the browser storage for demonstration.</span>
      </div>
    </div>
  );
}
