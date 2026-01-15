import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './UserProfile.module.css';

interface UserData {
  id: string;
  name: string;
  username: string;
  location: string;
  bio: string;
  avatar: string;
  isFollowing: boolean;
  stats: {
    hangoutsAttended: number;
    reliability: number;
    mutualFriends: number;
  };
  vibes: Array<{ id: number; icon: string; label: string }>;
  languages: Array<{ code: string; flag: string; name: string; level: string }>;
  recentHangouts: Array<{
    id: string;
    title: string;
    date: string;
    image: string;
  }>;
  mutualFriends: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

// Mock data - esto vendría de la API
const mockUserData: UserData = {
  id: 'user-123',
  name: 'Sarah Chen',
  username: 'sarah_chen',
  location: 'San Francisco, CA',
  bio: 'Coffee enthusiast ☕ | Board game addict 🎲 | Always down for spontaneous adventures',
  avatar: 'SC',
  isFollowing: false,
  stats: {
    hangoutsAttended: 34,
    reliability: 96,
    mutualFriends: 5,
  },
  vibes: [
    { id: 1, icon: '☕', label: 'Coffee Lover' },
    { id: 2, icon: '🎲', label: 'Board Games' },
    { id: 3, icon: '🎨', label: 'Creative' },
    { id: 4, icon: '🌙', label: 'Night Owl' },
  ],
  languages: [
    { code: 'en', flag: '🇺🇸', name: 'English', level: '(Native)' },
    { code: 'zh', flag: '🇨🇳', name: 'Mandarin', level: '(Fluent)' },
  ],
  recentHangouts: [
    {
      id: '1',
      title: 'Board Game Night',
      date: 'Oct 12',
      image: '🎲',
    },
    {
      id: '2',
      title: 'Coffee & Chat',
      date: 'Oct 8',
      image: '☕',
    },
    {
      id: '3',
      title: 'Art Gallery Visit',
      date: 'Oct 3',
      image: '🎨',
    },
  ],
  mutualFriends: [
    { id: '1', name: 'Alex', avatar: 'AJ' },
    { id: '2', name: 'Mike', avatar: 'MJ' },
    { id: '3', name: 'Lisa', avatar: 'LP' },
    { id: '4', name: 'Tom', avatar: 'TW' },
    { id: '5', name: 'Emma', avatar: 'ER' },
  ],
};

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData>(mockUserData);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleFollow = () => {
    setUserData(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
    }));
  };

  const handleMessage = () => {
    // Navigate to messages
    navigate(`/messages/${userData.id}`);
  };

  const handleInvite = () => {
    // Open invite to hangout modal
    navigate('/create', { state: { inviteUser: userData.id } });
  };

  const handleBlock = () => {
    if (window.confirm(`Block ${userData.name}? They won't be able to see your profile or contact you.`)) {
      // Handle block
      console.log('User blocked');
    }
  };

  const handleReport = () => {
    navigate('/report', { state: { userId: userData.id, userName: userData.name } });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ←
        </button>
        <button className={styles.moreBtn} onClick={() => setShowMoreMenu(!showMoreMenu)}>
          ⋮
        </button>
        {showMoreMenu && (
          <div className={styles.moreMenu}>
            <button className={styles.menuItem} onClick={handleBlock}>
              <span className={styles.menuIcon}>🚫</span>
              Block User
            </button>
            <button className={styles.menuItem} onClick={handleReport}>
              <span className={styles.menuIcon}>⚠️</span>
              Report User
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>{userData.avatar}</div>
          {userData.stats.reliability >= 95 && (
            <div className={styles.badge}>⭐</div>
          )}
        </div>
        <h2 className={styles.name}>{userData.name}</h2>
        <p className={styles.username}>
          @{userData.username} • {userData.location}
        </p>
        <p className={styles.bio}>"{userData.bio}"</p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${userData.isFollowing ? styles.following : styles.follow}`}
            onClick={handleFollow}
          >
            <span className={styles.actionIcon}>{userData.isFollowing ? '✓' : '+'}</span>
            {userData.isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className={styles.actionBtn} onClick={handleMessage}>
            <span className={styles.actionIcon}>💬</span>
            Message
          </button>
          <button className={styles.actionBtn} onClick={handleInvite}>
            <span className={styles.actionIcon}>📨</span>
            Invite
          </button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{userData.stats.hangoutsAttended}</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>👥</span>
              HANGOUTS
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{userData.stats.reliability}%</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>⭐</span>
              RELIABILITY
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{userData.stats.mutualFriends}</div>
            <div className={styles.statLabel}>
              <span className={styles.statIcon}>🤝</span>
              MUTUALS
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Mutual Friends */}
        {userData.mutualFriends.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              MUTUAL FRIENDS ({userData.mutualFriends.length})
            </h3>
            <div className={styles.mutualsGrid}>
              {userData.mutualFriends.map(friend => (
                <button
                  key={friend.id}
                  className={styles.mutualCard}
                  onClick={() => navigate(`/user/${friend.id}`)}
                >
                  <div className={styles.mutualAvatar}>{friend.avatar}</div>
                  <span className={styles.mutualName}>{friend.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vibes */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>VIBES</h3>
          <div className={styles.vibesGrid}>
            {userData.vibes.map(vibe => (
              <div key={vibe.id} className={styles.vibePill}>
                <span className={styles.vibeIcon}>{vibe.icon}</span>
                <span className={styles.vibeLabel}>{vibe.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>LANGUAGES</h3>
          <div className={styles.languagesGrid}>
            {userData.languages.map(lang => (
              <div key={lang.code} className={styles.languageItem}>
                <span className={styles.languageFlag}>{lang.flag}</span>
                <span className={styles.languageName}>
                  {lang.name} <span className={styles.languageLevel}>{lang.level}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Hangouts */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>RECENT HANGOUTS</h3>
          <div className={styles.hangoutsGrid}>
            {userData.recentHangouts.map(hangout => (
              <div key={hangout.id} className={styles.hangoutCard}>
                <div className={styles.hangoutImage}>{hangout.image}</div>
                <div className={styles.hangoutInfo}>
                  <h4 className={styles.hangoutTitle}>{hangout.title}</h4>
                  <p className={styles.hangoutDate}>{hangout.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className={styles.safetyNotice}>
          <div className={styles.safetyIcon}>🛡️</div>
          <div className={styles.safetyText}>
            <h4 className={styles.safetyTitle}>Stay Safe</h4>
            <p className={styles.safetyDescription}>
              Always meet in public places and let someone know where you're going.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;