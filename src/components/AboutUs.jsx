

export default function AboutUs() {
  return (
    <section id="about" className="nis-section nis-about-section" aria-labelledby="about-heading">
      <div className="nis-container">
        {/* Section Pill & Title */}
        <div className="nis-section-header">
          <div className="nis-pill-badge">
            <span className="pill-dot"></span>
            <span>University Engineering Initiative</span>
          </div>
          <h2 id="about-heading" className="nis-section-title">About Us</h2>
          <div className="nis-title-underline"></div>
        </div>

        {/* Primary Description Card with Illustration & Institution Identity */}
        <div className="nis-about-hero-card">
          <div className="nis-about-content">
            <div className="nis-institution-tag">
              <span className="inst-icon" aria-hidden="true">🏛️</span>
              <div>
                <strong>Sathyabama Institute of Science and Technology</strong>
                <span className="dept-tag">Department of Artificial Intelligence and Machine Learning (AIML) • Section A5</span>
              </div>
            </div>

            <p className="nis-about-main-text">
              We are students of Sathyabama Institute of Science and Technology from the Department of Artificial Intelligence and Machine Learning (AIML), Section A5. We are developing the NIS project to support physically challenged students by providing a simple and accessible platform through which they can communicate their basic needs and request assistance in the classroom.
            </p>

            <div className="nis-about-stats-grid">
              <div className="about-stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Hardware Buttons</span>
                <span className="stat-sub">2 Fixed + 3 Dynamic</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Classroom Accessible</span>
                <span className="stat-sub">Non-Verbal AAC Support</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">2-Way</span>
                <span className="stat-label">Teacher & Parent Hub</span>
                <span className="stat-sub">Real-Time Synchronization</span>
              </div>
            </div>
          </div>

          {/* Accessible Visual Illustration */}
          <div className="nis-about-illustration" aria-hidden="true">
            <div className="illustration-card-glass">
              <div className="illustration-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="window-title">Assistive Communication Interface</span>
              </div>
              <div className="illustration-body">
                <div className="visual-student-bubble">
                  <span className="avatar-emoji">🧒</span>
                  <div className="chat-bubble left">
                    <span className="bubble-tag">Physical Button Pressed</span>
                    <p className="bubble-text">💧 "I need water."</p>
                  </div>
                </div>

                <div className="visual-signal-beam">
                  <span className="pulse-signal"></span>
                  <span className="signal-label">Instant Audio & Visual Classroom Notification</span>
                </div>

                <div className="visual-teacher-bubble">
                  <div className="chat-bubble right">
                    <span className="bubble-tag">Teacher Customized</span>
                    <p className="bubble-text">🔤 English Period: Buttons A, B, C Ready</p>
                  </div>
                  <span className="avatar-emoji">👩‍🏫</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars / Values Grid */}
        <div className="nis-pillars-grid">
          <div className="nis-pillar-card">
            <div className="pillar-icon-box teal">
              <span role="img" aria-label="handshake">🤝</span>
            </div>
            <h3>Inclusive Education</h3>
            <p>
              Ensuring every student, regardless of physical or speech limitations, participates actively in daily classroom learning alongside their peers.
            </p>
          </div>

          <div className="nis-pillar-card">
            <div className="pillar-icon-box blue">
              <span role="img" aria-label="speaker">🔊</span>
            </div>
            <h3>Instant Voice Synthesis</h3>
            <p>
              Hardware-triggered audible speech that gives students an immediate voice for essential physiological needs and subject responses.
            </p>
          </div>

          <div className="nis-pillar-card">
            <div className="pillar-icon-box navy">
              <span role="img" aria-label="gear">⚙️</span>
            </div>
            <h3>Effortless Teacher Control</h3>
            <p>
              Intuitive web customization that lets educators switch between English phonics, Mathematics numbers, and classroom exercises in seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
