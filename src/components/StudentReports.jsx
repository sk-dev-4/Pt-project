import React, { useState } from 'react';

export default function StudentReports({ parent, interactions, onBackToInterface }) {
  const [activeReportTab, setActiveReportTab] = useState('physical');

  const totalInteractions = interactions?.length || 28;
  const waterCount = interactions?.filter((i) => i.type === 'water' || i.label?.toLowerCase().includes('water')).length || 6;
  const toiletCount = interactions?.filter((i) => i.type === 'toilet' || i.label?.toLowerCase().includes('toilet')).length || 4;
  const helpCount = interactions?.filter((i) => i.label?.toLowerCase().includes('help')).length || 5;

  const mockTimeline = [
    { time: '09:15 AM', category: 'Physical Need', label: 'Water Request', detail: 'Child indicated hydration need via AAC board. Staff assisted within 2 minutes.' },
    { time: '09:40 AM', category: 'Affective State', label: 'Positive State (Happy)', detail: 'Self-selected following morning classroom welcome circle.' },
    { time: '10:10 AM', category: 'Curriculum', label: 'Alphabet A (Apple)', detail: 'Phonics articulation practiced during English literacy activity.' },
    { time: '10:35 AM', category: 'Physical Need', label: 'Restroom / Toilet', detail: 'Priority alert signaled. Attendant assisted immediately.' },
    { time: '11:05 AM', category: 'Curriculum', label: 'Number 5 Mastery', detail: 'Independent token counting exercise completed successfully.' },
    { time: '11:45 AM', category: 'Nutritional Need', label: 'Snack / Nutrition', detail: 'Child communicated appetite prior to scheduled midday meal.' },
    { time: '12:30 PM', category: 'Physical Need', label: 'Water Request', detail: 'Post-lunch hydration logged by classroom educator.' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-container">
      {/* Reports Header */}
      <div className="reports-top-bar">
        <div className="reports-student-meta">
          <button className="back-link-btn" onClick={onBackToInterface}>
            ← Return to AAC Communication Board
          </button>
          <div className="meta-headline">
            <span className="reports-badge-icon">📊</span>
            <div>
              <h2 className="reports-main-title">Parent Progress & Communication Report</h2>
              <p className="reports-sub">
                Child: <strong>{parent?.childName || 'Aarav Patel'}</strong> • Class: <strong>{parent?.childClass || 'Class 1A - Primary AAC'}</strong> • Parent: <strong>{parent?.name || 'Mr. Rajesh Patel'}</strong> • Academic Term: <strong>2026</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="reports-header-actions">
          <button className="print-report-btn" onClick={handlePrint} title="Print or save as PDF for clinical/school review">
            🖨️ Print / Export Official PDF
          </button>
        </div>
      </div>

      {/* Report Summary Metric Cards */}
      <div className="report-metric-cards">
        <div className="metric-box card-blue">
          <span className="metric-label">Total Expressions Logged</span>
          <span className="metric-value">{totalInteractions}</span>
          <span className="metric-trend">↑ 18% weekly communication gain</span>
        </div>
        <div className="metric-box card-amber">
          <span className="metric-label">Hydration / Water Requests</span>
          <span className="metric-value">{waterCount}</span>
          <span className="metric-trend">Average response latency: 1.8 mins</span>
        </div>
        <div className="metric-box card-rose">
          <span className="metric-label">Restroom / Toilet Alerts</span>
          <span className="metric-value">{toiletCount}</span>
          <span className="metric-trend">100% timely staff fulfillment</span>
        </div>
        <div className="metric-box card-green">
          <span className="metric-label">Spontaneous AAC Usage</span>
          <span className="metric-value">84%</span>
          <span className="metric-trend">Self-initiated communication rate</span>
        </div>
      </div>

      {/* Multiple Reports Navigation Tabs */}
      <div className="report-tabs-navigation" role="tablist">
        <button
          className={`report-tab-btn ${activeReportTab === 'physical' ? 'active' : ''}`}
          onClick={() => setActiveReportTab('physical')}
        >
          💧 1. Daily Physical Needs & Care Log
        </button>
        <button
          className={`report-tab-btn ${activeReportTab === 'vocabulary' ? 'active' : ''}`}
          onClick={() => setActiveReportTab('vocabulary')}
        >
          🗣️ 2. Vocabulary & Core Word Frequency
        </button>
        <button
          className={`report-tab-btn ${activeReportTab === 'emotions' ? 'active' : ''}`}
          onClick={() => setActiveReportTab('emotions')}
        >
          😊 3. Emotional Regulation & Affect Log
        </button>
        <button
          className={`report-tab-btn ${activeReportTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveReportTab('academic')}
        >
          📚 4. Academic Skills & IEP Goals
        </button>
      </div>

      {/* REPORT CONTENT BODY */}
      <div className="report-body-card">
        {/* REPORT 1: Physical Needs & Care Log */}
        {activeReportTab === 'physical' && (
          <div className="report-tab-content">
            <div className="content-intro">
              <h3>Report 1: Daily Essential Needs & Care Log</h3>
              <p>
                Documented record of hydration, restroom needs, and adult assistance turnaround times during school hours.
              </p>
            </div>

            <div className="needs-breakdown-grid">
              <div className="need-stat-card water-summary">
                <div className="need-card-header">
                  <span className="icon">💧</span>
                  <h4>Water / Hydration Requests</h4>
                </div>
                <div className="stat-big-number">{waterCount} Instances</div>
                <p>Indicated drinking requirements across active classroom periods.</p>
                <div className="progress-bar-wrap">
                  <div className="progress-fill water-fill" style={{ width: '80%' }}></div>
                </div>
                <small className="stat-footer">Daily Hydration Target: 80% achieved</small>
              </div>

              <div className="need-stat-card toilet-summary">
                <div className="need-card-header">
                  <span className="icon">🚻</span>
                  <h4>Restroom Assistance Requests</h4>
                </div>
                <div className="stat-big-number">{toiletCount} Instances</div>
                <p>High-priority alert dispatched to educator terminal instantly.</p>
                <div className="progress-bar-wrap">
                  <div className="progress-fill toilet-fill" style={{ width: '95%' }}></div>
                </div>
                <small className="stat-footer">Average educator response time: 1.5 minutes</small>
              </div>

              <div className="need-stat-card help-summary">
                <div className="need-card-header">
                  <span className="icon">🙋‍♂️</span>
                  <h4>Academic Assistance Requests</h4>
                </div>
                <div className="stat-big-number">{helpCount} Instances</div>
                <p>Student initiated requests during independent task completion.</p>
                <div className="progress-bar-wrap">
                  <div className="progress-fill help-fill" style={{ width: '65%' }}></div>
                </div>
                <small className="stat-footer">Resolved with positive educator feedback</small>
              </div>
            </div>

            {/* Time of Day Distribution */}
            <div className="time-distribution-panel">
              <h4>Hourly Distribution of Care & Hydration Signals</h4>
              <div className="hourly-bars">
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '40px' }}><span>2</span></div>
                  <span className="hour-time">09:00 AM</span>
                </div>
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '70px' }}><span>4</span></div>
                  <span className="hour-time">10:00 AM</span>
                </div>
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '90px' }}><span>6</span></div>
                  <span className="hour-time">11:00 AM</span>
                </div>
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '55px' }}><span>3</span></div>
                  <span className="hour-time">12:00 PM</span>
                </div>
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '45px' }}><span>3</span></div>
                  <span className="hour-time">01:00 PM</span>
                </div>
                <div className="hour-col">
                  <div className="bar-block" style={{ height: '35px' }}><span>2</span></div>
                  <span className="hour-time">02:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT 2: Vocabulary & Word Frequency */}
        {activeReportTab === 'vocabulary' && (
          <div className="report-tab-content">
            <div className="content-intro">
              <h3>Report 2: Vocabulary Frequency & Communication Breadth</h3>
              <p>
                Analysis of expressive language markers, core vocabulary selections, and functional communication distribution.
              </p>
            </div>

            <div className="vocabulary-rank-table">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Phrase / Keyword Communicated</th>
                    <th>Functional Domain</th>
                    <th>Cumulative Frequency</th>
                    <th>Proportion</th>
                    <th>Developmental Curve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>#1</strong></td>
                    <td><strong>Water 💧</strong> ("I need water to drink")</td>
                    <td><span className="tag-pill tag-blue">Physical Self-Advocacy</span></td>
                    <td>8 events</td>
                    <td>28%</td>
                    <td><div className="mini-bar" style={{ width: '85%', background: '#0284c7' }}></div></td>
                  </tr>
                  <tr>
                    <td><strong>#2</strong></td>
                    <td><strong>Yes ✅</strong> ("Affirmative response")</td>
                    <td><span className="tag-pill tag-green">Social Pragmatics</span></td>
                    <td>6 events</td>
                    <td>21%</td>
                    <td><div className="mini-bar" style={{ width: '65%', background: '#10b981' }}></div></td>
                  </tr>
                  <tr>
                    <td><strong>#3</strong></td>
                    <td><strong>Help Me 🙋‍♂️</strong> ("Assistance requested")</td>
                    <td><span className="tag-pill tag-amber">Instructional Support</span></td>
                    <td>5 events</td>
                    <td>17%</td>
                    <td><div className="mini-bar" style={{ width: '50%', background: '#f59e0b' }}></div></td>
                  </tr>
                  <tr>
                    <td><strong>#4</strong></td>
                    <td><strong>Toilet 🚻</strong> ("Restroom requested")</td>
                    <td><span className="tag-pill tag-rose">Priority Physical Need</span></td>
                    <td>4 events</td>
                    <td>14%</td>
                    <td><div className="mini-bar" style={{ width: '42%', background: '#e11d48' }}></div></td>
                  </tr>
                  <tr>
                    <td><strong>#5</strong></td>
                    <td><strong>Happy 😊</strong> ("Expressing positive affect")</td>
                    <td><span className="tag-pill tag-purple">Emotional Expression</span></td>
                    <td>3 events</td>
                    <td>10%</td>
                    <td><div className="mini-bar" style={{ width: '30%', background: '#8b5cf6' }}></div></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="communication-category-share">
              <h4>Distribution by Communication Domain</h4>
              <div className="domain-bars">
                <div className="domain-item">
                  <span className="domain-name">Physical Self-Advocacy (Water, Restroom, Nutrition): <strong>42%</strong></span>
                  <div className="full-bar"><div className="fill" style={{ width: '42%', background: '#3b82f6' }}></div></div>
                </div>
                <div className="domain-item">
                  <span className="domain-name">Social & Pragmatic Affirmation (Yes, No, Gratitude): <strong>28%</strong></span>
                  <div className="full-bar"><div className="fill" style={{ width: '28%', background: '#10b981' }}></div></div>
                </div>
                <div className="domain-item">
                  <span className="domain-name">Academic Engagement (Letters, Numbers, Shapes): <strong>18%</strong></span>
                  <div className="full-bar"><div className="fill" style={{ width: '18%', background: '#8b5cf6' }}></div></div>
                </div>
                <div className="domain-item">
                  <span className="domain-name">Emotional State Regulation (Feelings): <strong>12%</strong></span>
                  <div className="full-bar"><div className="fill" style={{ width: '12%', background: '#f59e0b' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT 3: Emotional Regulation */}
        {activeReportTab === 'emotions' && (
          <div className="report-tab-content">
            <div className="content-intro">
              <h3>Report 3: Emotional Well-Being & Affect Regulation Log</h3>
              <p>
                Self-reported affective states recorded during instructional sessions to monitor sensory comfort and environmental ease.
              </p>
            </div>

            <div className="emotions-stat-grid">
              <div className="emotion-box happy-box">
                <span className="emo-icon">😊</span>
                <span className="emo-title">Content / Receptive</span>
                <span className="emo-percent">65%</span>
                <span className="emo-desc">Predominant during morning literacy and creative expression.</span>
              </div>
              <div className="emotion-box focus-box">
                <span className="emo-icon">😌</span>
                <span className="emo-title">Attentive / Engaged</span>
                <span className="emo-percent">20%</span>
                <span className="emo-desc">Observed consistently during numerical and pattern activities.</span>
              </div>
              <div className="emotion-box tired-box">
                <span className="emo-icon">🥱</span>
                <span className="emo-title">Fatigue / Break Required</span>
                <span className="emo-percent">10%</span>
                <span className="emo-desc">Concentrated near the close of extended tactile sessions.</span>
              </div>
              <div className="emotion-box anxious-box">
                <span className="emo-icon">😟</span>
                <span className="emo-title">Sensory Overload</span>
                <span className="emo-percent">5%</span>
                <span className="emo-desc">Associated with noisy classroom transition; mitigated swiftly.</span>
              </div>
            </div>

            <div className="therapist-notes-card">
              <h4>Lead Educator & Speech-Language Pathologist Note for Parents</h4>
              <p>
                "Aarav demonstrates commendable self-regulation when utilizing the AAC dashboard. The ability to directly request 'Need Break' or 'Help' has markedly minimized frustration-associated behaviors. We encourage continued reinforcement of multi-word phrase formulation at home."
              </p>
              <span className="therapist-signature">— Ms. Sarah Jenkins, M.Ed. (Special Education) & Clinical SLP Advisory</span>
            </div>
          </div>
        )}

        {/* REPORT 4: Academic Skills & IEP Goals */}
        {activeReportTab === 'academic' && (
          <div className="report-tab-content">
            <div className="content-intro">
              <h3>Report 4: Academic Competencies & IEP Milestone Alignment</h3>
              <p>
                Evaluates identification of phonics, numerical symbols, and progress towards formal Individualized Education Program objectives.
              </p>
            </div>

            <div className="academic-grid">
              <div className="academic-card">
                <div className="academic-header">
                  <span className="academic-icon">🔢</span>
                  <h4>Numerical Identification & Quantities</h4>
                </div>
                <div className="academic-score">8 of 10 Benchmarks Mastered</div>
                <p>Independently identifies and vocalizes numerical values 1 through 8 with consistent accuracy.</p>
                <div className="skill-tags">
                  <span className="skill-pill mastered">1 (One) ✓</span>
                  <span className="skill-pill mastered">2 (Two) ✓</span>
                  <span className="skill-pill mastered">3 (Three) ✓</span>
                  <span className="skill-pill mastered">4 (Four) ✓</span>
                  <span className="skill-pill mastered">5 (Five) ✓</span>
                  <span className="skill-pill mastered">6 (Six) ✓</span>
                  <span className="skill-pill mastered">7 (Seven) ✓</span>
                  <span className="skill-pill mastered">8 (Eight) ✓</span>
                  <span className="skill-pill in-progress">9 (Nine) Evaluation in Progress</span>
                  <span className="skill-pill in-progress">10 (Ten) Evaluation in Progress</span>
                </div>
              </div>

              <div className="academic-card">
                <div className="academic-header">
                  <span className="academic-icon">🔤</span>
                  <h4>Phonemic Association & Letter Sounds</h4>
                </div>
                <div className="academic-score">18 of 26 Phonics Practiced</div>
                <p>Consistently connects auditory letter sounds with pictorial representations (e.g., A for Apple, B for Ball).</p>
                <div className="skill-tags">
                  <span className="skill-pill mastered">A - Apple ✓</span>
                  <span className="skill-pill mastered">B - Ball ✓</span>
                  <span className="skill-pill mastered">C - Cat ✓</span>
                  <span className="skill-pill mastered">D - Dog ✓</span>
                  <span className="skill-pill mastered">M - Monkey ✓</span>
                  <span className="skill-pill mastered">S - Sun ✓</span>
                  <span className="skill-pill mastered">W - Water ✓</span>
                  <span className="skill-pill in-progress">Phonics Mastery Index: 72%</span>
                </div>
              </div>
            </div>

            <div className="iep-summary-banner">
              <span className="iep-icon">🎯</span>
              <div>
                <strong>Individualized Education Program (IEP) Goal Status: ON SCHEDULE</strong>
                <p>Target: Independent multi-word sentence construction via AAC platform with 80% accuracy by term conclusion.</p>
              </div>
            </div>
          </div>
        )}

        {/* RECENT REAL-TIME ACTIVITY LOG TABLE */}
        <div className="reports-timeline-section">
          <h4>Observation Log for Today's School Session</h4>
          <div className="timeline-table-wrapper">
            <table className="timeline-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Classification</th>
                  <th>Action / Phrase</th>
                  <th>Clinical & Observational Notes</th>
                </tr>
              </thead>
              <tbody>
                {mockTimeline.map((item, idx) => (
                  <tr key={idx}>
                    <td className="time-col">{item.time}</td>
                    <td><span className="timeline-category">{item.category}</span></td>
                    <td><strong>{item.label}</strong></td>
                    <td className="detail-col">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
