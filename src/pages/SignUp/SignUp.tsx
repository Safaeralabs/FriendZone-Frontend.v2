import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding');
    }, 1000);
  };

  return (
    <div className={styles.page}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>🌊</div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.subtitle}>Join Friendzone and start connecting</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className={styles.hint}>Must be at least 8 characters</span>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={styles.input}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms Checkbox */}
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
            />
            <span className={styles.checkboxText}>
              I agree to the{' '}
              <button
                type="button"
                className={styles.link}
                onClick={() => navigate('/terms')}
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                className={styles.link}
                onClick={() => navigate('/privacy')}
              >
                Privacy Policy
              </button>
            </span>
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or sign up with</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Social Login */}
        <div className={styles.socialBtns}>
          <button className={styles.socialBtn} type="button">
            <span className={styles.socialIcon}>🔵</span>
            Continue with Google
          </button>
          <button className={styles.socialBtn} type="button">
            <span className={styles.socialIcon}>📘</span>
            Continue with Facebook
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>Already have an account?</span>
          <button className={styles.footerLink} onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;