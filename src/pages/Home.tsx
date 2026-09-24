// =============================================
// pages/Home.tsx
// Trang chủ Dashboard - Thống kê tổng quan
// =============================================

import { useNavigate } from 'react-router-dom';
import VocabularyCard from '../components/VocabularyCard';
import { useVocabulary } from '../context/VocabularyContext';
import { theoryData } from '../data/theoryData';
import { loadLearnedTheories } from '../utils/storage';
import styles from './Home.module.css';

export default function Home() {
  const { sets } = useVocabulary();
  const navigate = useNavigate();

  // Tính toán thống kê Vocabulary
  const totalSets = sets.length;
  let totalWords = 0;
  let knownWords = 0;

  sets.forEach((set) => {
    totalWords += set.words.length;
    knownWords += set.words.filter((w) => w.status === 'known').length;
  });

  const progress = totalWords > 0 ? Math.round((knownWords / totalWords) * 100) : 0;

  // Lấy 3 bộ từ mới nhất
  const recentSets = [...sets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Tính toán thống kê Theory
  const totalTheory = theoryData.length;
  const learnedTheory = loadLearnedTheories().length;
  const theoryProgress = totalTheory > 0 ? Math.round((learnedTheory / totalTheory) * 100) : 0;

  return (
    <div className="page-container">
      {/* Header */}
      <div className={styles['home-header']}>
        <h1>📖 English Flashcard</h1>
        <p>Ứng dụng học từ vựng và ngữ pháp tiếng Anh. Tự tạo bộ từ của riêng bạn và học mỗi ngày!</p>
      </div>

      {/* Quick Actions */}
      <div className={styles['quick-actions']}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/vocabulary')}>
          ➕ Thêm / Tải bộ từ mới
        </button>
        <button className="btn btn-outline btn-lg" onClick={() => navigate('/theory')}>
          📖 Học Lý thuyết TOEIC
        </button>
        {totalSets > 0 && (
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/progress')}>
            📊 Xem tiến độ từ vựng
          </button>
        )}
      </div>

      {/* Thống kê chung */}
      <div className={styles['stats-container']}>
        <div className={styles['stat-card']}>
          <div className={`${styles['stat-icon']} ${styles.primary}`}>📚</div>
          <div className={styles['stat-info']}>
            <h3>Bộ từ vựng</h3>
            <p>{totalSets}</p>
          </div>
        </div>
        <div className={styles['stat-card']}>
          <div className={`${styles['stat-icon']} ${styles.success}`}>✅</div>
          <div className={styles['stat-info']}>
            <h3>Từ đã nhớ</h3>
            <p>{knownWords} / {totalWords}</p>
          </div>
        </div>
        <div className={styles['stat-card']}>
          <div className={`${styles['stat-icon']} ${styles.warning}`}>📖</div>
          <div className={styles['stat-info']}>
            <h3>Lý thuyết TOEIC</h3>
            <p>{learnedTheory} / {totalTheory}</p>
          </div>
        </div>
      </div>

      {/* Module Theory Overview */}
      <div className="card" style={{ marginBottom: 40, padding: 32, background: 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: 8 }}>TOEIC Part 5 Theory</h2>
            <p style={{ opacity: 0.9, fontSize: '1.05rem', marginBottom: 16 }}>Nắm vững ngữ pháp cơ bản với {totalTheory} chủ đề cốt lõi.</p>
            <div style={{ display: 'flex', gap: 24, fontSize: '0.9rem', opacity: 0.9 }}>
              <span>✅ Đã học: {learnedTheory}</span>
              <span>📚 Còn lại: {totalTheory - learnedTheory}</span>
              <span>📊 Tiến độ: {theoryProgress}%</span>
            </div>
          </div>
          <button 
            className="btn" 
            style={{ background: 'white', color: 'var(--primary)', fontWeight: 'bold' }}
            onClick={() => navigate('/theory')}
          >
            Tiếp tục học →
          </button>
        </div>
      </div>

      {/* Gần đây */}
      <div className={styles['section-header']}>
        <h2 className={styles['section-title']}>Bộ từ gần đây</h2>
        {totalSets > 3 && (
          <button className="btn btn-ghost" onClick={() => navigate('/vocabulary')}>
            Xem tất cả →
          </button>
        )}
      </div>

      {recentSets.length > 0 ? (
        <div className="grid-3">
          {recentSets.map((set) => (
            <VocabularyCard key={set.id} vocabSet={set} />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <div className="empty-icon">📂</div>
          <h3>Chưa có bộ từ vựng nào</h3>
          <p>Hãy tải lên file .txt để bắt đầu học ngay nhé!</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/vocabulary')}>
            Tạo bộ từ đầu tiên
          </button>
        </div>
      )}
    </div>
  );
}
