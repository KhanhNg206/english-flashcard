// =============================================
// pages/Quiz.tsx
// Trang làm bài Quiz trắc nghiệm
// =============================================

import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import { useVocabulary } from '../context/VocabularyContext';
import styles from './Quiz.module.css';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sets } = useVocabulary();

  const vocabSet = sets.find((s) => s.id === id);

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle hàm tiện ích
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Tạo danh sách câu hỏi đã xáo trộn khi component mount
  const quizQuestions = useMemo(() => {
    if (!vocabSet || vocabSet.words.length < 4) return [];
    
    return shuffle(vocabSet.words).map((targetWord) => {
      // Lấy 3 đáp án sai từ các từ khác
      const otherWords = vocabSet.words.filter(w => w.id !== targetWord.id);
      const wrongOptions = shuffle(otherWords).slice(0, 3).map(w => w.meaning);
      
      // Gộp và xáo trộn 4 đáp án
      const allOptions = shuffle([targetWord.meaning, ...wrongOptions]);
      return {
        word: targetWord,
        options: allOptions
      };
    });
  }, [vocabSet]);

  if (!vocabSet) {
    return <div className="page-container"><div className="empty-state">Không tìm thấy bộ từ vựng</div></div>;
  }

  if (vocabSet.words.length < 4) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Không đủ từ vựng</h3>
          <p>Cần ít nhất 4 từ trong bộ để tạo bài Quiz.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}>Quay lại</button>
        </div>
      </div>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  // Màn hình kết quả
  if (isFinished) {
    const percent = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className={`page-container ${styles['quiz-page']}`}>
        <div className={styles['result-screen']}>
          <div className={styles['result-icon']}>{percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '💪'}</div>
          <h2>Hoàn thành Quiz!</h2>
          <div className={styles['result-score']}>
            Bạn đã trả lời đúng <strong>{score} / {quizQuestions.length}</strong> câu ({percent}%)
          </div>
          <div className={styles['result-actions']}>
            <button className="btn btn-outline" onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}>← Về danh sách</button>
            <button className="btn btn-primary" onClick={restartQuiz}>🔄 Làm lại</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className={`page-container ${styles['quiz-page']}`}>
      <div className={styles['quiz-header']}>
        <button className="btn btn-ghost" onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}>
          ← Thoát Quiz
        </button>
        <h3 style={{ margin: 0, color: 'var(--gray-700)' }}>{vocabSet.name}</h3>
      </div>

      <QuizQuestion
        word={currentQ.word}
        options={currentQ.options}
        currentIndex={currentIndex}
        total={quizQuestions.length}
        score={score}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
