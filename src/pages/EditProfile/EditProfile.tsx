import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    username: '@alexj',
    bio: 'Coffee enthusiast ☕ | Love deep conversations | Always down for spontaneous adventures',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    email: 'alex.johnson@email.com',
  });

  const [interests, setInterests] = useState([
    'Coffee',
    'Philosophy',
    'Hiking',
    'Photography',
    'Live Music',
    'Cooking',
  ]);

  const [newInterest, setNewInterest] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const availableInterests = [
    'Art',
    'Books',
    'Gaming',
    'Yoga',
    'Running',
    'Movies',
    'Travel',
    'Food',
    'Tech',
    'Fitness',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
      setHasChanges(true);
    }
    setNewInterest('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving profile:', { ...formData, interests });
    // Aquí llamarías al backend
    navigate('/profile');
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Discard changes?')) {
        navigate('/profile');
      }
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.cancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <h1 className={styles.headerTitle}>Edit Profile</h1>
        <button
          className={`${styles.saveBtn} ${hasChanges ? styles.active : ''}`}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Profile Photo */}
        <div className={styles.section}>
          <div className={styles.photoSection}>
            <div className={styles.photoWrapper}>
              <div className={styles.photo}>AJ</div>
              <button className={styles.editPhotoBtn}>
                <span className={styles.cameraIcon}>📷</span>
              </button>
            </div>
            <button className={styles.changePhotoBtn}>Change Photo</button>
          </div>
        </div>

        {/* Basic Info */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Information</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className={styles.input}
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              className={styles.input}
              value={formData.username}
              onChange={e => handleInputChange('username', e.target.value)}
              placeholder="@username"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea
              className={styles.textarea}
              value={formData.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
              placeholder="Tell others about yourself..."
              rows={4}
              maxLength={150}
            />
            <span className={styles.charCount}>{formData.bio.length}/150</span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className={styles.input}
              value={formData.location}
              onChange={e => handleInputChange('location', e.target.value)}
              placeholder="City, State"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="tel"
              className={styles.input}
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Interests */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interests & Hobbies</h2>

          <div className={styles.interestsGrid}>
            {interests.map(interest => (
              <div key={interest} className={styles.interestTag}>
                <span className={styles.interestText}>{interest}</span>
                <button
                  className={styles.removeInterest}
                  onClick={() => handleRemoveInterest(interest)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.addInterestSection}>
            <input
              type="text"
              className={styles.addInterestInput}
              value={newInterest}
              onChange={e => setNewInterest(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest(newInterest);
                }
              }}
              placeholder="Add an interest..."
            />
            <button
              className={styles.addInterestBtn}
              onClick={() => handleAddInterest(newInterest)}
              disabled={!newInterest.trim()}
            >
              Add
            </button>
          </div>

          <div className={styles.suggestedInterests}>
            <p className={styles.suggestedLabel}>Suggested:</p>
            <div className={styles.suggestedGrid}>
              {availableInterests
                .filter(i => !interests.includes(i))
                .map(interest => (
                  <button
                    key={interest}
                    className={styles.suggestedTag}
                    onClick={() => handleAddInterest(interest)}
                  >
                    + {interest}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Privacy</h2>

          <div className={styles.privacyOptions}>
            <div className={styles.privacyOption}>
              <div className={styles.privacyInfo}>
                <h3 className={styles.privacyTitle}>Show Profile to</h3>
                <p className={styles.privacyDescription}>Who can see your profile</p>
              </div>
              <select className={styles.select}>
                <option>Everyone</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>

            <div className={styles.privacyOption}>
              <div className={styles.privacyInfo}>
                <h3 className={styles.privacyTitle}>Show Hangout History</h3>
                <p className={styles.privacyDescription}>Display past hangouts on profile</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.privacyOption}>
              <div className={styles.privacyInfo}>
                <h3 className={styles.privacyTitle}>Allow Friend Requests</h3>
                <p className={styles.privacyDescription}>Let others send you requests</p>
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.danger}`}>Danger Zone</h2>
          <button className={styles.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;