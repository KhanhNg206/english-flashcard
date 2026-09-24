import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { theoryData } from '../data/theoryData';
import { toggleLearnedTheory, loadLearnedTheories } from '../utils/storage';
import { FormulaBox, NoteBox, TrapBox, TheoryTable, ExampleBox } from '../components/TheoryComponents';
import styles from './TheoryDetail.module.css';

export default function TheoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topic = theoryData.find(t => t.id === id);

  const [isLearned, setIsLearned] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (topic) {
      const learned = loadLearnedTheories();
      setIsLearned(learned.includes(topic.id));
    }
  }, [topic]);

  if (!topic) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Không tìm thấy lý thuyết</h3>
          <button className="btn btn-primary" onClick={() => navigate('/theory')}>Quay lại</button>
        </div>
      </div>
    );
  }

  const handleToggleLearned = () => {
    const updated = toggleLearnedTheory(topic.id);
    setIsLearned(updated.includes(topic.id));
  };

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const el = document.getElementById(`section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render từng section tùy theo type
  const renderSectionContent = (section: any) => {
    switch (section.type) {
      case 'explanation':
        return <div className={styles['explanation-text']}>{section.content}</div>;
      case 'formula':
        return <FormulaBox content={section.content} />;
      case 'note':
        return <NoteBox content={section.content} />;
      case 'trap':
        return <TrapBox content={section.content} />;
      case 'table':
        return <TheoryTable section={section} />;
      case 'example':
        return <ExampleBox section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <button className="btn btn-ghost" style={{ marginBottom: 24 }} onClick={() => navigate('/theory')}>
        ← Quay lại danh sách
      </button>

      <div className={styles.layout}>
        {/* Sidebar TOC */}
        <div className={styles['toc-sidebar']}>
          <div className={styles['toc-title']}>{topic.title}</div>
          <ul className={styles['toc-list']}>
            {topic.sections.map((sec, idx) => (
              <li 
                key={idx} 
                className={`${styles['toc-item']} ${activeSection === idx ? styles.active : ''}`}
                onClick={() => scrollToSection(idx)}
              >
                {idx + 1}. {sec.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className={styles['content-area']}>
          <div className={styles['topic-header']}>
            <h1 className={styles['topic-title']}>{topic.title}</h1>
            <div className={styles['topic-eng']}>{topic.englishTitle}</div>
          </div>

          {topic.sections.map((sec, idx) => (
            <div key={idx} id={`section-${idx}`} className={styles['section-block']}>
              <h2 className={styles['section-title']}>{sec.title}</h2>
              {renderSectionContent(sec)}
            </div>
          ))}

          {/* Footer - Actions */}
          <div className={styles['theory-footer']}>
            <button 
              className={`${styles['mark-learned-btn']} ${isLearned ? styles.learned : styles.unlearned}`}
              onClick={handleToggleLearned}
            >
              {isLearned ? '✅ Đã hoàn thành' : '◻️ Đánh dấu đã học'}
            </button>

            <div className={styles['next-actions']}>
              <p>Đã hiểu lý thuyết? Áp dụng ngay nhé!</p>
              <button className="btn btn-primary" onClick={() => navigate('/vocabulary')}>
                🎴 Học Flashcard & Làm Quiz chung
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
