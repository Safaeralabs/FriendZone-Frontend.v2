import React from 'react';
import { useToast } from '@/context/ToastContext';
import styles from './Toast.module.css';

const Toast: React.FC = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => hideToast(toast.id)}
        >
          <span className={styles.message}>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;