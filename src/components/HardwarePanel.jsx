import { useState } from 'react';
import { speechService } from '../utils/speech';

export default function HardwarePanel({
  configuration,
  soundEnabled,
  onButtonTriggered
}) {
  const [activePressed, setActivePressed] = useState(null);
  const [lastSpeechLog, setLastSpeechLog] = useState('Ready for student input.');

  // Handle pressing any of the 5 hardware buttons
  const handlePressButton = (buttonIndex, buttonData) => {
    setActivePressed(buttonIndex);

    let spokenPhrase;
    let alertType = 'speech';

    if (buttonIndex === 1) {
      // Fixed Button 1: Restroom
      spokenPhrase = 'Can I go to the restroom?';
      alertType = 'toilet';
      if (soundEnabled) {
        speechService.playAlertChime('toilet');
        speechService.speak(spokenPhrase);
      }
    } else if (buttonIndex === 2) {
      // Fixed Button 2: Water
      spokenPhrase = 'I need water.';
      alertType = 'water';
      if (soundEnabled) {
        speechService.playAlertChime('water');
        speechService.speak(spokenPhrase);
      }
    } else {
      // Customizable Buttons 3, 4, 5
      spokenPhrase = buttonData.speechText || `Selected ${buttonData.value}`;
      if (soundEnabled) {
        speechService.playAlertChime('speech');
        speechService.speak(spokenPhrase);
      }
    }

    setLastSpeechLog(`Spoken: "${spokenPhrase}"`);

    if (onButtonTriggered) {
      onButtonTriggered({
        buttonNumber: buttonIndex,
        isFixed: buttonIndex <= 2,
        label: buttonData.label,
        value: buttonData.value,
        phrase: spokenPhrase,
        type: alertType,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }

    setTimeout(() => {
      setActivePressed(null);
    }, 450);
  };

  // Fixed buttons definition
  const fixedButtons = [
    {
      number: 1,
      name: 'Button 1',
      label: 'Can I go to the restroom?',
      icon: '🚻',
      speechText: 'Can I go to the restroom?',
      category: 'Permanent Need',
      theme: 'toilet',
      isFixed: true,
      hint: 'Permanent Urgent Need'
    },
    {
      number: 2,
      name: 'Button 2',
      label: 'I need water.',
      icon: '💧',
      speechText: 'I need water.',
      category: 'Permanent Need',
      theme: 'water',
      isFixed: true,
      hint: 'Permanent Hydration Need'
    }
  ];

  // Dynamic buttons from current configuration
  const dynamicButtons = [
    {
      number: 3,
      name: 'Button 3',
      label: configuration.button3.label || configuration.button3.value,
      value: configuration.button3.value,
      speechText: configuration.button3.speechText,
      icon: configuration.button3.icon || '🔤',
      category: 'Teacher Configured',
      theme: 'dynamic',
      isFixed: false,
      hint: `Subject: ${configuration.subject}`
    },
    {
      number: 4,
      name: 'Button 4',
      label: configuration.button4.label || configuration.button4.value,
      value: configuration.button4.value,
      speechText: configuration.button4.speechText,
      icon: configuration.button4.icon || '🔤',
      category: 'Teacher Configured',
      theme: 'dynamic',
      isFixed: false,
      hint: `Subject: ${configuration.subject}`
    },
    {
      number: 5,
      name: 'Button 5',
      label: configuration.button5.label || configuration.button5.value,
      value: configuration.button5.value,
      speechText: configuration.button5.speechText,
      icon: configuration.button5.icon || '🔤',
      category: 'Teacher Configured',
      theme: 'dynamic',
      isFixed: false,
      hint: `Subject: ${configuration.subject}`
    }
  ];

  return (
    <div className="nis-hardware-enclosure" role="region" aria-label="Five-Button Physical Hardware Simulator">
      {/* Hardware Panel Top Bezel */}
      <div className="hardware-bezel-top">
        <div className="hardware-model-meta">
          <div className="hw-logo-badge">
            <span className="hw-chip-icon">⚡</span>
            <strong>NIS-5T PANEL</strong>
          </div>
          <span className="hw-ser-no">Tactile Assistive Communicator • Rev 2.4</span>
        </div>

        <div className="hardware-led-cluster">
          <div className="led-item">
            <span className="led-bulb green"></span>
            <span className="led-text">POWER</span>
          </div>
          <div className="led-item">
            <span className="led-bulb blue"></span>
            <span className="led-text">WEB SYNC</span>
          </div>
          <div className="led-item">
            <span className={`led-bulb ${soundEnabled ? 'amber' : 'off'}`}></span>
            <span className="led-text">SPEECH</span>
          </div>
        </div>
      </div>

      {/* Hardware Status Banner */}
      <div className="hardware-lcd-strip">
        <div className="lcd-text-wrapper">
          <span className="lcd-icon">📟</span>
          <span className="lcd-status">
            CURRENT MODE: <strong>{configuration.subject.toUpperCase()}</strong> | {lastSpeechLog}
          </span>
        </div>
        <span className="lcd-hint">Click any hardware button to simulate a student press</span>
      </div>

      {/* The 5 Physical Buttons in Horizontal Layout */}
      <div className="hardware-buttons-chassis">
        {/* BUTTON 1 - FIXED */}
        <div className="hw-button-slot">
          <div className="slot-badge-fixed">
            <span className="lock-glyph">🔒</span> Fixed
          </div>
          <button
            type="button"
            className={`hw-tactile-button hw-fixed-toilet ${activePressed === 1 ? 'hw-pressed' : ''}`}
            onClick={() => handlePressButton(1, fixedButtons[0])}
            aria-label="Hardware Button 1: Fixed. Can I go to the restroom?"
          >
            <div className="tactile-ring">
              <div className="hw-button-cap">
                <span className="hw-btn-id">B1</span>
                <span className="hw-btn-icon">🚻</span>
                <span className="hw-btn-text">Can I go to the restroom?</span>
              </div>
            </div>
          </button>
          <div className="hw-braille-sub">
            <span className="braille-dots" aria-hidden="true">⠃⠁⠞⠓</span>
            <span className="non-editable-label">Non-Editable</span>
          </div>
        </div>

        {/* BUTTON 2 - FIXED */}
        <div className="hw-button-slot">
          <div className="slot-badge-fixed">
            <span className="lock-glyph">🔒</span> Fixed
          </div>
          <button
            type="button"
            className={`hw-tactile-button hw-fixed-water ${activePressed === 2 ? 'hw-pressed' : ''}`}
            onClick={() => handlePressButton(2, fixedButtons[1])}
            aria-label="Hardware Button 2: Fixed. I need water."
          >
            <div className="tactile-ring">
              <div className="hw-button-cap">
                <span className="hw-btn-id">B2</span>
                <span className="hw-btn-icon">💧</span>
                <span className="hw-btn-text">I need water.</span>
              </div>
            </div>
          </button>
          <div className="hw-braille-sub">
            <span className="braille-dots" aria-hidden="true">⠺⠁⠞⠑⠗</span>
            <span className="non-editable-label">Non-Editable</span>
          </div>
        </div>

        {/* BUTTON 3 - CUSTOMIZABLE */}
        <div className="hw-button-slot">
          <div className="slot-badge-dynamic">
            <span className="sync-glyph">🔄</span> Dynamic
          </div>
          <button
            type="button"
            className={`hw-tactile-button hw-dynamic-btn ${activePressed === 3 ? 'hw-pressed' : ''}`}
            onClick={() => handlePressButton(3, dynamicButtons[0])}
            aria-label={`Hardware Button 3: Customizable. Current value: ${dynamicButtons[0].label}`}
          >
            <div className="tactile-ring">
              <div className="hw-button-cap">
                <span className="hw-btn-id">B3</span>
                <span className="hw-btn-icon dynamic-glyph">{dynamicButtons[0].icon}</span>
                <span className="hw-btn-text dynamic-value">{dynamicButtons[0].label}</span>
              </div>
            </div>
          </button>
          <div className="hw-braille-sub">
            <span className="custom-indicator">Customized by Web</span>
          </div>
        </div>

        {/* BUTTON 4 - CUSTOMIZABLE */}
        <div className="hw-button-slot">
          <div className="slot-badge-dynamic">
            <span className="sync-glyph">🔄</span> Dynamic
          </div>
          <button
            type="button"
            className={`hw-tactile-button hw-dynamic-btn ${activePressed === 4 ? 'hw-pressed' : ''}`}
            onClick={() => handlePressButton(4, dynamicButtons[1])}
            aria-label={`Hardware Button 4: Customizable. Current value: ${dynamicButtons[1].label}`}
          >
            <div className="tactile-ring">
              <div className="hw-button-cap">
                <span className="hw-btn-id">B4</span>
                <span className="hw-btn-icon dynamic-glyph">{dynamicButtons[1].icon}</span>
                <span className="hw-btn-text dynamic-value">{dynamicButtons[1].label}</span>
              </div>
            </div>
          </button>
          <div className="hw-braille-sub">
            <span className="custom-indicator">Customized by Web</span>
          </div>
        </div>

        {/* BUTTON 5 - CUSTOMIZABLE */}
        <div className="hw-button-slot">
          <div className="slot-badge-dynamic">
            <span className="sync-glyph">🔄</span> Dynamic
          </div>
          <button
            type="button"
            className={`hw-tactile-button hw-dynamic-btn ${activePressed === 5 ? 'hw-pressed' : ''}`}
            onClick={() => handlePressButton(5, dynamicButtons[2])}
            aria-label={`Hardware Button 5: Customizable. Current value: ${dynamicButtons[2].label}`}
          >
            <div className="tactile-ring">
              <div className="hw-button-cap">
                <span className="hw-btn-id">B5</span>
                <span className="hw-btn-icon dynamic-glyph">{dynamicButtons[2].icon}</span>
                <span className="hw-btn-text dynamic-value">{dynamicButtons[2].label}</span>
              </div>
            </div>
          </button>
          <div className="hw-braille-sub">
            <span className="custom-indicator">Customized by Web</span>
          </div>
        </div>
      </div>

      {/* Hardware Bottom Bar */}
      <div className="hardware-bezel-bottom">
        <div className="hw-legend-item">
          <span className="legend-dot fixed-toilet-dot"></span>
          <span>Button 1: Restroom (Fixed)</span>
        </div>
        <div className="hw-legend-item">
          <span className="legend-dot fixed-water-dot"></span>
          <span>Button 2: Water (Fixed)</span>
        </div>
        <div className="hw-legend-item">
          <span className="legend-dot dynamic-dot"></span>
          <span>Buttons 3, 4, 5: Dynamic (Configured via Web App)</span>
        </div>
      </div>
    </div>
  );
}
