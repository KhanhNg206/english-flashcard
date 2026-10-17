// =============================================
// pages/Quiz.tsx
// Trang làm bài Quiz trắc nghiệm: Trộn đáp án từ toàn bộ cơ sở dữ liệu
// =============================================

import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import { useVocabulary } from '../context/VocabularyContext';
import styles from './Quiz.module.css';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sets, allWords } = useVocabulary();

  const vocabSet = sets.find((s) => s.id === id);

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle hàm tiện ích Fisher-Yates
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Tạo danh sách câu hỏi đã xáo trộn, trộn đáp án sai từ TẤT CẢ các từ trong database
  const quizQuestions = useMemo(() => {
    if (!vocabSet || vocabSet.words.length === 0) return [];

    // Danh sách toàn bộ từ vựng khác trên database để bốc đáp án ngẫu nhiên
    return shuffle(vocabSet.words).map((targetWord) => {
      // Lọc các từ khác có nghĩa khác với từ mục tiêu từ toàn bộ cơ sở dữ liệu
      const otherWordsPool = allWords.filter(
        (w) => w.meaning.trim().toLowerCase() !== targetWord.meaning.trim().toLowerCase()
      );

      // Lấy ngẫu nhiên 3 đáp án sai duy nhất
      const shuffledOthers = shuffle(otherWordsPool);
      const wrongOptionsSet = new Set<string>();

      for (const w of shuffledOthers) {
        if (wrongOptionsSet.size >= 3) break;
        if (w.meaning.trim() !== targetWord.meaning.trim()) {
          wrongOptionsSet.add(w.meaning.trim());
        }
      }

      // Trường hợp tổng số từ trong database ít hơn 4 từ, tự bổ sung phương án mẫu dự phòng
      const fallbackOptions = ['chính xác', 'tiến bộ', 'thành công', 'hiệu quả'];
      let fallbackIdx = 0;
      while (wrongOptionsSet.size < 3 && fallbackIdx < fallbackOptions.length) {
        if (fallbackOptions[fallbackIdx] !== targetWord.meaning.trim()) {
          wrongOptionsSet.add(fallbackOptions[fallbackIdx]);
        }
        fallbackIdx++;
      }

      const wrongOptions = Array.from(wrongOptionsSet);

      // Gộp và xáo trộn 4 đáp án (1 đúng + 3 sai)
      const allOptions = shuffle([targetWord.meaning, ...wrongOptions]);
      return {
        word: targetWord,
        options: allOptions,
      };
    });
  }, [vocabSet, allWords]);

  if (!vocabSet) {
    return (
      <div className="page-container">
        <div className="empty-state">Không tìm thấy bộ từ vựng</div>
      </div>
    );
  }

  if (vocabSet.words.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Bộ từ rỗng</h3>
          <p>Hãy thêm ít nhất 1 từ vào bộ này để bắt đầu làm bài Quiz.</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}
          >
            Quay lại thêm từ
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((c) => c + 1);
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
          <div className={styles['result-icon']}>
            {percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '💪'}
          </div>
          <h2>Hoàn thành Quiz!</h2>
          <div className={styles['result-score']}>
            Bạn đã trả lời đúng <strong>{score} / {quizQuestions.length}</strong> câu ({percent}%)
          </div>
          <div className={styles['result-actions']}>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}
            >
              ← Về danh sách
            </button>
            <button className="btn btn-primary" onClick={restartQuiz}>
              🔄 Làm lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className={`page-container ${styles['quiz-page']}`}>
      <div className={styles['quiz-header']}>
        <button
          className="btn btn-ghost"
          onClick={() => navigate(`/vocabulary/${vocabSet.id}`)}
        >
          ← Thoát Quiz
        </button>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ margin: 0, color: 'var(--gray-700)' }}>{vocabSet.name}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
            🌐 Trộn đáp án từ toàn bộ Database ({allWords.length} từ)
          </span>
        </div>
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
