import React, { useState } from 'react';

export default function LoginPlaceholder({ onLoginSuccess }) {
  const [role, setRole] = useState('parent'); // Default to Parent portal
  const [parentName, setParentName] = useState('Mr. Rajesh Patel');
  const [childName, setChildName] = useState('Aarav Patel');
  const [childClass, setChildClass] = useState('Class 1A - Primary AAC & Speech');
  const [email, setEmail] = useState('rajesh.patel@parent.nis.edu');
  const [password, setPassword] = useState('••••••••');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'parent') {
      setEmail('rajesh.patel@parent.nis.edu');
    } else {
      setEmail('sarah.teacher@nis.edu');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'parent') {
      onLoginSuccess({
        role: 'parent',
        name: parentName,
        childName: childName,
        childClass: childClass,
        email: email,
        initials: 'RP'
      });
    } else {
      onLoginSuccess({
        role: 'teacher',
        name: 'Ms. Sarah Jenkins',
        email: email,
        roleTitle: 'Lead Special Needs Educator',
        initials: 'SJ'
      });
    }
  };

  return (
    <div className="login-bridge-wrapper">
      <div className="login-bridge-card">
        <div className="login-badge-header">
          <span className="system-icon-large">🗣️</span>
          <h2>NIS Assistive Communication System</h2>
          <p className="login-sub">Inclusive AAC & Special Education Portal for Students with Disabilities</p>
        </div>

        <form onSubmit={handleSubmit} className="mock-login-form">
          <div className="form-group">
            <label>Select User Role</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-pill ${role === 'parent' ? 'active' : ''}`}
                onClick={() => handleRoleChange('parent')}
              >
                👨‍👩‍👧 Parent Portal (Child Progress & Reports)
              </button>
              <button
                type="button"
                className={`role-pill ${role === 'teacher' ? 'active' : ''}`}
                onClick={() => handleRoleChange('teacher')}
              >
                👩‍🏫 Teacher Dashboard
              </button>
            </div>
          </div>

          {role === 'parent' ? (
            <>
              <div className="form-group">
                <label>Parent / Guardian Name</label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="text-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Child / Student Name</label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="text-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Enrolled Classroom</label>
                <select
                  value={childClass}
                  onChange={(e) => setChildClass(e.target.value)}
                  className="select-input"
                >
                  <option value="Class 1A - Primary AAC & Speech">Class 1A - Primary AAC & Speech</option>
                  <option value="Class 2B - Life Skills & Phonics">Class 2B - Life Skills & Phonics</option>
                  <option value="Class 3 - Sunshine Explorers">Class 3 - Sunshine Explorers</option>
                </select>
              </div>

              <div className="form-group">
                <label>Registered Parent Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Faculty Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-input"
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="login-submit-btn">
            {role === 'parent'
              ? 'Access Parent Portal & Communication Reports →'
              : 'Access Teacher Dashboard →'}
          </button>
        </form>

        <div className="login-footer-info">
          <span>Official NIS Assistive Education Platform • Academic Year 2026</span>
        </div>
      </div>
    </div>
  );
}
