// =============================================
// pages/Vocabulary.tsx
// Quản lý các bộ từ vựng (List & Upload)
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import VocabularyCard from '../components/VocabularyCard';
import { useVocabulary } from '../context/VocabularyContext';
import styles from './Vocabulary.module.css';

export default function Vocabulary() {
  const { sets, addSet } = useVocabulary();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'upload' | 'manual'>('list');
  const [manualSetName, setManualSetName] = useState('');

  const handleCreateManual = () => {
    if (!manualSetName.trim()) return;
    const newSet = {
      id: Date.now().toString(),
      name: manualSetName.trim(),
      words: [],
      createdAt: new Date().toISOString(),
    };
    addSet(newSet);
    navigate(`/vocabulary/${newSet.id}`); // Chuyển thẳng sang trang chi tiết để nhập từ
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Quản lý Từ vựng</h1>
        <p>Thêm mới hoặc xem lại các bộ từ vựng của bạn</p>
      </div>

      <div className={styles['vocab-tabs']}>
        <button
          className={`${styles['tab-btn']} ${activeTab === 'list' ? styles.active : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Danh sách ({sets.length})
        </button>
        <button
          className={`${styles['tab-btn']} ${activeTab === 'manual' ? styles.active : ''}`}
          onClick={() => setActiveTab('manual')}
        >
          Tạo thủ công
        </button>
        <button
          className={`${styles['tab-btn']} ${activeTab === 'upload' ? styles.active : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Tải file TXT
        </button>
      </div>

      {activeTab === 'manual' && (
        <div className="card" style={{ maxWidth: 600, margin: '0 auto', padding: '32px' }}>
          <h3 style={{ marginBottom: 16 }}>Tạo bộ từ vựng mới</h3>
          <div className="form-group">
            <label className="form-label">Tên bộ từ của bạn</label>
            <input
              className="form-input"
              type="text"
              placeholder="VD: Từ vựng TOEIC Part 1, Bài 1..."
              value={manualSetName}
              onChange={(e) => setManualSetName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateManual()}
              autoFocus
            />
          </div>
          <button className="btn btn-primary" onClick={handleCreateManual} disabled={!manualSetName.trim()}>
            Tạo mới và Bắt đầu nhập từ
          </button>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className={styles['upload-section']}>
          <FileUploader />
        </div>
      )}

      {activeTab === 'list' && (
        <>
          {sets.length === 0 ? (
            <div className="empty-state card">
              <div className="empty-icon">📁</div>
              <h3>Chưa có dữ liệu</h3>
              <p>Chuyển sang tab "Tạo thủ công" hoặc "Tải file TXT" để tạo bộ từ đầu tiên nhé.</p>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setActiveTab('manual')}>
                Tạo bộ từ mới
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {sets.map((set) => (
                <VocabularyCard key={set.id} vocabSet={set} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
