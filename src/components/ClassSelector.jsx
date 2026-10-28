import React, { useState } from 'react';

export default function ClassSelector({
  classes,
  currentClassId,
  onSelectClass,
  onAddClass,
  activeAlertsCount
}) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    onAddClass({
      id: 'class-' + Date.now(),
      name: newClassName.trim(),
      room: newRoom.trim() || 'Room 101',
      studentCount: 6,
      students: ['Aarav', 'Maya', 'Liam', 'Ananya', 'Rohan', 'Sara']
    });
    setNewClassName('');
    setNewRoom('');
    setShowAddInput(false);
  };

  const selectedClass = classes.find((c) => c.id === currentClassId) || classes[0];

  return (
    <div className="class-section-card">
      <div className="class-section-header">
        <div className="section-title-group">
          <div className="section-icon-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <h2 className="dashboard-heading">Classroom Selection & Management</h2>
            <p className="dashboard-subtext">
              Select or manage the active assistive classroom environment
            </p>
          </div>
        </div>

        <div className="class-action-buttons">
          <button
            className="add-class-btn"
            onClick={() => setShowAddInput(!showAddInput)}
            title="Add a new class group"
          >
            <span className="plus-sign">+</span> Add New Class
          </button>
        </div>
      </div>

      {showAddInput && (
        <form onSubmit={handleAddSubmit} className="add-class-form">
          <input
            type="text"
            placeholder="Class Name (e.g., Class 4 - Early Learners)"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            className="input-field"
            required
            autoFocus
          />
          <input
            type="text"
            placeholder="Room No (e.g., Room 204)"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            className="input-field room-input"
          />
          <button type="submit" className="save-btn">Create Class</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowAddInput(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Class Cards Grid */}
      <div className="classes-grid">
        {classes.map((cls) => {
          const isSelected = cls.id === currentClassId;
          return (
            <div
              key={cls.id}
              className={`class-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectClass(cls.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectClass(cls.id)}
            >
              <div className="class-card-top">
                <span className="class-tag">{cls.room || 'Room A'}</span>
                {isSelected && <span className="active-badge">Active Class</span>}
              </div>
              <h3 className="class-name">{cls.name}</h3>
              <div className="class-stats">
                <span className="stat-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M5.5 21a8.5 8.5 0 0 1 13 0"></path>
                  </svg>
                  {cls.studentCount || 8} Students
                </span>
                <span className="stat-item stat-device">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  Assistive AAC Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Class Quick Summary Banner */}
      {selectedClass && (
        <div className="active-class-bar">
          <div className="bar-info">
            <span className="bar-label">Current Session:</span>
            <span className="bar-value">{selectedClass.name} ({selectedClass.room})</span>
            <span className="bar-students-tag">{selectedClass.studentCount} Registered Assistive Learners</span>
          </div>
          {activeAlertsCount > 0 && (
            <div className="urgent-badge-counter">
              🔔 {activeAlertsCount} Pending Need {activeAlertsCount === 1 ? 'Request' : 'Requests'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

