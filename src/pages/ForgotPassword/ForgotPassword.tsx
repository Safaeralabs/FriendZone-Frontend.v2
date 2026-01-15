import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  if (sent) {
    return (
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => navigate('/login')}>
          ← Back to Login
        </button>

        <div className={styles.content}>
          <div className={styles.successIcon}>✉️</div>
          <h1 className={styles.title}>Check your email</h1>
          <p className={styles.subtitle}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className={styles.description}>
            Click the link in the email to reset your password. If you don't see it, check your
            spam folder.
          </p>

          <button className={styles.primaryBtn} onClick={() => navigate('/login')}>
            Back to Login
          </button>

          <div className={styles.footer}>
            <span className={styles.footerText}>Didn't receive the email?</span>
            <button className={styles.footerLink} onClick={() => setSent(false)}>
              Resend
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>🔒</div>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Forgot password?</h1>
          <p className={styles.subtitle}>
            No worries, we'll send you reset instructions
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <button className={styles.backLink} onClick={() => navigate('/login')}>
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;