// =============================================
// Types - Định nghĩa các kiểu dữ liệu dùng chung
// =============================================

// Trạng thái học của mỗi từ
export type WordStatus = 'new' | 'known' | 'unknown';

// Một từ vựng
export interface Word {
  id: number;
  word: string;       // Từ tiếng Anh
  meaning: string;    // Nghĩa tiếng Việt
  status: WordStatus; // Trạng thái học
}

// Một bộ từ vựng
export interface VocabularySet {
  id: string;
  name: string;
  words: Word[];
  createdAt: string;  // ISO date string
}

// Kết quả một câu quiz
export interface QuizResult {
  wordId: number;
  isCorrect: boolean;
}

// =============================================
// Types cho phần Theory (Lý thuyết)
// =============================================

export type TheorySectionType = 'formula' | 'explanation' | 'table' | 'example' | 'note' | 'trap';

export interface TheorySection {
  title: string;
  type: TheorySectionType;
  
  // Dành cho explanation, formula, note, trap
  content?: string; 
  
  // Dành cho table
  headers?: string[];
  rows?: string[][];
  
  // Dành cho example (câu hỏi trắc nghiệm)
  question?: string;
  options?: string[];
  answer?: string;
  explanation?: string;
}

export interface TheoryTopic {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  level: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  sections: TheorySection[];
}
