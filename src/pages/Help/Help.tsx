import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Help.module.css';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Getting Started',
    question: 'How do I create my first hangout?',
    answer: 'Tap the + button on the Discovery page, choose your activity type, set the time and location, and invite people! You can make it public or invite-only.',
  },
  {
    category: 'Getting Started',
    question: 'What are Ambitions?',
    answer: 'Ambitions let you broadcast what you want to do right now. Set your vibe, and Friendzone will match you with others who want the same thing!',
  },
  {
    category: 'Safety',
    question: 'How do I report someone?',
    answer: 'Tap the three dots on any profile or hangout, then select "Report". We take all reports seriously and review them within 24 hours.',
  },
  {
    category: 'Safety',
    question: 'Can I block users?',
    answer: 'Yes! Go to Settings → Privacy → Blocked Users. You can block anyone, and they won\'t be able to see your profile or contact you.',
  },
  {
    category: 'Privacy',
    question: 'Who can see my location?',
    answer: 'Your exact location is never shared. Other users only see approximate distance (e.g., "2 miles away"). You can disable location sharing in Settings.',
  },
  {
    category: 'Privacy',
    question: 'How do I delete my account?',
    answer: 'Go to Settings → Delete Account. Your data will be permanently deleted within 30 days. This action cannot be undone.',
  },
  {
    category: 'Hangouts',
    question: 'What happens if a hangout is canceled?',
    answer: 'All participants are notified immediately. The host can provide a cancellation reason, and you can reschedule for another time.',
  },
  {
    category: 'Hangouts',
    question: 'Can I leave a hangout after joining?',
    answer: 'Yes, you can leave any hangout before it starts. Tap the hangout and select "Leave". The host will be notified.',
  },
  {
    category: 'Account',
    question: 'How do I change my email or password?',
    answer: 'Go to Settings → Account → Change Email/Password. You\'ll need to verify your current password first.',
  },
  {
    category: 'Account',
    question: 'Can I use Friendzone without location services?',
    answer: 'Location services are required to discover nearby hangouts. However, you can manually set your city and still browse activities.',
  },
];

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className={styles.title}>Help Center</h1>
        <p className={styles.subtitle}>Find answers to common questions</p>
      </div>

      <div className={styles.content}>
        {/* Search */}
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for help..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={styles.actionCard} onClick={() => navigate('/settings/feedback')}>
            <span className={styles.actionIcon}>💬</span>
            <h3 className={styles.actionTitle}>Send Feedback</h3>
            <p className={styles.actionDescription}>Help us improve</p>
          </button>
          <button className={styles.actionCard} onClick={() => navigate('/settings/report')}>
            <span className={styles.actionIcon}>⚠️</span>
            <h3 className={styles.actionTitle}>Report Issue</h3>
            <p className={styles.actionDescription}>Let us know</p>
          </button>
        </div>

        {/* FAQs by Category */}
        {categories.map(category => {
          const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
          if (categoryFaqs.length === 0) return null;

          return (
            <section key={category} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div className={styles.faqList}>
                {categoryFaqs.map((faq) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isExpanded = expandedIndex === globalIndex;

                  return (
                    <div key={globalIndex} className={styles.faqItem}>
                      <button
                        className={`${styles.faqQuestion} ${isExpanded ? styles.expanded : ''}`}
                        onClick={() => toggleFaq(globalIndex)}
                      >
                        <span className={styles.questionText}>{faq.question}</span>
                        <span className={styles.questionIcon}>{isExpanded ? '−' : '+'}</span>
                      </button>
                      {isExpanded && (
                        <div className={styles.faqAnswer}>
                          <p className={styles.answerText}>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <h3 className={styles.noResultsTitle}>No results found</h3>
            <p className={styles.noResultsText}>
              Try searching with different keywords or contact support
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className={styles.contactSupport}>
          <h2 className={styles.contactTitle}>Still need help?</h2>
          <p className={styles.contactText}>
            Our support team is here to help you with any questions or issues.
          </p>
          <a href="mailto:support@friendzone.com" className={styles.contactBtn}>
            <span className={styles.contactIcon}>📧</span>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;