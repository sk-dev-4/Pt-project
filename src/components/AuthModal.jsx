import { useState } from 'react';

export default function AuthModal({
  isOpen,
  initialMode = 'login', // 'login' or 'signup'
  onClose,
  onLoginSuccess
}) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('teacher'); // 'parent' or 'teacher'

  // Validation Errors
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Validation function
  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'signup') {
      if (!fullName.trim()) {
        errs.fullName = 'Full Name is required.';
      }
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address (e.g., user@example.com).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }

    if (mode === 'signup') {
      if (!confirmPassword) {
        errs.confirmPassword = 'Confirmation password is required.';
      } else if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match.';
      }

      if (!accountType) {
        errs.accountType = 'Please select your account type.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulation success
    const userData = {
      name: mode === 'signup' ? fullName : (accountType === 'teacher' ? 'Ms. Sarah Jenkins' : 'Mr. Rajesh Patel'),
      email: email,
      role: accountType,
      rememberMe: rememberMe
    };

    onLoginSuccess(userData);
    onClose();
  };

  // Quick 1-click Demo Fillers for University Presentation
  const handleQuickFill = (role) => {
    setAccountType(role);
    setErrors({});
    if (role === 'teacher') {
      setEmail('teacher.sarah@sathyabama.ac.in');
      setPassword('Teacher@2026');
      setFullName('Ms. Sarah Jenkins (AIML Faculty)');
    } else {
      setEmail('parent.rajesh@nis.edu');
      setPassword('Parent@2026');
      setFullName('Mr. Rajesh Patel (Parent)');
    }
  };

  return (
    <div className="nis-auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="nis-auth-container">
        {/* Modal Close Button */}
        <button
          type="button"
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Close authentication dialog"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <span className="logo-icon">🗣️</span>
            <span className="logo-txt">NIS Assistive System</span>
          </div>
          <h2 id="auth-modal-title" className="auth-title">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create an Account'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Access the teacher configuration dashboard or parent student portal'
              : 'Join the NIS assistive communication platform as a Teacher or Parent'}
          </p>

          {/* Tab Selector */}
          <div className="auth-tabs-pill" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setErrors({});
              }}
            >
              Log In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setMode('signup');
                setErrors({});
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="quick-demo-shortcuts">
          <span className="shortcuts-label">Quick Demo Access:</span>
          <div className="shortcut-btn-row">
            <button
              type="button"
              className="shortcut-btn teacher-shortcut"
              onClick={() => handleQuickFill('teacher')}
            >
              👩‍🏫 Teacher Login Preset
            </button>
            <button
              type="button"
              className="shortcut-btn parent-shortcut"
              onClick={() => handleQuickFill('parent')}
            >
              👨‍👩‍👧 Parent Login Preset
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Sign Up Fields */}
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label htmlFor="reg-fullname" className="form-label">
                  Full Name <span className="req-star">*</span>
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  className={`nis-input ${errors.fullName ? 'has-error' : ''}`}
                  placeholder="e.g. Dr. Rajesh Kumar or Priya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                />
                {errors.fullName && (
                  <span id="fullname-error" className="form-error-msg" role="alert">
                    ⚠️ {errors.fullName}
                  </span>
                )}
              </div>

              {/* Account Type Selection */}
              <div className="form-group">
                <label className="form-label">
                  Account Type <span className="req-star">*</span>
                </label>
                <div className="account-type-grid" role="radiogroup" aria-label="Select Account Type">
                  <label className={`account-type-radio ${accountType === 'parent' ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="parent"
                      checked={accountType === 'parent'}
                      onChange={() => setAccountType('parent')}
                    />
                    <div className="radio-content">
                      <span className="radio-icon">👨‍👩‍👧</span>
                      <div>
                        <strong>Parent / Guardian</strong>
                        <small>Monitor student needs & requests</small>
                      </div>
                    </div>
                  </label>

                  <label className={`account-type-radio ${accountType === 'teacher' ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="teacher"
                      checked={accountType === 'teacher'}
                      onChange={() => setAccountType('teacher')}
                    />
                    <div className="radio-content">
                      <span className="radio-icon">👩‍🏫</span>
                      <div>
                        <strong>Special Educator / Teacher</strong>
                        <small>Customize 3 flexible hardware buttons</small>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="auth-email" className="form-label">
              Email Address <span className="req-star">*</span>
            </label>
            <input
              id="auth-email"
              type="email"
              className={`nis-input ${errors.email ? 'has-error' : ''}`}
              placeholder="e.g. faculty@sathyabama.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-error-msg" role="alert">
                ⚠️ {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="auth-password" className="form-label">
                Password <span className="req-star">*</span>
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  className="link-subtle"
                  onClick={() => setForgotPasswordNotice(!forgotPasswordNotice)}
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="input-with-icon">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                className={`nis-input ${errors.password ? 'has-error' : ''}`}
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="form-error-msg" role="alert">
                ⚠️ {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password (Sign Up Only) */}
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="reg-confirmpass" className="form-label">
                Confirm Password <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  id="reg-confirmpass"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`nis-input ${errors.confirmPassword ? 'has-error' : ''}`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirmpass-error' : undefined}
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '👁️' : '🔒'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirmpass-error" className="form-error-msg" role="alert">
                  ⚠️ {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Remember Me Checkbox (Log In) */}
          {mode === 'login' && (
            <div className="form-group checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me on this device</span>
              </label>
            </div>
          )}

          {/* Forgot Password Feedback Banner */}
          {forgotPasswordNotice && (
            <div className="info-banner" role="alert">
              ℹ️ <strong>Demonstration Note:</strong> In production, a secure password recovery email with a time-limited cryptographically signed token is sent to the registered email address.
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="nis-btn nis-btn-primary w-full btn-large">
            {mode === 'login' ? 'Log In to NIS System' : 'Create Account & Continue'}
          </button>

          {/* Switch Mode Footer */}
          <div className="auth-footer-switch">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="link-switch"
                  onClick={() => {
                    setMode('signup');
                    setErrors({});
                  }}
                >
                  Sign Up here
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  className="link-switch"
                  onClick={() => {
                    setMode('login');
                    setErrors({});
                  }}
                >
                  Log In here
                </button>
              </p>
            )}
          </div>
        </form>

        {/* Production Requirements Transparency Banner */}
        <div className="auth-architecture-note">
          <span className="note-glyph">ℹ️</span>
          <div>
            <strong>Backend Implementation Roadmap:</strong>
            <p>
              This is a fully functional frontend validation interface. Secure production deployment requires a Node.js/Express or Python/FastAPI backend with bcrypt password hashing, HTTPS/TLS encryption, JWT authentication tokens, and a relational database (PostgreSQL) or document store (MongoDB).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
