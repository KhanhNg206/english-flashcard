// =============================================
// components/FlashCard.tsx
// Component thẻ flashcard có hiệu ứng lật
// =============================================

import { useEffect, useState } from 'react';
import type { Word, WordStatus } from '../types';
import { speakWord } from '../utils/speech';
import styles from './FlashCard.module.css';

interface Props {
  word: Word;
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onRandom: () => void;
  onUpdateStatus: (wordId: number, status: WordStatus) => void;
}

export default function FlashCard({
  word,
  currentIndex,
  total,
  onNext,
  onPrev,
  onRandom,
  onUpdateStatus,
}: Props) {
  // State lật thẻ
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset trạng thái lật khi chuyển sang từ mới
  useEffect(() => {
    setIsFlipped(false);
  }, [word.id]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Không lật thẻ khi bấm loa
    speakWord(word.word);
  };

  const handleStatus = (status: WordStatus) => {
    onUpdateStatus(word.id, status);
    // Tự động chuyển từ sau khi đánh dấu (tuỳ chọn)
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className={styles['flashcard-container']}>
      <div className={styles['card-counter']}>
        Thẻ {currentIndex + 1} / {total}
      </div>

      {/* Vùng lật thẻ */}
      <div className={styles['card-wrapper']} onClick={handleFlip}>
        <div className={`${styles['card-inner']} ${isFlipped ? styles.flipped : ''}`}>
          
          {/* Mặt trước: Tiếng Anh */}
          <div className={styles['card-front']}>
            <div className={styles['card-label']}>English</div>
            <div className={styles['card-word']}>{word.word}</div>
            
            <button
              className={styles['speak-btn']}
              onClick={handleSpeak}
              title="Phát âm"
            >
              🔊
            </button>
            <div className={styles['card-hint']}>Click để xem nghĩa</div>
          </div>

          {/* Mặt sau: Nghĩa tiếng Việt */}
          <div className={styles['card-back']}>
            <div className={styles['card-label']}>Vietnamese</div>
            <div className={styles['card-meaning']}>{word.meaning}</div>
            
            <button
              className={`${styles['speak-btn']} ${styles.back}`}
              onClick={handleSpeak}
              title="Phát âm"
            >
              🔊
            </button>
            <div className={styles['card-hint']}>Click để quay lại</div>
          </div>

        </div>
      </div>

      {/* Điều hướng */}
      <div className={styles['nav-buttons']}>
        <button className="btn btn-outline" onClick={onPrev} disabled={currentIndex === 0}>
          ← Trước
        </button>
        <button className="btn btn-ghost" onClick={onRandom}>
          🎲 Random
        </button>
        <button className="btn btn-outline" onClick={onNext} disabled={currentIndex === total - 1}>
          Tiếp →
        </button>
      </div>

      {/* Đánh dấu trạng thái */}
      {isFlipped && (
        <div className={styles['status-buttons']}>
          <button className={styles['btn-unknown']} onClick={() => handleStatus('unknown')}>
            ❌ Chưa nhớ
          </button>
          <button className={styles['btn-known']} onClick={() => handleStatus('known')}>
            ✅ Đã nhớ
          </button>
        </div>
      )}
    </div>
  );
}
