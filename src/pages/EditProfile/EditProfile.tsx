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
            <label class