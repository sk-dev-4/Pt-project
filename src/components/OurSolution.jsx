

export default function OurSolution({ onJumpToHardware }) {
  return (
    <section id="solution" className="nis-section nis-solution-section" aria-labelledby="solution-heading">
      <div className="nis-container">
        {/* Section Header */}
        <div className="nis-section-header">
          <div className="nis-pill-badge teal">
            <span className="pill-dot"></span>
            <span>Hardware & Web Co-Design</span>
          </div>
          <h2 id="solution-heading" className="nis-section-title">Our Solution</h2>
          <div className="nis-title-underline"></div>
        </div>

        {/* Primary Solution Statement Box */}
        <div className="nis-solution-overview-card">
          <div className="solution-lead-icon" aria-hidden="true">
            <span className="lead-emoji">💡</span>
          </div>
          <div className="solution-lead-text">
            <p className="nis-solution-primary-description">
              We are designing a hardware device consisting of a five-button panel to help physically challenged students communicate their needs in the classroom. Two buttons have permanent functions: 'Can I go to the restroom?' and 'I need water.' The remaining three buttons are customizable through our NIS web application. Teachers can change these buttons according to the subject being taught. For example, during English periods, the buttons can display letters A, B, C, D, and other letters up to Z. During Mathematics periods, the buttons can display numbers from 1 to 9. Teachers can update, change, and customize the three buttons through the web application to suit the classroom activity. This solution aims to make communication easier and improve classroom accessibility for physically challenged students.
            </p>
          </div>
        </div>

        {/* 5-Button Architecture Breakdown Cards */}
        <div className="solution-split-grid">
          {/* Card 1: Permanent Fixed Needs */}
          <div className="solution-feature-box fixed-box">
            <div className="box-badge fixed-badge">
              <span className="lock-icon" aria-hidden="true">🔒</span>
              <span>2 Permanent Non-Editable Buttons</span>
            </div>
            <h3>Vital Health & Physiological Requests</h3>
            <p>
              Basic human physiological needs should never be overwritten or hidden behind menus. Buttons 1 and 2 remain permanently dedicated to dignity, safety, and urgent needs in all subjects:
            </p>
            <div className="mini-buttons-showcase">
              <div className="mini-btn-chip toilet">
                <span className="chip-num">#1</span>
                <span className="chip-icon">🚻</span>
                <div className="chip-info">
                  <strong>"Can I go to the restroom?"</strong>
                  <small>Permanent Urgent Alert</small>
                </div>
              </div>
              <div className="mini-btn-chip water">
                <span className="chip-num">#2</span>
                <span className="chip-icon">💧</span>
                <div className="chip-info">
                  <strong>"I need water."</strong>
                  <small>Permanent Hydration Request</small>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 3 Subject-Adaptive Buttons */}
          <div className="solution-feature-box dynamic-box">
            <div className="box-badge dynamic-badge">
              <span className="sync-icon" aria-hidden="true">🔄</span>
              <span>3 Teacher-Customizable Buttons</span>
            </div>
            <h3>Dynamic Subject Adaptability</h3>
            <p>
              Teachers configure Buttons 3, 4, and 5 through our web app to match the lesson in real time, supporting pedagogical engagement without overwhelming the learner:
            </p>
            <div className="subject-modes-preview">
              <div className="subject-mode-card">
                <div className="mode-title">
                  <span className="mode-icon">🔤</span>
                  <strong>English Period</strong>
                </div>
                <span className="mode-desc">Letters A–Z selection</span>
                <div className="sample-chips">
                  <span className="sample-chip">Button 3: "A"</span>
                  <span className="sample-chip">Button 4: "B"</span>
                  <span className="sample-chip">Button 5: "C"</span>
                </div>
              </div>

              <div className="subject-mode-card">
                <div className="mode-title">
                  <span className="mode-icon">🔢</span>
                  <strong>Mathematics Period</strong>
                </div>
                <span className="mode-desc">Numbers 1–9 selection</span>
                <div className="sample-chips">
                  <span className="sample-chip">Button 3: "1"</span>
                  <span className="sample-chip">Button 4: "2"</span>
                  <span className="sample-chip">Button 5: "3"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps Banner */}
        <div className="solution-flow-container">
          <h3 className="flow-title">How the System Works in 3 Simple Steps</h3>
          <div className="solution-steps-row">
            <div className="flow-step">
              <div className="step-number">1</div>
              <h4>Teacher Configures</h4>
              <p>The educator logs into NIS web app, selects English or Math, and assigns characters to Buttons 3, 4, and 5.</p>
            </div>
            <div className="flow-arrow" aria-hidden="true">➔</div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <h4>Hardware Panel Syncs</h4>
              <p>The student's 5-button tactile panel updates its dynamic assignments while keeping restroom & water fixed.</p>
            </div>
            <div className="flow-arrow" aria-hidden="true">➔</div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <h4>Student Communicates</h4>
              <p>With an accessible press, the student triggers audible classroom speech and immediate teacher assistance.</p>
            </div>
          </div>

          <div className="solution-cta-wrapper">
            <button
              type="button"
              className="nis-btn nis-btn-primary-large"
              onClick={onJumpToHardware}
            >
              🎮 Test the Interactive 5-Button Panel Simulator ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
