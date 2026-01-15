import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Chat.module.css';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatMember {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { hangoutId } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messageText, setMessageText] = useState('');
  const [isTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: 'host-1',
      userName: 'Sarah',
      userAvatar: 'SC',
      text: 'Hey everyone! Super excited for coffee today ☕',
      timestamp: '10:32 AM',
      isOwn: false,
    },
    {
      id: '2',
      userId: 'user-1',
      userName: 'Mike',
      userAvatar: 'MJ',
      text: 'Same here! What time are we meeting?',
      timestamp: '10:34 AM',
      isOwn: false,
    },
    {
      id: '3',
      userId: 'current',
      userName: 'You',
      userAvatar: 'YO',
      text: 'I can be there at 2:30 PM',
      timestamp: '10:35 AM',
      isOwn: true,
    },
    {
      id: '4',
      userId: 'host-1',
      userName: 'Sarah',
      userAvatar: 'SC',
      text: 'Perfect! See you all at Blue Bottle at 2:30',
      timestamp: '10:36 AM',
      isOwn: false,
    },
    {
      id: '5',
      userId: 'user-2',
      userName: 'Lisa',
      userAvatar: 'LP',
      text: 'Can\'t wait! Should we grab a table outside?',
      timestamp: '10:38 AM',
      isOwn: false,
    },
  ]);

  const hangout = {
    title: 'Coffee & Deep Convos',
    emoji: '☕',
    members: [
      { id: 'host-1', name: 'Sarah', avatar: 'SC', isOnline: true },
      { id: 'user-1', name: 'Mike', avatar: 'MJ', isOnline: true },
      { id: 'user-2', name: 'Lisa', avatar: 'LP', isOnline: false },
      { id: 'current', name: 'You', avatar: 'YO', isOnline: true },
    ] as ChatMember[],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        userId: 'current',
        userName: 'You',
        userAvatar: 'YO',
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        isOwn: true,
      };

      setMessages([...messages, newMessage]);
      setMessageText('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ←
        </button>
        <button
          className={styles.headerInfo}
          onClick={() => navigate(`/hangout/${hangoutId}`)}
        >
          <span className={styles.headerEmoji}>{hangout.emoji}</span>
          <div className={styles.headerText}>
            <h1 className={styles.headerTitle}>{hangout.title}</h1>
            <p className={styles.headerSubtitle}>{hangout.members.length} members</p>
          </div>
        </button>
        <button className={styles.infoBtn} onClick={() => navigate(`/hangout/${hangoutId}`)}>
          ℹ️
        </button>
      </div>

      {/* Members Preview */}
      <div className={styles.membersBar}>
        <div className={styles.membersScroll}>
          {hangout.members.map(member => (
            <button
              key={member.id}
              className={styles.memberChip}
              onClick={() => navigate(`/user/${member.id}`)}
            >
              <div className={styles.memberAvatarWrapper}>
                <div className={styles.memberAvatar}>{member.avatar}</div>
                {member.isOnline && <span className={styles.onlineDot}></span>}
              </div>
              <span className={styles.memberName}>{member.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((message, index) => {
          const showAvatar =
            index === 0 || messages[index - 1].userId !== message.userId;
          const showTimestamp =
            index === messages.length - 1 ||
            messages[index + 1].userId !== message.userId;

          return (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.isOwn ? styles.ownMessage : styles.otherMessage
              }`}
            >
              {!message.isOwn && showAvatar && (
                <button
                  className={styles.messageAvatar}
                  onClick={() => navigate(`/user/${message.userId}`)}
                >
                  {message.userAvatar}
                </button>
              )}
              {!message.isOwn && !showAvatar && <div className={styles.avatarSpacer}></div>}

              <div className={styles.messageBubbleWrapper}>
                {!message.isOwn && showAvatar && (
                  <span className={styles.messageName}>{message.userName}</span>
                )}
                <div className={styles.messageBubble}>
                  <p className={styles.messageText}>{message.text}</p>
                </div>
                {showTimestamp && (
                  <span className={styles.messageTime}>{message.timestamp}</span>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <div className={styles.typingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className={styles.typingText}>Sarah is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <button className={styles.attachBtn}>
          <span className={styles.attachIcon}>📎</span>
        </button>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            className={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            rows={1}
          />
        </div>
        <button
          className={`${styles.sendBtn} ${messageText.trim() ? styles.active : ''}`}
          onClick={handleSend}
          disabled={!messageText.trim()}
        >
          <span className={styles.sendIcon}>↑</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;