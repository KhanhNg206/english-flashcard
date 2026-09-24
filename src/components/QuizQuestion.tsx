// =============================================
// components/QuizQuestion.tsx
// Component hiển thị 1 câu hỏi quiz trắc nghiệm
// =============================================

import { useState, useEffect } from 'react';
import type { Word } from '../types';
import styles from './QuizQuestion.module.css';

interface Props {
  word: Word;                 // Từ hiện tại đang được hỏi
  options: string[];          // Danh sách 4 đáp án (nghĩa tiếng Việt)
  currentIndex: number;       // Số thứ tự câu hỏi (0-based)
  total: number;              // Tổng số câu hỏi
  score: number;              // Điểm hiện tại
  onAnswer: (isCorrect: boolean) => void; // Callback khi chọn đáp án
}

export default function QuizQuestion({ word, options, currentIndex, total, score, onAnswer }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset trạng thái khi chuyển sang câu mới
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [word.id]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (selectedOption) {
      const isCorrect = selectedOption === word.meaning;
      onAnswer(isCorrect);
    }
  };

  return (
    <div className={styles['quiz-container']}>
      <div className={styles['question-header']}>
        <div className={styles['question-counter']}>
          Câu hỏi {currentIndex + 1} / {total}
        </div>
        <div className={styles['question-score']}>
          Điểm: {score}
        </div>
      </div>

      <h2 className={styles['question-title']}>
        Nghĩa của từ này là gì?
        <span className={styles['question-word']}>{word.word}</span>
      </h2>

      <div className={styles['options-grid']}>
        {options.map((opt, index) => {
          let btnClass = styles['option-btn'];
          
          if (isAnswered) {
            if (opt === word.meaning) {
              btnClass += ` ${styles.correct}`; // Hiển thị đáp án đúng màu xanh
            } else if (opt === selectedOption) {
              btnClass += ` ${styles.wrong}`;   // Nếu chọn sai thì bôi đỏ
            }
          } else if (opt === selectedOption) {
             btnClass += ` ${styles.selected}`; // Khi vừa click nhưng chưa chốt (trong form này click là chốt luôn nên ít dùng)
          }

          const optionLabels = ['A', 'B', 'C', 'D'];

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleSelect(opt)}
              disabled={isAnswered}
            >
              <strong>{optionLabels[index]}.</strong> {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={styles['next-btn-container']}>
          <button className="btn btn-primary btn-lg" onClick={handleNext}>
            {currentIndex === total - 1 ? 'Xem kết quả' : 'Câu tiếp theo ➔'}
          </button>
        </div>
      )}
    </div>
  );
}
