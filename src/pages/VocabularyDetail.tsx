// =============================================
// pages/VocabularyDetail.tsx
// Chi tiết 1 bộ từ: Xem, thêm, sửa, xoá từ, tìm kiếm
// =============================================

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useVocabulary } from '../context/VocabularyContext';
import type { Word } from '../types';
import { speakWord } from '../utils/speech';
import { exportToTXT } from '../utils/parseTxt';
import styles from './VocabularyDetail.module.css';

export default function VocabularyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sets, addWordToSet, updateWordInSet, deleteWordFromSet } = useVocabulary();

  const vocabSet = sets.find((s) => s.id === id);

  // States
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editWord, setEditWord] = useState<Word | null>(null);

  // Form states
  const [formWord, setFormWord] = useState('');
  const [formMeaning, setFormMeaning] = useState('');

  if (!vocabSet) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Không tìm thấy bộ từ vựng</h3>
          <button className="btn btn-primary" onClick={() => navigate('/vocabulary')}>Quay lại</button>
        </div>
      </div>
    );
  }

  // Lọc từ theo tìm kiếm (tiếng anh hoặc nghĩa)
  const filteredWords = vocabSet.words.filter((w) => {
    const q = search.toLowerCase();
    return w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
  });

  const knownCount = vocabSet.words.filter((w) => w.status === 'known').length;

  const handleOpenAdd = () => {
    setEditWord(null);
    setFormWord('');
    setFormMeaning('');
    setShowModal(true);
  };

  const handleOpenEdit = (w: Word) => {
    setEditWord(w);
    setFormWord(w.word);
    setFormMeaning(w.meaning);
    setShowModal(true);
  };

  const handleSaveWord = () => {
    if (!formWord.trim() || !formMeaning.trim()) return;

    if (editWord) {
      updateWordInSet(vocabSet.id, { ...editWord, word: formWord.trim(), meaning: formMeaning.trim() });
    } else {
      addWordToSet(vocabSet.id, { word: formWord.trim(), meaning: formMeaning.trim(), status: 'new' });
    }
    
    // Xóa trắng form để nhập từ tiếp theo cho tiện
    setFormWord('');
    setFormMeaning('');
    setEditWord(null);
    setShowModal(false);
  };

  const handleDelete = (wordId: number) => {
    if (window.confirm('Bạn có chắc muốn xoá từ này?')) {
      deleteWordFromSet(vocabSet.id, wordId);
    }
  };

  return (
    <div className="page-container">
      <button className="btn btn-ghost" style={{ marginBottom: 16 }} onClick={() => navigate('/vocabulary')}>
        ← Quay lại
      </button>

      <div className={styles['detail-header']}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{vocabSet.name}</h1>
          <ProgressBar current={knownCount} total={vocabSet.words.length} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={() => exportToTXT(vocabSet.name, vocabSet.words)}>
            💾 Lưu file TXT
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/study/${vocabSet.id}`)}>
            🎴 Học Flashcard
          </button>
          <button className="btn btn-outline" onClick={() => navigate(`/quiz/${vocabSet.id}`)}>
            🎯 Quiz
          </button>
        </div>
      </div>

      {/* Form thêm từ nhanh */}
      <form className={styles['quick-add-form']} onSubmit={(e) => { e.preventDefault(); handleSaveWord(); }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Từ tiếng Anh mới</label>
          <input
            className="form-input"
            required
            placeholder="VD: Hello"
            value={formWord}
            onChange={(e) => setFormWord(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Nghĩa tiếng Việt</label>
          <input
            className="form-input"
            required
            placeholder="VD: Xin chào"
            value={formMeaning}
            onChange={(e) => setFormMeaning(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
          ➕ Thêm ngay
        </button>
      </form>

      <div className={styles['search-bar']}>
        <input
          type="text"
          className={`form-input ${styles['search-input']}`}
          placeholder="Tìm từ vựng hoặc nghĩa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles['word-list']}>
        <div className={`${styles['word-row']} ${styles.header}`}>
          <div>#</div>
          <div>Từ vựng (EN)</div>
          <div>Nghĩa (VI)</div>
          <div>Trạng thái</div>
          <div>Hành động</div>
        </div>

        {filteredWords.length === 0 ? (
          <div className="empty-state" style={{ padding: '40px 0' }}>Không tìm thấy từ nào.</div>
        ) : (
          filteredWords.map((w, idx) => (
            <div className={styles['word-row']} key={w.id}>
              <div style={{ color: 'var(--gray-400)' }}>{idx + 1}</div>
              <div className={styles['word-text']}>
                {w.word}
                <button className="btn-ghost" style={{ padding: '2px 6px', marginLeft: 8 }} onClick={() => speakWord(w.word)}>🔊</button>
              </div>
              <div>{w.meaning}</div>
              <div>
                <span className={`${styles['status-badge']} ${styles[`status-${w.status}`]}`}>
                  {w.status === 'new' ? 'Mới' : w.status === 'known' ? 'Đã nhớ' : 'Chưa nhớ'}
                </span>
              </div>
              <div className={styles['row-actions']}>
                <button className="btn btn-ghost btn-sm" onClick={() => handleOpenEdit(w)}>✏️</button>
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(w.id)}>🗑</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Sửa */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Sửa từ vựng</h2>
            <div className="form-group">
              <label className="form-label">Tiếng Anh</label>
              <input className="form-input" value={formWord} onChange={(e) => setFormWord(e.target.value)} autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Tiếng Việt</label>
              <input className="form-input" value={formMeaning} onChange={(e) => setFormMeaning(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSaveWord()} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleSaveWord}>Lưu lại</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
