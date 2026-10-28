import React, { useState } from 'react';
import { speechService } from '../utils/speech';
import StudentReports from './StudentReports';

export default function StudentInterface({
  parent,
  soundEnabled,
  highContrast,
  setHighContrast,
  onTriggerNeed,
  onSwitchToTeacher,
  onLogout,
  interactions = []
}) {
  const [currentCategory, setCurrentCategory] = useState('needs');
  const [sentenceWords, setSentenceWords] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState('Welcome. Select any communication tile to initiate speech.');

  // Essential Core Physical Needs
  const urgentNeeds = [
    { id: 'need-water', label: 'WATER', speechText: 'I need water to drink, please.', icon: '💧', type: 'water', color: 'water' },
    { id: 'need-toilet', label: 'RESTROOM / TOILET', speechText: 'I need to use the restroom, please.', icon: '🚻', type: 'toilet', color: 'toilet' },
    { id: 'need-food', label: 'NUTRITION / FOOD', speechText: 'I am hungry, I require food, please.', icon: '🥪', type: 'food', color: 'amber' },
    { id: 'need-help', label: 'ASSISTANCE / HELP', speechText: 'I require assistance, please.', icon: '🙋‍♂️', type: 'help', color: 'rose' },
    { id: 'need-break', label: 'REST / BREAK', speechText: 'I need a short sensory break, please.', icon: '😴', type: 'break', color: 'purple' },
    { id: 'need-hurt', label: 'MEDICAL / DISCOMFORT', speechText: 'I am experiencing discomfort or pain.', icon: '🤕', type: 'medical', color: 'rose' }
  ];

  // Core Functional Sentence Starters
  const sentenceStarters = [
    { id: 's-iwant', label: 'I REQUIRE', speechText: 'I require', icon: '👉' },
    { id: 's-ifeel', label: 'I FEEL', speechText: 'I feel', icon: '❤️' },
    { id: 's-ineed', label: 'I NEED', speechText: 'I need', icon: '🤲' },
    { id: 's-yes', label: 'YES', speechText: 'Yes', icon: '✅' },
    { id: 's-no', label: 'NO', speechText: 'No', icon: '❌' },
    { id: 's-please', label: 'PLEASE', speechText: 'Please', icon: '🙏' },
    { id: 's-thanks', label: 'THANK YOU', speechText: 'Thank you', icon: '💐' },
    { id: 's-more', label: 'ADDITIONAL / MORE', speechText: 'More, please', icon: '➕' },
    { id: 's-stop', label: 'PAUSE / STOP', speechText: 'Please stop', icon: '🛑' },
    { id: 's-done', label: 'COMPLETED', speechText: 'Task completed', icon: '🏁' }
  ];

  // Affective States / Emotions
  const emotionsList = [
    { id: 'emo-happy', label: 'CONTENT / HAPPY', speechText: 'I am feeling content and happy.', icon: '😊', color: 'green' },
    { id: 'emo-calm', label: 'CALM / PEACEFUL', speechText: 'I am feeling calm and regulated.', icon: '😌', color: 'teal' },
    { id: 'emo-tired', label: 'TIRED / FATIGUED', speechText: 'I am experiencing fatigue.', icon: '🥱', color: 'purple' },
    { id: 'emo-sad', label: 'UNHAPPY / SAD', speechText: 'I am feeling sad.', icon: '😢', color: 'blue' },
    { id: 'emo-anxious', label: 'ANXIOUS / NERVOUS', speechText: 'I am feeling anxious or overwhelmed.', icon: '😨', color: 'amber' },
    { id: 'emo-frustrated', label: 'FRUSTRATED', speechText: 'I am feeling frustrated.', icon: '😠', color: 'rose' }
  ];

  // Numerical & Math
  const numbersList = [
    { id: 'n-1', label: '1 - ONE', speechText: 'Number One', icon: '1️⃣', color: 'blue' },
    { id: 'n-2', label: '2 - TWO', speechText: 'Number Two', icon: '2️⃣', color: 'blue' },
    { id: 'n-3', label: '3 - THREE', speechText: 'Number Three', icon: '3️⃣', color: 'blue' },
    { id: 'n-4', label: '4 - FOUR', speechText: 'Number Four', icon: '4️⃣', color: 'blue' },
    { id: 'n-5', label: '5 - FIVE', speechText: 'Number Five', icon: '5️⃣', color: 'blue' },
    { id: 'n-6', label: '6 - SIX', speechText: 'Number Six', icon: '6️⃣', color: 'blue' },
    { id: 'n-7', label: '7 - SEVEN', speechText: 'Number Seven', icon: '7️⃣', color: 'blue' },
    { id: 'n-8', label: '8 - EIGHT', speechText: 'Number Eight', icon: '8️⃣', color: 'blue' },
    { id: 'n-9', label: '9 - NINE', speechText: 'Number Nine', icon: '9️⃣', color: 'blue' },
    { id: 'n-10', label: '10 - TEN', speechText: 'Number Ten', icon: '🔟', color: 'blue' },
    { id: 'n-plus', label: '+ PLUS', speechText: 'Addition operator, plus', icon: '➕', color: 'green' },
    { id: 'n-minus', label: '- MINUS', speechText: 'Subtraction operator, minus', icon: '➖', color: 'rose' }
  ];

  // Alphabets & Phonetics
  const alphabetsList = [
    { id: 'a-a', label: 'A - APPLE', speechText: 'A for Apple', icon: '🍎', color: 'rose' },
    { id: 'a-b', label: 'B - BALL', speechText: 'B for Ball', icon: '⚽', color: 'blue' },
    { id: 'a-c', label: 'C - CAT', speechText: 'C for Cat', icon: '🐱', color: 'amber' },
    { id: 'a-d', label: 'D - DOG', speechText: 'D for Dog', icon: '🐶', color: 'amber' },
    { id: 'a-e', label: 'E - ELEPHANT', speechText: 'E for Elephant', icon: '🐘', color: 'teal' },
    { id: 'a-f', label: 'F - FISH', speechText: 'F for Fish', icon: '🐟', color: 'blue' },
    { id: 'a-g', label: 'G - GRAPES', speechText: 'G for Grapes', icon: '🍇', color: 'purple' },
    { id: 'a-h', label: 'H - HOUSE', speechText: 'H for House', icon: '🏠', color: 'green' },
    { id: 'a-m', label: 'M - MONKEY', speechText: 'M for Monkey', icon: '🐒', color: 'green' },
    { id: 'a-s', label: 'S - SUN', speechText: 'S for Sun', icon: '☀️', color: 'amber' },
    { id: 'a-w', label: 'W - WATER', speechText: 'W for Water', icon: '💧', color: 'blue' },
    { id: 'a-z', label: 'Z - ZEBRA', speechText: 'Z for Zebra', icon: '🦓', color: 'green' }
  ];

  // Classroom Objects & Tools
  const classroomList = [
    { id: 'c-book', label: 'BOOK', speechText: 'Instructional Book', icon: '📖', color: 'blue' },
    { id: 'c-pencil', label: 'PENCIL / PEN', speechText: 'Writing utensil, pencil', icon: '✏️', color: 'amber' },
    { id: 'c-tablet', label: 'DIGITAL DEVICE', speechText: 'Assistive tablet device', icon: '📱', color: 'purple' },
    { id: 'c-music', label: 'AUDIO / MUSIC', speechText: 'Audio therapy or music', icon: '🎵', color: 'teal' },
    { id: 'c-draw', label: 'ART / DRAW', speechText: 'Art and visual drawing activity', icon: '🎨', color: 'rose' },
    { id: 'c-quiet', label: 'QUIET SPACE', speechText: 'Requesting quiet sensory space', icon: '🤫', color: 'purple' }
  ];

  const handleItemClick = (item) => {
    setLastSpokenText(item.speechText || item.label);
    if (soundEnabled) {
      if (item.type === 'water') {
        speechService.playAlertChime('water');
      } else if (item.type === 'toilet') {
        speechService.playAlertChime('toilet');
      }
      speechService.speak(item.speechText || item.label);
    }

    setSentenceWords((prev) => [...prev, item]);

    if (onTriggerNeed) {
      onTriggerNeed({
        id: 'parent-event-' + Date.now(),
        type: item.type || 'expression',
        label: `${item.icon || '💬'} ${item.label}`,
        phrase: item.speechText || item.label,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        studentName: parent?.childName || 'Aarav Patel',
        isUrgent: item.type === 'water' || item.type === 'toilet' || item.type === 'help'
      });
    }
  };

  const handleSpeakSentence = () => {
    if (sentenceWords.length === 0) return;
    const fullText = sentenceWords.map((w) => w.speechText || w.label).join(' ');
    setLastSpokenText(fullText);
    if (soundEnabled) {
      speechService.speak(fullText);
    }
  };

  const handleClearSentence = () => {
    setSentenceWords([]);
  };

  const handleBackspace = () => {
    setSentenceWords((prev) => prev.slice(0, prev.length - 1));
  };

  if (showReports) {
    return (
      <StudentReports
        parent={parent}
        interactions={interactions}
        onBackToInterface={() => setShowReports(false)}
      />
    );
  }

  return (
    <div className={`student-interface-root ${highContrast ? 'high-contrast-mode' : ''}`}>
      {/* Top Formal Parent & Student Header */}
      <header className="student-header">
        <div className="student-profile-badge">
          <div className="student-avatar">
            <span>{parent?.initials || 'RP'}</span>
          </div>
          <div className="student-info-text">
            <h2 className="student-name">Parent Portal: {parent?.name || 'Mr. Rajesh Patel'}</h2>
            <span className="student-class-tag">
              Enrolled Child: <strong>{parent?.childName || 'Aarav Patel'}</strong> • {parent?.childClass || 'Class 1A - Primary AAC'} • Faculty: Ms. Sarah Jenkins
            </span>
          </div>
        </div>

        <div className="student-header-controls">
          <button
            className="reports-nav-btn"
            onClick={() => setShowReports(true)}
            title="Access detailed communication & IEP reports"
          >
            📊 View Child's Reports (4 Comprehensive Reports)
          </button>

          <button
            className="role-switch-btn"
            onClick={onSwitchToTeacher}
            title="Switch view to Faculty Dashboard"
          >
            👩‍🏫 Switch to Teacher Dashboard
          </button>

          <button
            className={`contrast-toggle ${highContrast ? 'active' : ''}`}
            onClick={() => setHighContrast(!highContrast)}
            title="Toggle high contrast accessibility view"
          >
            🌓 High Contrast
          </button>

          <button className="student-logout-btn" onClick={onLogout} title="Sign out of portal">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main AAC Board & Assistive Container */}
      <main className="student-main-content">
        {/* 1. AAC SENTENCE FORMULATION BAR */}
        <section className="sentence-builder-card">
          <div className="builder-header">
            <span className="builder-label">🗣️ Functional Communication Bar</span>
            <span className="builder-hint">Select individual vocabulary tiles below to formulate complete expressive statements</span>
          </div>

          <div className="sentence-window">
            {sentenceWords.length === 0 ? (
              <span className="empty-sentence-placeholder">
                Formulated communication statement will appear here (e.g., "I REQUIRE" + "WATER")
              </span>
            ) : (
              <div className="sentence-tiles-flow">
                {sentenceWords.map((word, idx) => (
                  <span key={idx} className="sentence-chip">
                    <span className="chip-icon">{word.icon}</span>
                    <span className="chip-label">{word.label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="builder-actions">
            <button
              className="speak-sentence-btn"
              onClick={handleSpeakSentence}
              disabled={sentenceWords.length === 0}
            >
              🔊 Vocalize Formulated Sentence
            </button>
            <button
              className="backspace-btn"
              onClick={handleBackspace}
              disabled={sentenceWords.length === 0}
              title="Delete the preceding item"
            >
              ⌫ Delete Preceding
            </button>
            <button
              className="clear-sentence-btn"
              onClick={handleClearSentence}
              disabled={sentenceWords.length === 0}
            >
              Clear Statement
            </button>
          </div>

          <div className="last-spoken-banner">
            <span className="speaker-icon">📢</span>
            <span className="spoken-text">Active Auditory Statement: "{lastSpokenText}"</span>
            <button
              className="repeat-icon-btn"
              onClick={() => speechService.speak(lastSpokenText)}
              title="Re-articulate statement"
            >
              🔄
            </button>
          </div>
        </section>

        {/* 2. INBUILT PHYSICAL & CRITICAL CARE NEEDS */}
        <section className="student-urgent-needs-box">
          <div className="box-title-row">
            <span className="urgent-badge">Priority Needs</span>
            <h3>Essential Care & Physiological Requirements</h3>
            <span className="sub">Direct tactile buttons configured for instantaneous teacher signaling</span>
          </div>

          <div className="urgent-cards-grid">
            {urgentNeeds.map((need) => (
              <button
                key={need.id}
                className={`student-need-tile tile-${need.color}`}
                onClick={() => handleItemClick(need)}
              >
                <div className="tile-icon">{need.icon}</div>
                <div className="tile-label">{need.label}</div>
                <div className="tile-phrase">"{need.speechText}"</div>
                <span className="tile-tap-indicator">Vocalize & Signal Educator</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. CATEGORIZED VOCABULARY MATRICES */}
        <section className="student-categories-board">
          <div className="student-tabs-bar" role="tablist">
            <button
              className={`st-tab ${currentCategory === 'needs' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('needs')}
            >
              💬 Core Expressions & Needs
            </button>
            <button
              className={`st-tab ${currentCategory === 'emotions' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('emotions')}
            >
              😊 Affective States & Feelings
            </button>
            <button
              className={`st-tab ${currentCategory === 'numbers' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('numbers')}
            >
              🔢 Mathematics & Numerical
            </button>
            <button
              className={`st-tab ${currentCategory === 'alphabets' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('alphabets')}
            >
              🔤 Phonemic Alphabet (A - Z)
            </button>
            <button
              className={`st-tab ${currentCategory === 'classroom' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('classroom')}
            >
              🎒 Learning & Instructional Items
            </button>
          </div>

          <div className="student-tiles-grid">
            {currentCategory === 'needs' &&
              sentenceStarters.map((item) => (
                <button
                  key={item.id}
                  className="student-aac-tile color-blue"
                  onClick={() => handleItemClick(item)}
                >
                  <span className="tile-emoji">{item.icon}</span>
                  <span className="tile-name">{item.label}</span>
                  <span className="tile-sub">{item.speechText}</span>
                </button>
              ))}

            {currentCategory === 'emotions' &&
              emotionsList.map((item) => (
                <button
                  key={item.id}
                  className={`student-aac-tile color-${item.color}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="tile-emoji">{item.icon}</span>
                  <span className="tile-name">{item.label}</span>
                  <span className="tile-sub">{item.speechText}</span>
                </button>
              ))}

            {currentCategory === 'numbers' &&
              numbersList.map((item) => (
                <button
                  key={item.id}
                  className={`student-aac-tile color-${item.color}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="tile-emoji">{item.icon}</span>
                  <span className="tile-name">{item.label}</span>
                  <span className="tile-sub">{item.speechText}</span>
                </button>
              ))}

            {currentCategory === 'alphabets' &&
              alphabetsList.map((item) => (
                <button
                  key={item.id}
                  className={`student-aac-tile color-${item.color}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="tile-emoji">{item.icon}</span>
                  <span className="tile-name">{item.label}</span>
                  <span className="tile-sub">{item.speechText}</span>
                </button>
              ))}

            {currentCategory === 'classroom' &&
              classroomList.map((item) => (
                <button
                  key={item.id}
                  className={`student-aac-tile color-${item.color}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="tile-emoji">{item.icon}</span>
                  <span className="tile-name">{item.label}</span>
                  <span className="tile-sub">{item.speechText}</span>
                </button>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
