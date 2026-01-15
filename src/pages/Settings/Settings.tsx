import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import styles from './Settings.module.css';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showDistance, setShowDistance] = useState(true);

  // Tu tipo UserProfile no tiene "email".
  // Mostramos un valor seguro (si existe username/name) o "Not set".
  const emailLabel = useMemo(() => {
    // Ajusta estas keys si en tu UserProfile tienen otro nombre
    const anyUser = user as unknown as { username?: string; name?: string } | null | undefined;
    return anyUser?.username || anyUser?.name || 'Not set';
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.content}>
        {/* Account Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Account</h2>
          <div className={styles.settingsList}>
            <button className={styles.settingItem} onClick={() => navigate('/profile/edit')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>👤</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Edit Profile</h3>
                  <p className={styles.settingDescription}>Update your name, bio, and interests</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>

            <button className={styles.settingItem} onClick={() => navigate('/settings/change-password')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>🔒</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Change Password</h3>
                  <p className={styles.settingDescription}>Update your password</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>

            {/* Mantengo el item "Email Address", pero sin user.email para que compile */}
            <button className={styles.settingItem} onClick={() => navigate('/settings/email')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>📧</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Email Address</h3>
                  <p className={styles.settingDescription}>{emailLabel}</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>
          </div>
        </section>

        {/* Privacy Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Privacy</h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>📍</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Location Sharing</h3>
                  <p className={styles.settingDescription}>Show your location to nearby users</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={locationSharing}
                  onChange={e => setLocationSharing(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>📏</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Show Distance</h3>
                  <p className={styles.settingDescription}>Display distance on your profile</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={showDistance}
                  onChange={e => setShowDistance(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <button className={styles.settingItem} onClick={() => navigate('/settings/blocked')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>🚫</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Blocked Users</h3>
                  <p className={styles.settingDescription}>Manage blocked accounts</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Notifications</h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>🔔</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Push Notifications</h3>
                  <p className={styles.settingDescription}>Get notified about new hangouts</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={e => setNotifications(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <button className={styles.settingItem} onClick={() => navigate('/settings/notifications')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>⚙️</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Notification Preferences</h3>
                  <p className={styles.settingDescription}>Customize what you receive</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>
          </div>
        </section>

        {/* Support Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Support</h2>
          <div className={styles.settingsList}>
            <button className={styles.settingItem} onClick={() => navigate('/help')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>❓</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Help Center</h3>
                  <p className={styles.settingDescription}>Get help and FAQs</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>

            <button className={styles.settingItem} onClick={() => navigate('/settings/feedback')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>💬</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Send Feedback</h3>
                  <p className={styles.settingDescription}>Help us improve</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>

            <button className={styles.settingItem} onClick={() => navigate('/settings/report')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>⚠️</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Report a Problem</h3>
                  <p className={styles.settingDescription}>Let us know about issues</p>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>
          </div>
        </section>

        {/* Legal Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Legal</h2>
          <div className={styles.settingsList}>
            <button className={styles.settingItem} onClick={() => navigate('/terms')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>📄</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Terms of Service</h3>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>

            <button className={styles.settingItem} onClick={() => navigate('/privacy')}>
              <div className={styles.settingInfo}>
                <span className={styles.settingIcon}>🔐</span>
                <div className={styles.settingText}>
                  <h3 className={styles.settingLabel}>Privacy Policy</h3>
                </div>
              </div>
              <span className={styles.settingArrow}>→</span>
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.appInfo}>
            <p className={styles.appVersion}>Friendzone v1.0.0</p>
            <p className={styles.appCopyright}>© 2025 Friendzone Inc.</p>
          </div>
        </section>

        {/* Danger Zone */}
        <section className={styles.section}>
          <div className={styles.dangerZone}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <span className={styles.btnIcon}>🚪</span>
              Log Out
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteAccount}>
              <span className={styles.btnIcon}>🗑️</span>
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
