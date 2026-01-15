import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        updateUser({
          id: 'user-1',
          name: 'Demo User',
        });
        navigate('/');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
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
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to continue to Friendzone</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleLogin}>
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

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className={styles.forgotBtn}
            type="button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            className={styles.submitBtn} 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or</span>
          <span className={styles.dividerLine}></span>
        </div>

        {/* Social Login */}
        <div className={styles.socialBtns}>
          <button className={styles.socialBtn}>
            <span className={styles.socialIcon}>🔵</span>
            Continue with Google
          </button>
          <button className={styles.socialBtn}>
            <span className={styles.socialIcon}>📘</span>
            Continue with Facebook
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>Don't have an account?</span>
          <button className={styles.footerLink} onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;