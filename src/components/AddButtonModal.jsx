import React, { useState } from 'react';

export default function AddButtonModal({ isOpen, onClose, onAddButton, activeCategory }) {
  const [label, setLabel] = useState('');
  const [speechText, setSpeechText] = useState('');
  const [category, setCategory] = useState(
    activeCategory === 'all' ? 'custom' : activeCategory
  );
  const [icon, setIcon] = useState('⭐');
  const [color, setColor] = useState('blue');

  if (!isOpen) return null;

  const quickIcons = ['⭐', '📖', '🎨', '🔬', '💡', '🎵', '🍎', '🧩', '✏️', '✋', '👍', '❤️', '⏰', '⚽', '🎒'];
  const colorOptions = [
    { id: 'blue', name: 'Sky Blue', bg: '#e0f2fe', border: '#38bdf8', text: '#0369a1' },
    { id: 'green', name: 'Mint Green', bg: '#dcfce7', border: '#4ade80', text: '#15803d' },
    { id: 'purple', name: 'Lavender', bg: '#f3e8ff', border: '#c084fc', text: '#7e22ce' },
    { id: 'amber', name: 'Warm Amber', bg: '#fef3c7', border: '#fbbf24', text: '#b45309' },
    { id: 'rose', name: 'Soft Rose', bg: '#ffe4e6', border: '#fb7185', text: '#be123c' },
    { id: 'teal', name: 'Ocean Teal', bg: '#ccfbf1', border: '#2dd4bf', text: '#0f766e' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;

    onAddButton({
      id: 'custom-' + Date.now(),
      label: label.trim(),
      speechText: speechText.trim() || label.trim(),
      category: category,
      icon: icon || '⭐',
      color: color,
      isCustom: true
    });

    setLabel('');
    setSpeechText('');
    setIcon('⭐');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-badge-icon">✨</span>
            <div>
              <h3>Customize Subject Assistive Button</h3>
              <p className="modal-sub">Create tailored buttons for disabled students in your classroom</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Subject / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-input"
            >
              <option value="numbers">Numbers & Math</option>
              <option value="alphabets">Alphabets & Words</option>
              <option value="communication">Classroom Communication / Needs</option>
              <option value="science">Science & Nature</option>
              <option value="custom">General / Custom Category</option>
            </select>
          </div>

          <div className="form-group">
            <label>Button Label (Displayed on tile)</label>
            <input
              type="text"
              placeholder="e.g., Apple, Triangle, 15, Help Me"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                if (!speechText) {
                  setSpeechText(e.target.value);
                }
              }}
              required
              className="text-input"
            />
          </div>

          <div className="form-group">
            <label>Speech Output (What is spoken aloud when pressed)</label>
            <input
              type="text"
              placeholder="e.g., I would like an apple, please."
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
              className="text-input"
            />
            <small className="hint-text">Assistive speech will read this sentence aloud clearly for students.</small>
          </div>

          <div className="form-group">
            <label>Select Icon or Emoji</label>
            <div className="emoji-quick-select">
              {quickIcons.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`emoji-btn ${icon === item ? 'selected-emoji' : ''}`}
                  onClick={() => setIcon(item)}
                >
                  {item}
                </button>
              ))}
              <input
                type="text"
                maxLength={4}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Custom"
                className="custom-emoji-input"
                title="Type any emoji"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Card Color Theme</label>
            <div className="color-palette">
              {colorOptions.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  className={`color-pill ${color === c.id ? 'active-color' : ''}`}
                  style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
                  onClick={() => setColor(c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="preview-container">
            <span className="preview-label">Live Button Preview:</span>
            <div className={`assistive-card preview-card color-${color}`}>
              <div className="card-symbol">{icon}</div>
              <div className="card-label-large">{label || 'Sample Button'}</div>
              <div className="card-sub">{speechText || 'Speech preview'}</div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              + Save & Add to Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

