

export default function ParentView({
  currentUser,
  interactions = [],
  onSwitchToTeacher,
  onOpenHardware
}) {
  return (
    <section className="nis-parent-portal-section" aria-labelledby="parent-portal-heading">
      <div className="nis-container">
        {/* Parent Portal Header */}
        <div className="parent-portal-hero">
          <div className="parent-hero-copy">
            <span className="portal-badge">👨‍👩‍👧 Parent & Guardian Portal</span>
            <h2 id="parent-portal-heading">
              Welcome, {currentUser?.name || 'Valued Parent'}
            </h2>
            <p>
              The NIS Assistive Communication System ensures your child has an immediate, dignified, and accessible voice in the classroom at all times.
            </p>
          </div>
          <div className="parent-hero-actions">
            <button
              type="button"
              className="nis-btn nis-btn-primary"
              onClick={onOpenHardware}
            >
              🎮 Open Hardware Panel Simulator
            </button>
            <button
              type="button"
              className="nis-btn nis-btn-outline"
              onClick={onSwitchToTeacher}
            >
              👩‍🏫 View Teacher Customizer
            </button>
          </div>
        </div>

        {/* 3 Value Pillars for Parents */}
        <div className="parent-cards-row">
          <div className="parent-feature-card">
            <div className="card-top-icon teal">💧</div>
            <h3>Guaranteed Basic Needs</h3>
            <p>
              Buttons 1 and 2 ('Can I go to the restroom?' and 'I need water.') are hardcoded into the student's physical hardware panel. No matter what subject is being taught, your child can always ask for water or a restroom break without delay.
            </p>
          </div>

          <div className="parent-feature-card">
            <div className="card-top-icon blue">🔤</div>
            <h3>Curriculum Inclusion</h3>
            <p>
              Teachers configure Buttons 3, 4, and 5 for English alphabet recognition and Mathematics counting. This allows your child to actively answer questions and participate alongside peers.
            </p>
          </div>

          <div className="parent-feature-card">
            <div className="card-top-icon navy">🛡️</div>
            <h3>Safety & Reassurance</h3>
            <p>
              Every physical button press produces instant audible speech and classroom alerts, ensuring teachers respond promptly without requiring verbal ability.
            </p>
          </div>
        </div>

        {/* Live Classroom Request Log */}
        <div className="parent-activity-card">
          <div className="activity-card-header">
            <div>
              <h3>Recent Student Communication Activity</h3>
              <p>Simulated stream of recent assistive requests triggered from the classroom device</p>
            </div>
            <span className="live-status-pill">● Live Activity</span>
          </div>

          <div className="activity-list">
            {interactions.length === 0 ? (
              <div className="empty-activity">
                <span className="empty-icon">📝</span>
                <p>No button presses recorded in this session yet.</p>
                <button type="button" className="nis-btn nis-btn-outline-sm" onClick={onOpenHardware}>
                  Press a button on the Hardware Simulator to see it logged here
                </button>
              </div>
            ) : (
              interactions.map((item, index) => (
                <div key={item.id || index} className={`activity-row-item ${item.type || 'normal'}`}>
                  <span className="activity-icon">{item.icon || '💬'}</span>
                  <div className="activity-details">
                    <div className="activity-title-row">
                      <strong>{item.label}</strong>
                      <span className="activity-time">{item.time || item.timestamp}</span>
                    </div>
                    <p className="activity-phrase">"{item.phrase || item.message}"</p>
                  </div>
                  <span className="activity-badge-status">Delivered</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
