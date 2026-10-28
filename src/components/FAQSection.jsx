import { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What is NIS?',
    answer:
      'NIS (Non-verbal Inclusive System) is an assistive technology project developed by students of Sathyabama Institute of Science and Technology, Department of Artificial Intelligence and Machine Learning (AIML), Section A5. It pairs an accessible five-button tactile hardware device with a modern web application to help physically challenged and non-verbal students communicate their basic physiological needs and participate in classroom lessons.'
  },
  {
    id: 'faq-2',
    question: 'Who can use this application?',
    answer:
      'The application is designed for three primary groups: (1) Special education teachers and classroom educators who customize button assignments and monitor student alerts; (2) Physically challenged students with limited speech or motor capabilities who use the tactile hardware panel; and (3) Parents and guardians who review daily communication activity and classroom engagement.'
  },
  {
    id: 'faq-3',
    question: 'How does the five-button panel work?',
    answer:
      'The hardware device features five large, tactile, high-contrast buttons designed for easy pressing. When a student presses a button, the system triggers two actions: it plays an audible voice message via Web Speech synthesis in the classroom, and logs the request to the teacher dashboard. The first two buttons are permanently fixed, while the other three change dynamically according to classroom subjects.'
  },
  {
    id: 'faq-4',
    question: 'Which two buttons have permanent functions?',
    answer:
      'Button 1 and Button 2 have permanent, non-editable functions: Button 1 is "Can I go to the restroom?" and Button 2 is "I need water." These buttons are hardcoded to ensure vital physiological and human dignity needs are always accessible and never accidentally overwritten or lost during subject changes.'
  },
  {
    id: 'faq-5',
    question: 'How can teachers customize the remaining three buttons?',
    answer:
      'Teachers log in to the NIS web application, navigate to the Teacher Customization Interface, select the subject being taught (English or Mathematics), and assign a specific letter (A–Z) or number (1–9) to Buttons 3, 4, and 5 using accessible dropdown controls. The changes update the hardware panel simulator in real time and can be saved with the "Save Configuration" button.'
  },
  {
    id: 'faq-6',
    question: 'How does the application support English and Mathematics periods?',
    answer:
      'During English periods, the web application populates the customization menus with letters A through Z, enabling students to answer phonics questions, spell simple words, or choose multiple-choice letters. During Mathematics periods, the system switches to numbers 1 through 9, allowing students to participate in counting, mental math, and arithmetic exercises.'
  },
  {
    id: 'faq-7',
    question: 'Does the web application currently communicate with the physical hardware?',
    answer:
      'Currently, this web application provides a full-fidelity interactive frontend simulation with real Web Speech audio synthesis and local state management. Direct communication with the physical hardware is part of our implementation roadmap: it will be established using an ESP32 or Arduino Wi-Fi microcontroller communicating over WebSockets or an MQTT broker (such as HiveMQ or Mosquitto), allowing real-time wireless synchronization between this web app and the physical 5-button tactile box.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState('faq-1');

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="nis-section nis-faq-section" aria-labelledby="faq-heading">
      <div className="nis-container">
        {/* Section Header */}
        <div className="nis-section-header">
          <div className="nis-pill-badge blue">
            <span className="pill-dot"></span>
            <span>Questions & Answers</span>
          </div>
          <h2 id="faq-heading" className="nis-section-title">Frequently Asked Questions</h2>
          <div className="nis-title-underline"></div>
          <p className="nis-section-lead">
            Comprehensive answers about the NIS project, hardware design, pedagogical button customization, and technical architecture.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-container" role="region" aria-label="Frequently Asked Questions">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq-index-badge">0{index + 1}</span>
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="faq-answer-pane"
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                  >
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
