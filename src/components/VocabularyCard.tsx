// =============================================
// components/VocabularyCard.tsx
// Card hiển thị một bộ từ vựng trong danh sách
// =============================================

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVocabulary } from '../context/VocabularyContext';
import type { VocabularySet } from '../types';
import ProgressBar from './ProgressBar';
import styles from './VocabularyCard.module.css';
import { exportToTXT } from '../utils/parseTxt';

interface Props {
  vocabSet: VocabularySet;
}

export default function VocabularyCard({ vocabSet }: Props) {
  const navigate = useNavigate();
  const { deleteSet, renameSet } = useVocabulary();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(vocabSet.name);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tính thống kê
  const total   = vocabSet.words.length;
  const known   = vocabSet.words.filter((w) => w.status === 'known').length;
  const unknown = vocabSet.words.filter((w) => w.status === 'unknown').length;

  // Format ngày tạo
  const createdDate = new Date(vocabSet.createdAt).toLocaleDateString('vi-VN');

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleRename = () => {
    const trimmed = newName.trim();
    if (trimmed && trimmed !== vocabSet.name) {
      renameSet(vocabSet.id, trimmed);
    }
    setRenaming(false);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Xóa bộ từ "${vocabSet.name}"? Hành động này không thể hoàn tác.`)) {
      deleteSet(vocabSet.id);
    }
    setMenuOpen(false);
  };

  return (
    <div className={styles['vocab-card']}>
      {/* Header */}
      <div className={styles['card-header']}>
        <div>
          {renaming ? (
            <input
              className="form-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') { setRenaming(false); setNewName(vocabSet.name); }
              }}
              autoFocus
            />
          ) : (
            <div className={styles['card-name']}>{vocabSet.name}</div>
          )}
          <div className={styles['card-date']}>Tạo ngày {createdDate}</div>
        </div>

        {/* Dropdown menu */}
        <div className={styles['menu-wrapper']} ref={menuRef}>
          <button
            className={styles['menu-btn']}
            onClick={() => setMenuOpen((p) => !p)}
            title="Tùy chọn"
          >
            ⋮
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              <button
                className={styles['dropdown-item']}
                onClick={() => { navigate(`/vocabulary/${vocabSet.id}`); setMenuOpen(false); }}
              >
                📋 Xem chi tiết
              </button>
              <button
                className={styles['dropdown-item']}
                onClick={() => { setRenaming(true); setMenuOpen(false); }}
              >
                ✏️ Đổi tên
              </button>
              <button
                className={styles['dropdown-item']}
                onClick={() => { exportToTXT(vocabSet.name, vocabSet.words); setMenuOpen(false); }}
              >
                💾 Tải file TXT
              </button>
              <button
                className={styles['dropdown-item']}
                onClick={() => { navigate(`/study/${vocabSet.id}`); setMenuOpen(false); }}
              >
                🎴 Học Flashcard
              </button>
              <button
                className={styles['dropdown-item']}
                onClick={() => { navigate(`/quiz/${vocabSet.id}`); setMenuOpen(false); }}
              >
                🎯 Quiz
              </button>
              <button className={`${styles['dropdown-item']} ${styles.danger}`} onClick={handleDelete}>
                🗑️ Xóa bộ từ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thống kê */}
      <div className={styles['card-stats']}>
        <span className={styles['stat-item']}>📝 {total} từ</span>
        <span className={styles['stat-item']}>✅ {known} đã nhớ</span>
        <span className={styles['stat-item']}>❌ {unknown} chưa nhớ</span>
      </div>

      {/* Thanh tiến độ */}
      <ProgressBar current={known} total={total} height={6} />

      {/* Nút hành động */}
      <div className={styles['card-actions']}>
        <button className="btn btn-primary btn-sm" onClick={() => navigate(`/study/${vocabSet.id}`)}>
          🎴 Học ngay
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}>
          📋 Chi tiết
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/quiz/${vocabSet.id}`)}>
          🎯 Quiz
        </button>
      </div>
    </div>
  );
}
