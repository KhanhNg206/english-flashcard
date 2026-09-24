// =============================================
// components/FileUploader.tsx
// Upload file .txt và parse thành từ vựng
// =============================================

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVocabulary } from '../context/VocabularyContext';
import type { VocabularySet, Word } from '../types';
import { parseVocabularyFile, validateTxtFile } from '../utils/parseTxt';
import styles from './FileUploader.module.css';

export default function FileUploader() {
  const navigate = useNavigate();
  const { addSet } = useVocabulary();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [isDragOver, setIsDragOver] = useState(false);
  const [parsedWords, setParsedWords] = useState<Word[]>([]);
  const [setName, setSetName] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'upload' | 'name' | 'done'>('upload');

  /** Xử lý khi người dùng chọn file */
  const handleFile = async (file: File) => {
    setError('');

    // Validate file
    const validation = validateTxtFile(file);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    try {
      // Đọc nội dung file bằng Browser File API
      const text = await file.text();
      const words = parseVocabularyFile(text);

      if (words.length === 0) {
        setError('File không có từ vựng hợp lệ. Kiểm tra lại format: từ|nghĩa');
        return;
      }

      // Gợi ý tên bộ từ dựa trên tên file
      const suggestedName = file.name.replace('.txt', '').replace(/_/g, ' ');
      setSetName(suggestedName);
      setFileName(file.name);
      setParsedWords(words);
      setStep('name'); // Chuyển sang bước đặt tên
    } catch {
      setError('Không thể đọc file. Hãy đảm bảo file có encoding UTF-8.');
    }
  };

  /** Xử lý input file truyền thống */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  /** Drag & Drop handlers */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  /** Lưu bộ từ vựng và chuyển sang trang detail */
  const handleSave = () => {
    if (!setName.trim()) {
      setError('Vui lòng đặt tên cho bộ từ vựng.');
      return;
    }

    const newSet: VocabularySet = {
      id: Date.now().toString(), // ID đơn giản dùng timestamp
      name: setName.trim(),
      words: parsedWords,
      createdAt: new Date().toISOString(),
    };

    addSet(newSet);
    navigate(`/vocabulary/${newSet.id}`);
  };

  // ---- Render bước đặt tên ----
  if (step === 'name') {
    return (
      <div>
        <div className={styles.preview}>
          <strong>✅ Đã đọc thành công:</strong> {fileName}
          <br />
          <strong>{parsedWords.length}</strong> từ vựng đã được import.
        </div>

        <div className={styles['name-section']}>
          <div className="form-group" style={{ marginTop: 20 }}>
            <label className="form-label">Đặt tên cho bộ từ vựng</label>
            <input
              className="form-input"
              type="text"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              placeholder="VD: TOEIC Part 5, Daily English..."
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
          </div>

          {error && <p className={styles['error-msg']}>⚠️ {error}</p>}

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={() => setStep('upload')}>
              ← Quay lại
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              💾 Lưu bộ từ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Render bước upload ----
  return (
    <div>
      <div
        className={`${styles.uploader} ${isDragOver ? styles['drag-over'] : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className={styles['upload-icon']}>📂</div>
        <h3>Kéo thả file .txt vào đây</h3>
        <p>hoặc click để chọn file</p>
        <button
          className="btn btn-outline"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
        >
          📁 Chọn file .txt
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          className={styles['file-input']}
          onChange={handleInputChange}
        />
      </div>

      {/* Hướng dẫn format */}
      <div className={styles['format-hint']}>
        <strong>📋 Format file .txt:</strong>
        <pre>
{`apple|quả táo
book|quyển sách
beautiful|xinh đẹp`}
        </pre>
        <span>Mỗi dòng: <code>từ tiếng Anh | nghĩa tiếng Việt</code></span>
      </div>

      {error && <p className={styles['error-msg']}>⚠️ {error}</p>}
    </div>
  );
}
