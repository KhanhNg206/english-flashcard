// =============================================
// pages/Progress.tsx
// Trang xem tiến độ chi tiết của tất cả bộ từ
// =============================================

import ProgressBar from '../components/ProgressBar';
import { useVocabulary } from '../context/VocabularyContext';
import styles from './Progress.module.css';

export default function Progress() {
  const { sets } = useVocabulary();

  if (sets.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Chưa có dữ liệu tiến độ</h3>
          <p>Hãy thêm bộ từ vựng để bắt đầu học nhé.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Tiến độ học tập</h1>
        <p>Theo dõi quá trình học từ vựng của bạn qua từng bộ từ.</p>
      </div>

      <div className={styles['progress-list']}>
        {sets.map((set) => {
          const total = set.words.length;
          const known = set.words.filter((w) => w.status === 'known').length;
          const unknown = set.words.filter((w) => w.status === 'unknown').length;
          const newWords = set.words.filter((w) => w.status === 'new').length;

          return (
            <div key={set.id} className={styles['progress-item']}>
              <div className={styles['item-header']}>
                <div className={styles['item-name']}>{set.name}</div>
                <div className={styles['item-stats']}>
                  <span>Tổng: <span className={styles['stat-val']}>{total}</span></span>
                  <span>Đã nhớ: <span className={`${styles['stat-val']} ${styles.known}`}>{known}</span></span>
                  <span>Chưa nhớ: <span className={`${styles['stat-val']} ${styles.unknown}`}>{unknown}</span></span>
                  <span>Mới: <span className={`${styles['stat-val']} ${styles.new}`}>{newWords}</span></span>
                </div>
              </div>
              <ProgressBar current={known} total={total} height={10} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
