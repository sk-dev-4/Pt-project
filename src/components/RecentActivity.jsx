import React from 'react';

export default function RecentActivity({ history, onClearHistory }) {
  if (!history || history.length === 0) {
    return (
      <div className="activity-card empty-activity">
        <div className="activity-header">
          <span className="activity-icon">📋</span>
          <h4>Live Interaction History</h4>
        </div>
        <p className="empty-text">No communication triggered yet. Tapping any button will log interactions here in real time.</p>
      </div>
    );
  }

  return (
    <div className="activity-card">
      <div className="activity-header">
        <div className="title-row">
          <span className="activity-icon">📋</span>
          <h4>Live Interaction History</h4>
          <span className="count-pill">{history.length}</span>
        </div>
        <button className="clear-link-btn" onClick={onClearHistory}>Clear Log</button>
      </div>

      <div className="activity-feed">
        {history.map((item) => (
          <div key={item.id} className={`activity-item ${item.type || 'speech'}`}>
            <span className="item-icon">{item.icon || '💬'}</span>
            <div className="item-content">
              <div className="item-title-row">
                <span className="item-label">{item.label}</span>
                <span className="item-time">{item.time}</span>
              </div>
              <p className="item-phrase">{item.phrase}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

