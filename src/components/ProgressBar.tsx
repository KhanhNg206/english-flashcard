// =============================================
// components/ProgressBar.tsx
// Thanh tiến độ học từ vựng
// =============================================

import styles from './ProgressBar.module.css';

interface Props {
  current: number;  // Số từ đã biết
  total: number;    // Tổng số từ
  height?: number;  // Chiều cao thanh (px), mặc định 8
  showLabel?: boolean; // Có hiển thị label không
}

export default function ProgressBar({ current, total, height = 8, showLabel = true }: Props) {
  // Tính phần trăm, tránh chia cho 0
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={styles['progress-wrapper']}>
      {showLabel && (
        <div className={styles['progress-label']}>
          <span className={styles['progress-text']}>
            {current}/{total} từ đã nhớ
          </span>
          <span className={styles['progress-percent']}>{percent}%</span>
        </div>
      )}
      <div className={styles['progress-bar-bg']} style={{ height }}>
        <div
          className={styles['progress-bar-fill']}
          style={{ width: `${percent}%`, height }}
        />
      </div>
    </div>
  );
}
