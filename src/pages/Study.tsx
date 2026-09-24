// =============================================
// pages/Study.tsx
// Trang học Flashcard
// =============================================

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FlashCard from '../components/FlashCard';
import ProgressBar from '../components/ProgressBar';
import { useVocabulary } from '../context/VocabularyContext';
import styles from './Study.module.css';

export default function Study() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sets, updateWordStatus } = useVocabulary();

  const vocabSet = sets.find((s) => s.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!vocabSet || vocabSet.words.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Không có dữ liệu để học</h3>
          <button className="btn btn-primary" onClick={() => navigate('/vocabulary')}>Quay lại</button>
        </div>
      </div>
    );
  }

  const words = vocabSet.words;
  const currentWord = words[currentIndex];
  
  // Stats
  const knownCount = words.filter((w) => w.status === 'known').length;

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRandom = () => {
    let nextIdx = currentIndex;
    while (nextIdx === currentIndex && words.length > 1) {
      nextIdx = Math.floor(Math.random() * words.length);
    }
    setCurrentIndex(nextIdx);
  };

  const handleUpdateStatus = (wordId: number, status: 'known' | 'unknown') => {
    updateWordStatus(vocabSet.id, wordId, status);
  };

  return (
    <div className={`page-container ${styles['study-container']}`}>
      <div className={styles['study-actions']}>
        <button className="btn btn-ghost" onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}>
          ← Quay lại
        </button>
      </div>

      <div className={styles['study-header']}>
        <h1>Đang học: {vocabSet.name}</h1>
        <ProgressBar current={knownCount} total={words.length} />
      </div>

      <FlashCard
        word={currentWord}
        currentIndex={currentIndex}
        total={words.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onRandom={handleRandom}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
