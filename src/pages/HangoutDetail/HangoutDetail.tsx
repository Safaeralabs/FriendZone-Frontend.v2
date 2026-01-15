import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './HangoutDetail.module.css';

type HangoutStatus = 'join' | 'request_sent' | 'joined' | 'hosting' | 'full' | 'expired' | 'declined';

interface Request {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    mutualFriends: number;
  };
  message?: string;
  createdAt: string;
}

interface Attendee {
  id: string;
  name: string;
  avatar: string;
  status: 'confirmed' | 'pending';
  mutualFriends?: number;
}

const HangoutDetail: React.FC = () => {
  const navigate = useNavigate();
  const { hangoutId } = useParams();
  
  // Mock user status - esto vendría del backend
  const [userStatus, setUserStatus] = useState<HangoutStatus>('hosting'); // Cambia esto para probar
  const [unreadMessages, setUnreadMessages] = useState(3);

  // Mock data
  const hangout = {
    id: hangoutId,
    title: 'Coffee & Deep Convos',
    emoji: '☕',
    gradient: 'linear-gradient(135deg, #8B6914, #D4A574)',
    date: 'Today',
    time: '2:30 PM',
    timeUntil: 'In 3 hours',
    location: {
      name: 'Blue Bottle Coffee',
      address: '66 Mint St, San Francisco',
      distance: '0.8 mi away',
    },
    host: {
      id: 'host-1',
      name: 'Sarah Chen',
      avatar: 'SC',
      bio: 'Coffee enthusiast & conversation starter',
    },
    description:
      'Let\'s grab coffee and have meaningful conversations. No small talk—let\'s dive into topics that matter: dreams, fears, life philosophies, or whatever\'s on your mind.',
    vibe: ['Deep Talks', 'Chill', 'Authentic'],
    attendees: [
      { id: '1', name: 'Mike', avatar: 'MJ', status: 'confirmed', mutualFriends: 2 },
      { id: '2', name: 'Lisa', avatar: 'LP', status: 'confirmed', mutualFriends: 5 },
      { id: '3', name: 'Tom', avatar: 'TW', status: 'confirmed', mutualFriends: 1 },
    ] as Attendee[],
    maxAttendees: 6,
    requirements: ['Be open-minded', 'Come with curiosity', 'No phones at table'],
    isPrivate: false,
  };

  const pendingRequests: Request[] = [
    {
      id: '1',
      user: {
        id: 'req-1',
        name: 'Alex Johnson',
        avatar: 'AJ',
        bio: 'Love deep conversations over coffee',
        mutualFriends: 3,
      },
      message: 'Would love to join! I\'m really into philosophy and existential topics.',
      createdAt: '5m ago',
    },
    {
      id: '2',
      user: {
        id: 'req-2',
        name: 'Emma Davis',
        avatar: 'ED',
        bio: 'Always looking for authentic connections',
        mutualFriends: 1,
      },
      message: 'This sounds perfect! Been looking for real convos.',
      createdAt: '12m ago',
    },
  ];

  const spotsLeft = hangout.maxAttendees - hangout.attendees.length - 1; // -1 for host
  const hasRequests = pendingRequests.length > 0;

  const handleRequestToJoin = () => {
    setUserStatus('request_sent');
  };

  const handleCancelRequest = () => {
    setUserStatus('join');
  };

  const handleLeaveHangout = () => {
    if (window.confirm('Are you sure you want to leave this hangout?')) {
      setUserStatus('join');
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting request:', requestId);
    // Llamada al backend
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining request:', requestId);
    // Llamada al backend
  };

  const handleOpenChat = () => {
    navigate(`/chat/${hangoutId}`);
  };

  const canAccessChat = userStatus === 'joined' || userStatus === 'hosting';
  const isHost = userStatus === 'hosting';

  return (
    <div className={styles.page}>
      {/* Fixed Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ←
        </button>
        <button className={styles.shareBtn}>
          <span className={styles.shareIcon}>↗</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className={styles.hero} style={{ background: hangout.gradient }}>
        <div className={styles.heroEmoji}>{hangout.emoji}</div>
        <div className={styles.heroOverlay}>
          <div className={styles.countdown}>
            <span className={styles.countdownLabel}>STARTS</span>
            <span className={styles.countdownValue}>{hangout.timeUntil}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{hangout.title}</h1>
          <div className={styles.vibeTagsScroll}>
            {hangout.vibe.map((vibe, index) => (
              <span key={index} className={styles.vibeTag}>
                {vibe}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>🕐</span>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>When</span>
              <span className={styles.infoValue}>
                {hangout.date} • {hangout.time}
              </span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📍</span>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Where</span>
              <span className={styles.infoValue}>{hangout.location.name}</span>
              <span className={styles.infoSubtext}>{hangout.location.distance}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>👥</span>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Who</span>
              <span className={styles.infoValue}>
                {hangout.attendees.length + 1}/{hangout.maxAttendees}
              </span>
              <span className={styles.infoSubtext}>{spotsLeft} spots left</span>
            </div>
          </div>
        </div>

        {/* Pending Requests (Solo para Host) */}
        {isHost && hasRequests && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                Pending Requests ({pendingRequests.length})
              </h3>
            </div>
            <div className={styles.requestsList}>
              {pendingRequests.map(request => (
                <div key={request.id} className={styles.requestCard}>
                  <button
                    className={styles.requestUser}
                    onClick={() => navigate(`/user/${request.user.id}`)}
                  >
                    <div className={styles.requestAvatar}>{request.user.avatar}</div>
                    <div className={styles.requestInfo}>
                      <div className={styles.requestHeader}>
                        <h4 className={styles.requestName}>{request.user.name}</h4>
                        <span className={styles.requestTime}>{request.createdAt}</span>
                      </div>
                      <p className={styles.requestBio}>{request.user.bio}</p>
                      {request.message && (
                        <p className={styles.requestMessage}>"{request.message}"</p>
                      )}
                      {request.user.mutualFriends > 0 && (
                        <span className={styles.mutualBadge}>
                          {request.user.mutualFriends} mutual friends
                        </span>
                      )}
                    </div>
                  </button>
                  <div className={styles.requestActions}>
                    <button
                      className={styles.declineBtn}
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline
                    </button>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>About this hangout</h3>
          <p className={styles.description}>{hangout.description}</p>
        </div>

        {/* Host Card */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Hosted by</h3>
          <button className={styles.hostCard} onClick={() => navigate(`/user/${hangout.host.id}`)}>
            <div className={styles.hostAvatar}>{hangout.host.avatar}</div>
            <div className={styles.hostInfo}>
              <h4 className={styles.hostName}>{hangout.host.name}</h4>
              <p className={styles.hostBio}>{hangout.host.bio}</p>
            </div>
            <span className={styles.hostArrow}>→</span>
          </button>
        </div>

        {/* Attendees */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              Who's going ({hangout.attendees.length})
            </h3>
          </div>
          <div className={styles.attendeesGrid}>
            {hangout.attendees.map(attendee => (
              <button
                key={attendee.id}
                className={styles.attendeeCard}
                onClick={() => navigate(`/user/${attendee.id}`)}
              >
                <div className={styles.attendeeAvatar}>{attendee.avatar}</div>
                <span className={styles.attendeeName}>{attendee.name}</span>
                {attendee.mutualFriends! > 0 && (
                  <span className={styles.mutualBadge}>
                    {attendee.mutualFriends} mutual
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements */}
        {hangout.requirements.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>What to bring</h3>
            <div className={styles.requirements}>
              {hangout.requirements.map((req, index) => (
                <div key={index} className={styles.requirement}>
                  <span className={styles.requirementIcon}>✓</span>
                  <span className={styles.requirementText}>{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Preview */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Location</h3>
          <button className={styles.mapCard} onClick={() => navigate('/maps')}>
            <div className={styles.mapPreview}>
              <span className={styles.mapIcon}>🗺️</span>
              <div className={styles.mapOverlay}>Tap to view map</div>
            </div>
            <div className={styles.mapInfo}>
              <h4 className={styles.mapName}>{hangout.location.name}</h4>
              <p className={styles.mapAddress}>{hangout.location.address}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Fixed Bottom CTA - Diferente según estado */}
      <div className={styles.bottomBar}>
        {/* Estado: Puede unirse */}
        {userStatus === 'join' && (
          <button className={styles.joinBtn} onClick={handleRequestToJoin}>
            <span className={styles.joinIcon}>✓</span>
            Request to Join
          </button>
        )}

        {/* Estado: Request enviado */}
        {userStatus === 'request_sent' && (
          <div className={styles.pendingState}>
            <div className={styles.pendingInfo}>
              <span className={styles.pendingIcon}>⏳</span>
              <span className={styles.pendingText}>Request pending approval</span>
            </div>
            <button className={styles.cancelRequestBtn} onClick={handleCancelRequest}>
              Cancel Request
            </button>
          </div>
        )}

        {/* Estado: Ya está en el hangout */}
        {userStatus === 'joined' && (
          <div className={styles.joinedState}>
            <button className={styles.chatBtn} onClick={handleOpenChat}>
              <span className={styles.chatIcon}>💬</span>
              Open Chat
              {unreadMessages > 0 && (
                <span className={styles.unreadBadge}>{unreadMessages}</span>
              )}
            </button>
            <button className={styles.leaveBtn} onClick={handleLeaveHangout}>
              Leave
            </button>
          </div>
        )}

        {/* Estado: Es el host */}
        {userStatus === 'hosting' && (
          <div className={styles.hostingState}>
            <button className={styles.chatBtn} onClick={handleOpenChat}>
              <span className={styles.chatIcon}>💬</span>
              Open Chat
              {unreadMessages > 0 && (
                <span className={styles.unreadBadge}>{unreadMessages}</span>
              )}
            </button>
            <button
              className={styles.manageBtn}
              onClick={() => {
                // Scroll to requests section
                document.querySelector(`.${styles.requestsList}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className={styles.manageIcon}>👥</span>
              Requests
              {hasRequests && (
                <span className={styles.requestsBadge}>{pendingRequests.length}</span>
              )}
            </button>
          </div>
        )}

        {/* Estado: Lleno */}
        {userStatus === 'full' && (
          <div className={styles.fullState}>
            <span className={styles.fullIcon}>🚫</span>
            <span className={styles.fullText}>This hangout is full</span>
          </div>
        )}

        {/* Estado: Expirado */}
        {userStatus === 'expired' && (
          <div className={styles.expiredState}>
            <span className={styles.expiredIcon}>⏰</span>
            <span className={styles.expiredText}>This hangout has ended</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HangoutDetail;