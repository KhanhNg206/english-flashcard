import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theoryData } from '../data/theoryData';
import { loadLearnedTheories } from '../utils/storage';
import styles from './Theory.module.css';

export default function Theory() {
  const navigate = useNavigate();
  const [learnedIds, setLearnedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tất cả');

  useEffect(() => {
    setLearnedIds(loadLearnedTheories());
  }, []);

  // Lọc dữ liệu
  const filteredData = theoryData.filter(topic => {
    // 1. Lọc theo search (title, eng title, description)
    const q = search.toLowerCase();
    const matchSearch = topic.title.toLowerCase().includes(q) || 
                        topic.englishTitle.toLowerCase().includes(q) || 
                        topic.description.toLowerCase().includes(q);
    
    // 2. Lọc theo tab
    let matchFilter = true;
    if (filter === 'Đã học') matchFilter = learnedIds.includes(topic.id);
    else if (filter === 'Chưa học') matchFilter = !learnedIds.includes(topic.id);
    else if (filter !== 'Tất cả') matchFilter = topic.level === filter;

    return matchSearch && matchFilter;
  });

  const progress = Math.round((learnedIds.length / theoryData.length) * 100);

  return (
    <div className="page-container">
      <div className={styles['theory-header']}>
        <h1>📖 TOEIC Part 5 Theory</h1>
        <p style={{ color: 'var(--gray-500)' }}>Làm chủ các cấu trúc ngữ pháp thường xuyên xuất hiện trong đề thi TOEIC</p>
        
        {/* Progress Bar Chung */}
        <div style={{ maxWidth: 400, margin: '20px auto 0', background: 'var(--white)', padding: '16px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <span>Tiến độ học</span>
            <span style={{ color: 'var(--primary)' }}>{learnedIds.length} / {theoryData.length} chủ đề ({progress}%)</span>
          </div>
          <div style={{ height: '8px', background: 'var(--gray-200)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      <div className={styles['theory-toolbar']}>
        <input 
          type="text" 
          className={`form-input ${styles['theory-search']}`}
          placeholder="🔍 Tìm kiếm chủ đề, ngữ pháp..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className={styles['theory-filters']}>
          {['Tất cả', 'Cơ bản', 'Trung bình', 'Nâng cao', 'Đã học', 'Chưa học'].map(f => (
            <button 
              key={f}
              className={`${styles['filter-btn']} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles['theory-grid']}>
        {filteredData.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>Không tìm thấy chủ đề phù hợp.</div>
        ) : (
          filteredData.map((topic) => {
            const isLearned = learnedIds.includes(topic.id);
            const levelClass = topic.level === 'Cơ bản' ? styles.basic : topic.level === 'Trung bình' ? styles.medium : styles.advanced;
            
            return (
              <div key={topic.id} className={styles['theory-card']}>
                <div className={styles['card-top']}>
                  <div>
                    <h3>{topic.title}</h3>
                    <div className={styles['eng-title']}>{topic.englishTitle}</div>
                  </div>
                  {isLearned && <span className={styles['status-icon']} title="Đã học">✅</span>}
                </div>
                
                <p>{topic.description}</p>
                
                <div className={styles['card-meta']}>
                  <span>📝 {topic.sections.length} mục</span>
                  <span className={`${styles['badge-level']} ${levelClass}`}>{topic.level}</span>
                </div>
                
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate(`/theory/${topic.id}`)}>
                  {isLearned ? 'Xem lại' : 'Học ngay →'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
