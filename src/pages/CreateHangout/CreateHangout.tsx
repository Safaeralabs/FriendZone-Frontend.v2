import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/context/ToastContext';
import { Hangout } from '@/types';
import styles from './CreateHangout.module.css';

const CreateHangout: React.FC = () => {
  const navigate = useNavigate();
  const { addHangout, user } = useApp();
  const { showToast } = useToast();
  
  const [title, setTitle] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('Active');
  const [date, setDate] = useState('2024-10-14');
  const [time, setTime] = useState('18:30');
  const [capacity, setCapacity] = useState(4);
  const [visibility, setVisibility] = useState<'friends' | 'public'>('friends');
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const vibes = ['Active', 'Chill', 'Foodie', 'Night Out', 'Creative'];

  const handleSubmit = () => {
    if (!title.trim()) {
      showToast('Please add a title for your hangout', 'error');
      return;
    }

    const newHangout: Hangout = {
      id: `hangout-${Date.now()}`,
      type: 'community',
      title: title.trim(),
      description: title.trim(),
      vibe: [selectedVibe],
      time: new Date(`${date}T${time}`).toISOString(),
      capacity,
      spotsLeft: capacity - 1,
      hostId: user.id,
      hostName: user.name,
      locationLocked: true,
      visibility: visibility === 'public' ? 'public' : 'invite-only',
      plan: ['Meet up', 'Hang out', 'Have fun'],
      groupTags: user.interests.slice(0, 3),
      languages: user.languages,
      participants: [{ id: user.id, name: user.name, status: 'host' }],
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    addHangout(newHangout);
    showToast('Hangout created!', 'success');
    navigate('/');
  };

  const incrementCapacity = () => {
    if (capacity < 20) setCapacity(capacity + 1);
  };

  const decrementCapacity = () => {
    if (capacity > 2) setCapacity(capacity - 1);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
          Cancel
        </button>
        <h1 className={styles.title}>Create a Hangout</h1>
        <button className={styles.postBtn} onClick={handleSubmit}>
          Post
        </button>
      </div>

      <div className={styles.content}>
        {/* Main Input */}
        <div className={styles.mainSection}>
          <textarea
            className={styles.mainInput}
            placeholder="What's the plan?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            rows={3}
          />
          <p className={styles.placeholder}>
            e.g., Sunset hike at the park or coffee and conversing...
          </p>
        </div>

        {/* The Vibe */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>THE VIBE</h3>
          <div className={styles.vibeGrid}>
            {vibes.map((vibe) => (
              <button
                key={vibe}
                className={`${styles.vibeChip} ${selectedVibe === vibe ? styles.selected : ''}`}
                onClick={() => setSelectedVibe(vibe)}
              >
                {vibe}
              </button>
            ))}
          </div>
        </div>

        {/* When */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>WHEN</h3>
          <div className={styles.whenGrid}>
            <div className={styles.whenItem}>
              <div className={styles.whenIcon}>📅</div>
              <div className={styles.whenInfo}>
                <span className={styles.whenLabel}>Date</span>
                <input
                  type="date"
                  className={styles.whenValue}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.whenItem}>
              <div className={styles.whenIcon}>🕐</div>
              <div className={styles.whenInfo}>
                <span className={styles.whenLabel}>Time</span>
                <input
                  type="time"
                  className={styles.whenValue}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Who & How */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>WHO & HOW</h3>
          
          {/* Capacity */}
          <div className={styles.capacityRow}>
            <div className={styles.capacityLabel}>
              <span className={styles.capacityIcon}>👥</span>
              <span>Capacity</span>
            </div>
            <div className={styles.capacityControl}>
              <button 
                className={styles.capacityBtn}
                onClick={decrementCapacity}
                disabled={capacity <= 2}
              >
                −
              </button>
              <span className={styles.capacityValue}>{capacity}</span>
              <button 
                className={styles.capacityBtn}
                onClick={incrementCapacity}
                disabled={capacity >= 20}
              >
                +
              </button>
            </div>
          </div>

          {/* Visibility */}
          <div className={styles.visibilityRow}>
            <div className={styles.visibilityLabel}>
              <span className={styles.visibilityIcon}>👁️</span>
              <span>Visibility</span>
            </div>
            <div className={styles.visibilityToggle}>
              <button
                className={`${styles.visibilityBtn} ${visibility === 'friends' ? styles.active : ''}`}
                onClick={() => setVisibility('friends')}
              >
                Friends
              </button>
              <button
                className={`${styles.visibilityBtn} ${visibility === 'public' ? styles.active : ''}`}
                onClick={() => setVisibility('public')}
              >
                Public
              </button>
            </div>
          </div>
        </div>

        {/* Post Button */}
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Post Hangout
        </button>

        {/* Location Picker */}
        <div className={styles.locationSection}>
          <button 
            className={styles.locationBtn}
            onClick={() => setShowLocationPicker(!showLocationPicker)}
          >
            <span className={styles.locationIcon}>📍</span>
            Add Location
          </button>
          {showLocationPicker && (
            <div className={styles.mapPlaceholder}>
              <p className={styles.mapText}>Map integration coming soon</p>
              <p className={styles.mapSubtext}>Location will be shared after approval</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateHangout;