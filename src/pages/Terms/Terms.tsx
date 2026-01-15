import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Terms.module.css';

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>Last updated: January 15, 2025</p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.paragraph}>
            By accessing and using Friendzone ("the Service"), you accept and agree to be bound by
            the terms and provision of this agreement. If you do not agree to these Terms of
            Service, please do not use the Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Description of Service</h2>
          <p className={styles.paragraph}>
            Friendzone is a social networking platform that helps users connect with people nearby
            for spontaneous hangouts and social activities. The Service includes:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Discovery of local hangouts and events</li>
            <li className={styles.listItem}>Creating and joining social activities</li>
            <li className={styles.listItem}>Messaging with other users</li>
            <li className={styles.listItem}>Location-based matching</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. User Accounts</h2>
          <p className={styles.paragraph}>
            You must be at least 18 years old to use Friendzone. When you create an account, you
            must provide accurate and complete information. You are responsible for:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Maintaining the security of your account</li>
            <li className={styles.listItem}>All activities that occur under your account</li>
            <li className={styles.listItem}>
              Notifying us immediately of any unauthorized use
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. User Conduct</h2>
          <p className={styles.paragraph}>You agree not to:</p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Use the Service for any illegal or unauthorized purpose
            </li>
            <li className={styles.listItem}>
              Harass, abuse, or harm other users
            </li>
            <li className={styles.listItem}>
              Post false, inaccurate, or misleading information
            </li>
            <li className={styles.listItem}>
              Impersonate any person or entity
            </li>
            <li className={styles.listItem}>
              Use automated systems to access the Service
            </li>
            <li className={styles.listItem}>
              Collect user information without consent
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Content</h2>
          <p className={styles.paragraph}>
            You retain ownership of any content you post on Friendzone. However, by posting
            content, you grant us a worldwide, non-exclusive, royalty-free license to use,
            reproduce, and display your content in connection with the Service.
          </p>
          <p className={styles.paragraph}>
            We reserve the right to remove any content that violates these Terms or that we deem
            inappropriate.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Safety and Meetings</h2>
          <p className={styles.paragraph}>
            Friendzone facilitates connections between users, but we are not responsible for
            in-person meetings. Users should:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Meet in public places</li>
            <li className={styles.listItem}>Tell someone where you're going</li>
            <li className={styles.listItem}>Trust your instincts</li>
            <li className={styles.listItem}>Report suspicious behavior</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Privacy</h2>
          <p className={styles.paragraph}>
            Your use of the Service is also governed by our Privacy Policy. Please review our
            Privacy Policy to understand how we collect, use, and protect your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Termination</h2>
          <p className={styles.paragraph}>
            We may terminate or suspend your account at any time, without prior notice, for
            conduct that we believe violates these Terms or is harmful to other users, us, or
            third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Disclaimers</h2>
          <p className={styles.paragraph}>
            The Service is provided "as is" without warranties of any kind. We do not guarantee
            that the Service will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Limitation of Liability</h2>
          <p className={styles.paragraph}>
            Friendzone shall not be liable for any indirect, incidental, special, or consequential
            damages arising from your use of the Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Changes to Terms</h2>
          <p className={styles.paragraph}>
            We reserve the right to modify these Terms at any time. We will notify users of any
            material changes via email or through the Service. Your continued use of the Service
            after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className={styles.contact}>
            <p className={styles.contactText}>Email: legal@friendzone.com</p>
            <p className={styles.contactText}>Address: 123 Social St, San Francisco, CA 94102</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.footerBtn} onClick={() => navigate(-1)}>
          Accept & Continue
        </button>
      </div>
    </div>
  );
};

export default Terms;