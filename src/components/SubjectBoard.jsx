import React, { useState } from 'react';
import { speechService } from '../utils/speech';
import AddButtonModal from './AddButtonModal';

export default function SubjectBoard({ soundEnabled, onButtonSpoken }) {
  const [activeTab, setActiveTab] = useState('numbers');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSpoken, setLastSpoken] = useState(null);

  // Initial numbers dataset
  const initialNumbers = [
    { id: 'num-1', label: '1', speechText: 'Number One', icon: '1️⃣', sub: 'One item', category: 'numbers', color: 'blue' },
    { id: 'num-2', label: '2', speechText: 'Number Two', icon: '2️⃣', sub: 'Two items', category: 'numbers', color: 'blue' },
    { id: 'num-3', label: '3', speechText: 'Number Three', icon: '3️⃣', sub: 'Three items', category: 'numbers', color: 'blue' },
    { id: 'num-4', label: '4', speechText: 'Number Four', icon: '4️⃣', sub: 'Four items', category: 'numbers', color: 'blue' },
    { id: 'num-5', label: '5', speechText: 'Number Five', icon: '5️⃣', sub: 'Five items', category: 'numbers', color: 'blue' },
    { id: 'num-6', label: '6', speechText: 'Number Six', icon: '6️⃣', sub: 'Six items', category: 'numbers', color: 'blue' },
    { id: 'num-7', label: '7', speechText: 'Number Seven', icon: '7️⃣', sub: 'Seven items', category: 'numbers', color: 'blue' },
    { id: 'num-8', label: '8', speechText: 'Number Eight', icon: '8️⃣', sub: 'Eight items', category: 'numbers', color: 'blue' },
    { id: 'num-9', label: '9', speechText: 'Number Nine', icon: '9️⃣', sub: 'Nine items', category: 'numbers', color: 'blue' },
    { id: 'num-10', label: '10', speechText: 'Number Ten', icon: '🔟', sub: 'Ten items', category: 'numbers', color: 'blue' },
    { id: 'num-plus', label: '+ (Plus)', speechText: 'Plus, add together', icon: '➕', sub: 'Addition', category: 'numbers', color: 'green' },
    { id: 'num-minus', label: '- (Minus)', speechText: 'Minus, subtract', icon: '➖', sub: 'Subtraction', category: 'numbers', color: 'rose' },
    { id: 'num-equals', label: '= (Equals)', speechText: 'Equals, total result', icon: '🟰', sub: 'Result', category: 'numbers', color: 'purple' },
  ];

  // Initial alphabets dataset
  const initialAlphabets = [
    { id: 'alpha-a', label: 'A - Apple', speechText: 'A for Apple', icon: '🍎', sub: 'Letter A', category: 'alphabets', color: 'rose' },
    { id: 'alpha-b', label: 'B - Ball', speechText: 'B for Ball', icon: '⚽', sub: 'Letter B', category: 'alphabets', color: 'blue' },
    { id: 'alpha-c', label: 'C - Cat', speechText: 'C for Cat', icon: '🐱', sub: 'Letter C', category: 'alphabets', color: 'amber' },
    { id: 'alpha-d', label: 'D - Dog', speechText: 'D for Dog', icon: '🐶', sub: 'Letter D', category: 'alphabets', color: 'amber' },
    { id: 'alpha-e', label: 'E - Elephant', speechText: 'E for Elephant', icon: '🐘', sub: 'Letter E', category: 'alphabets', color: 'teal' },
    { id: 'alpha-f', label: 'F - Fish', speechText: 'F for Fish', icon: '🐟', sub: 'Letter F', category: 'alphabets', color: 'blue' },
    { id: 'alpha-g', label: 'G - Grapes', speechText: 'G for Grapes', icon: '🍇', sub: 'Letter G', category: 'alphabets', color: 'purple' },
    { id: 'alpha-h', label: 'H - House', speechText: 'H for House', icon: '🏠', sub: 'Letter H', category: 'alphabets', color: 'green' },
    { id: 'alpha-i', label: 'I - Ice Cream', speechText: 'I for Ice Cream', icon: '🍦', sub: 'Letter I', category: 'alphabets', color: 'rose' },
    { id: 'alpha-j', label: 'J - Juice', speechText: 'J for Juice', icon: '🧃', sub: 'Letter J', category: 'alphabets', color: 'amber' },
    { id: 'alpha-k', label: 'K - Kite', speechText: 'K for Kite', icon: '🪁', sub: 'Letter K', category: 'alphabets', color: 'purple' },
    { id: 'alpha-l', label: 'L - Lion', speechText: 'L for Lion', icon: '🦁', sub: 'Letter L', category: 'alphabets', color: 'amber' },
    { id: 'alpha-m', label: 'M - Monkey', speechText: 'M for Monkey', icon: '🐒', sub: 'Letter M', category: 'alphabets', color: 'green' },
    { id: 'alpha-n', label: 'N - Nest', speechText: 'N for Nest', icon: '🪺', sub: 'Letter N', category: 'alphabets', color: 'teal' },
    { id: 'alpha-o', label: 'O - Orange', speechText: 'O for Orange', icon: '🍊', sub: 'Letter O', category: 'alphabets', color: 'amber' },
    { id: 'alpha-p', label: 'P - Pencil', speechText: 'P for Pencil', icon: '✏️', sub: 'Letter P', category: 'alphabets', color: 'blue' },
    { id: 'alpha-q', label: 'Q - Queen', speechText: 'Q for Queen', icon: '👑', sub: 'Letter Q', category: 'alphabets', color: 'purple' },
    { id: 'alpha-r', label: 'R - Rainbow', speechText: 'R for Rainbow', icon: '🌈', sub: 'Letter R', category: 'alphabets', color: 'teal' },
    { id: 'alpha-s', label: 'S - Sun', speechText: 'S for Sun', icon: '☀️', sub: 'Letter S', category: 'alphabets', color: 'amber' },
    { id: 'alpha-t', label: 'T - Tree', speechText: 'T for Tree', icon: '🌳', sub: 'Letter T', category: 'alphabets', color: 'green' },
    { id: 'alpha-u', label: 'U - Umbrella', speechText: 'U for Umbrella', icon: '☂️', sub: 'Letter U', category: 'alphabets', color: 'purple' },
    { id: 'alpha-v', label: 'V - Van', speechText: 'V for Van', icon: '🚐', sub: 'Letter V', category: 'alphabets', color: 'blue' },
    { id: 'alpha-w', label: 'W - Water', speechText: 'W for Water', icon: '🌊', sub: 'Letter W', category: 'alphabets', color: 'teal' },
    { id: 'alpha-x', label: 'X - Xylophone', speechText: 'X for Xylophone', icon: '🎶', sub: 'Letter X', category: 'alphabets', color: 'rose' },
    { id: 'alpha-y', label: 'Y - Yellow', speechText: 'Y for Yellow', icon: '💛', sub: 'Letter Y', category: 'alphabets', color: 'amber' },
    { id: 'alpha-z', label: 'Z - Zebra', speechText: 'Z for Zebra', icon: '🦓', sub: 'Letter Z', category: 'alphabets', color: 'green' },
  ];

  // Classroom quick communications
  const initialCommunication = [
    { id: 'comm-yes', label: 'YES', speechText: 'Yes', icon: '✅', sub: 'Agreement', category: 'communication', color: 'green' },
    { id: 'comm-no', label: 'NO', speechText: 'No', icon: '❌', sub: 'Disagreement', category: 'communication', color: 'rose' },
    { id: 'comm-help', label: 'HELP ME', speechText: 'I need help, please', icon: '🙋‍♂️', sub: 'Assistance', category: 'communication', color: 'amber' },
    { id: 'comm-done', label: 'FINISHED', speechText: 'I have finished my work', icon: '🏁', sub: 'Task Completed', category: 'communication', color: 'purple' },
    { id: 'comm-more', label: 'MORE', speechText: 'I want more, please', icon: '➕', sub: 'Request more', category: 'communication', color: 'blue' },
    { id: 'comm-stop', label: 'STOP', speechText: 'Please stop', icon: '🛑', sub: 'Need break', category: 'communication', color: 'rose' },
    { id: 'comm-thanks', label: 'THANK YOU', speechText: 'Thank you very much', icon: '🙏', sub: 'Gratitude', category: 'communication', color: 'teal' },
    { id: 'comm-hungry', label: 'HUNGRY', speechText: 'I am hungry, I want food', icon: '🥪', sub: 'Meal request', category: 'communication', color: 'amber' },
    { id: 'comm-play', label: 'PLAY', speechText: 'I want to play', icon: '🧩', sub: 'Recreation', category: 'communication', color: 'green' },
  ];

  const [cards, setCards] = useState([
    ...initialNumbers,
    ...initialAlphabets,
    ...initialCommunication,
    { id: 'cust-1', label: 'Science: Plant', speechText: 'Plants need water and sunlight to grow', icon: '🌱', sub: 'Biology topic', category: 'science', color: 'green', isCustom: true },
    { id: 'cust-2', label: 'Color: Blue', speechText: 'The color is blue', icon: '🎨', sub: 'Art / Colors', category: 'custom', color: 'blue', isCustom: true }
  ]);

  const handleCardClick = (card) => {
    setLastSpoken(card);
    if (soundEnabled) {
      speechService.speak(card.speechText || card.label);
    }
    if (onButtonSpoken) {
      onButtonSpoken(card);
    }
  };

  const handleAddButton = (newButton) => {
    setCards([newButton, ...cards]);
  };

  const handleDeleteCard = (e, id) => {
    e.stopPropagation();
    setCards(cards.filter((c) => c.id !== id));
  };

  // Filter cards by category and search
  const filteredCards = cards.filter((card) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'custom'
        ? card.isCustom
        : card.category === activeTab;

    const matchesSearch =
      card.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.speechText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.sub && card.sub.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="subject-board-container">
      {/* Board Header & Controls */}
      <div className="board-header">
        <div className="board-title-group">
          <div className="subject-badge-icon">📚</div>
          <div>
            <h3 className="board-heading">Subject-Wise & Customizable AAC Board</h3>
            <p className="board-subtext">
              High-visibility assistive tiles for Numbers, Alphabets, and custom learning units
            </p>
          </div>
        </div>

        <div className="board-actions">
          <button
            className="customize-btn"
            onClick={() => setIsModalOpen(true)}
            title="Create a new customized subject button"
          >
            <span className="plus-icon">✨</span> + Add Custom Button
          </button>
        </div>
      </div>

      {/* Speech Output Announcement Banner */}
      <div className="speech-display-strip">
        <div className="speech-speaker-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </div>
        <div className="speech-text-wrap">
          <span className="speech-label">Spoken Output:</span>
          <span className="speech-phrase">
            {lastSpoken ? `"${lastSpoken.speechText || lastSpoken.label}"` : 'Tap any tile below to speak aloud'}
          </span>
        </div>
        {lastSpoken && (
          <button
            className="repeat-speech-btn"
            onClick={() => handleCardClick(lastSpoken)}
            title="Repeat voice output"
          >
            🔄 Repeat
          </button>
        )}
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="filter-and-search-bar">
        <div className="category-tabs" role="tablist">
          <button
            className={`tab-btn ${activeTab === 'numbers' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('numbers')}
            role="tab"
          >
            🔢 Numbers ({cards.filter((c) => c.category === 'numbers').length})
          </button>

          <button
            className={`tab-btn ${activeTab === 'alphabets' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('alphabets')}
            role="tab"
          >
            🔤 Alphabets ({cards.filter((c) => c.category === 'alphabets').length})
          </button>

          <button
            className={`tab-btn ${activeTab === 'communication' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('communication')}
            role="tab"
          >
            💬 Daily AAC Needs ({cards.filter((c) => c.category === 'communication').length})
          </button>

          <button
            className={`tab-btn ${activeTab === 'custom' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('custom')}
            role="tab"
          >
            ✨ Custom Created ({cards.filter((c) => c.isCustom).length})
          </button>

          <button
            className={`tab-btn ${activeTab === 'all' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('all')}
            role="tab"
          >
            All Tiles ({cards.length})
          </button>
        </div>

        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search tiles (e.g. Apple, 5, Help)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>
      </div>

      {/* Tiles Grid */}
      <div className="assistive-tiles-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => {
            const isCurrentlyActive = lastSpoken?.id === card.id;
            return (
              <div
                key={card.id}
                className={`assistive-card color-${card.color || 'blue'} ${
                  isCurrentlyActive ? 'tile-active-highlight' : ''
                }`}
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(card)}
              >
                {card.isCustom && (
                  <button
                    className="delete-custom-pill"
                    onClick={(e) => handleDeleteCard(e, card.id)}
                    title="Delete custom card"
                  >
                    ×
                  </button>
                )}
                <div className="card-symbol" role="img" aria-label={card.label}>
                  {card.icon}
                </div>
                <div className="card-label-large">{card.label}</div>
                {card.sub && <div className="card-sub">{card.sub}</div>}
                <div className="audio-wave-hint">
                  <span></span><span></span><span></span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-cards-placeholder">
            <p>No buttons found matching "{searchQuery}".</p>
            <button className="add-quick-btn" onClick={() => setIsModalOpen(true)}>
              + Add "{searchQuery}" as a custom button
            </button>
          </div>
        )}
      </div>

      {/* Add Custom Button Modal */}
      <AddButtonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddButton={handleAddButton}
        activeCategory={activeTab}
      />
    </div>
  );
}

