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
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'community' | 'offer' | 'event-linked'>('community');
  const [time, setTime] = useState('');
  const [capacity, setCapacity] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHangout: Hangout = {
      id: `hangout-${Date.now()}`,
      type,
      title,
      description,
      vibe: ['Chill', 'Friendly'],
      time: new Date(time).toISOString(),
      capacity,
      spotsLeft: capacity - 1,
      hostId: user.id,
      hostName: user.name,
      locationLocked: true,
      visibility: 'public',
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.cancel} onClick={() => navigate(-1)}>Cancel</button>
        <h1 className={styles.title}>Create Hangout</h1>
        <div style={{ width: 60 }}></div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's the plan?"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Give a bit more context..."
            rows={4}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Type</label>
          <div className={styles.typeButtons}>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === 'community' ? styles.active : ''}`}
              onClick={() => setType('community')}
            >
              Community
            </button>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === 'offer' ? styles.active : ''}`}
              onClick={() => setType('offer')}
            >
              Venue Offer
            </button>
            <button
              type="button"
              className={`${styles.typeBtn} ${type === 'event-linked' ? styles.active : ''}`}
              onClick={() => setType('event-linked')}
            >
              Event Group
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>When</label>
          <input
            type="datetime-local"
            className={styles.input}
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Group size</label>
          <input
            type="number"
            className={styles.input}
            value={capacity}
            onChange={e => setCapacity(parseInt(e.target.value))}
            min="2"
            max="20"
            required
          />
        </div>

        <button type="submit" className={styles.submit}>
          Create Hangout
        </button>
      </form>
    </div>
  );
};

export default CreateHangout;