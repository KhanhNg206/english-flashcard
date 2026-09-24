// =============================================
// utils/storage.ts
// Các hàm tiện ích để lưu/đọc localStorage
// =============================================

import type { VocabularySet } from '../types';

const STORAGE_KEY = 'english_flashcard_sets';

// Dữ liệu mẫu mặc định
const DEFAULT_SET: VocabularySet = {
  id: 'default-set-1',
  name: '📚 Bộ từ vựng mẫu (Cơ bản)',
  createdAt: new Date().toISOString(),
  words: [
    { id: 1, word: 'apple', meaning: 'quả táo', status: 'new' },
    { id: 2, word: 'beautiful', meaning: 'xinh đẹp', status: 'new' },
    { id: 3, word: 'environment', meaning: 'môi trường', status: 'new' },
    { id: 4, word: 'development', meaning: 'sự phát triển', status: 'new' },
    { id: 5, word: 'important', meaning: 'quan trọng', status: 'new' },
  ],
};

/** Đọc tất cả bộ từ vựng từ localStorage */
export function loadVocabularySets(): VocabularySet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Nếu chưa có dữ liệu, khởi tạo bộ mẫu mặc định và lưu lại
      saveVocabularySets([DEFAULT_SET]);
      return [DEFAULT_SET];
    }
    return JSON.parse(raw) as VocabularySet[];
  } catch {
    return [DEFAULT_SET];
  }
}

/** Lưu toàn bộ danh sách bộ từ vựng vào localStorage */
export function saveVocabularySets(sets: VocabularySet[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}

/** Thêm một bộ từ mới */
export function addVocabularySet(newSet: VocabularySet): void {
  const sets = loadVocabularySets();
  sets.push(newSet);
  saveVocabularySets(sets);
}

/** Xóa một bộ từ theo id */
export function deleteVocabularySet(id: string): void {
  const sets = loadVocabularySets();
  const updated = sets.filter((s) => s.id !== id);
  saveVocabularySets(updated);
}

/** Cập nhật một bộ từ (thay thế theo id) */
export function updateVocabularySet(updatedSet: VocabularySet): void {
  const sets = loadVocabularySets();
  const index = sets.findIndex((s) => s.id === updatedSet.id);
  if (index !== -1) {
    sets[index] = updatedSet;
    saveVocabularySets(sets);
  }
}

/** Lấy một bộ từ theo id */
export function getVocabularySetById(id: string): VocabularySet | undefined {
  const sets = loadVocabularySets();
  return sets.find((s) => s.id === id);
}

// =============================================
// Quản lý tiến độ học Lý thuyết (Theory)
// =============================================
const THEORY_STORAGE_KEY = 'english_theory_learned';

/** Đọc danh sách ID các bài lý thuyết đã học */
export function loadLearnedTheories(): string[] {
  try {
    const raw = localStorage.getItem(THEORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Đánh dấu hoàn thành / bỏ hoàn thành một bài lý thuyết */
export function toggleLearnedTheory(id: string): string[] {
  let learned = loadLearnedTheories();
  if (learned.includes(id)) {
    learned = learned.filter(topicId => topicId !== id);
  } else {
    learned.push(id);
  }
  localStorage.setItem(THEORY_STORAGE_KEY, JSON.stringify(learned));
  return learned;
}
