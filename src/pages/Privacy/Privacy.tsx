import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Privacy.module.css';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>Last updated: January 15, 2025</p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.paragraph}>
            Welcome to Friendzone. We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we collect, use, and safeguard your
            information when you use our Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.paragraph}>We collect several types of information:</p>
          
          <h3 className={styles.subsectionTitle}>Information You Provide</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>Name and contact information</li>
            <li className={styles.listItem}>Profile information (photos, bio, interests)</li>
            <li className={styles.listItem}>Account credentials</li>
            <li className={styles.listItem}>Messages and communications</li>
            <li className={styles.listItem}>User-generated content</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Automatically Collected Information</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>Location data (with your permission)</li>
            <li className={styles.listItem}>Device information</li>
            <li className={styles.listItem}>Usage data and analytics</li>
            <li className={styles.listItem}>IP address and browser information</li>
            <li className={styles.listItem}>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p className={styles.paragraph}>We use your information to:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Provide and improve our Service</li>
            <li className={styles.listItem}>Match you with nearby users and hangouts</li>
            <li className={styles.listItem}>Personalize your experience</li>
            <li className={styles.listItem}>Send you notifications and updates</li>
            <li className={styles.listItem}>Ensure safety and prevent fraud</li>
            <li className={styles.listItem}>Comply with legal obligations</li>
            <li className={styles.listItem}>Analyze usage patterns and improve features</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Location Data</h2>
          <p className={styles.paragraph}>
            Friendzone uses your location to show you nearby hangouts and connect you with people
            in your area. We only collect location data when you grant permission, and you can
            disable location access at any time in your device settings.
          </p>
          <div className={styles.highlight}>
            <p className={styles.highlightText}>
              🔒 Your exact location is never shared with other users. We only show approximate
              distances.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Information Sharing</h2>
          <p className={styles.paragraph}>We may share your information with:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Other Users:</strong> Profile information visible to other users
            </li>
            <li className={styles.listItem}>
              <strong>Service Providers:</strong> Third-party companies that help us operate
            </li>
            <li className={styles.listItem}>
              <strong>Legal Requirements:</strong> When required by law or to protect rights
            </li>
            <li className={styles.listItem}>
              <strong>Business Transfers:</strong> In case of merger or acquisition
            </li>
          </ul>
          <p className={styles.paragraph}>
            We will never sell your personal information to third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Data Security</h2>
          <p className={styles.paragraph}>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Encryption of data in transit and at rest</li>
            <li className={styles.listItem}>Regular security audits</li>
            <li className={styles.listItem}>Access controls and authentication</li>
            <li className={styles.listItem}>Secure data storage</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Rights and Choices</h2>
          <p className={styles.paragraph}>You have the right to:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Access your personal data</li>
            <li className={styles.listItem}>Correct inaccurate information</li>
            <li className={styles.listItem}>Delete your account and data</li>
            <li className={styles.listItem}>Export your data</li>
            <li className={styles.listItem}>Opt-out of marketing communications</li>
            <li className={styles.listItem}>Disable location services</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Data Retention</h2>
          <p className={styles.paragraph}>
            We retain your information for as long as your account is active or as needed to
            provide services. When you delete your account, we will delete or anonymize your data
            within 30 days, except where retention is required by law.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
          <p className={styles.paragraph}>
            Friendzone is not intended for users under 18 years old. We do not knowingly collect
            information from children. If we become aware that we have collected data from a child,
            we will take steps to delete it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. International Data Transfers</h2>
          <p className={styles.paragraph}>
            Your information may be transferred to and processed in countries other than your own.
            We ensure appropriate safeguards are in place to protect your data.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Cookies and Tracking</h2>
          <p className={styles.paragraph}>
            We use cookies and similar technologies to improve your experience, analyze usage, and
            deliver personalized content. You can manage cookie preferences in your browser
            settings.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Changes to This Policy</h2>
          <p className={styles.paragraph}>
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes via email or through the Service. Your continued use after changes indicates
            acceptance.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have questions or concerns about this Privacy Policy, please contact us:
          </p>
          <div className={styles.contact}>
            <p className={styles.contactText}>Email: privacy@friendzone.com</p>
            <p className={styles.contactText}>Data Protection Officer: dpo@friendzone.com</p>
            <p className={styles.contactText}>Address: 123 Social St, San Francisco, CA 94102</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.footerBtn} onClick={() => navigate(-1)}>
          I Understand
        </button>
      </div>
    </div>
  );
};

export default Privacy;