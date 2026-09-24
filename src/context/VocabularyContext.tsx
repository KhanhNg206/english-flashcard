// =============================================
// context/VocabularyContext.tsx
// Context toàn cục để quản lý dữ liệu từ vựng
// =============================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { VocabularySet, Word, WordStatus } from '../types';
import {
  addVocabularySet,
  deleteVocabularySet,
  loadVocabularySets,
  updateVocabularySet,
} from '../utils/storage';

// ---- Định nghĩa kiểu dữ liệu cho Context ----
interface VocabularyContextType {
  sets: VocabularySet[];                                           // Danh sách tất cả bộ từ
  addSet: (set: VocabularySet) => void;                           // Thêm bộ từ mới
  deleteSet: (id: string) => void;                                 // Xóa bộ từ
  updateSet: (set: VocabularySet) => void;                        // Cập nhật bộ từ
  renameSet: (id: string, newName: string) => void;               // Đổi tên bộ từ
  updateWordStatus: (setId: string, wordId: number, status: WordStatus) => void; // Cập nhật trạng thái từ
  addWordToSet: (setId: string, word: Omit<Word, 'id'>) => void;  // Thêm từ vào bộ
  updateWordInSet: (setId: string, updatedWord: Word) => void;    // Sửa từ
  deleteWordFromSet: (setId: string, wordId: number) => void;     // Xóa từ
}

// ---- Tạo Context ----
const VocabularyContext = createContext<VocabularyContextType | null>(null);

// ---- Provider Component ----
export function VocabularyProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo state từ localStorage
  const [sets, setSets] = useState<VocabularySet[]>(() => loadVocabularySets());

  // Đồng bộ state với localStorage mỗi khi sets thay đổi
  useEffect(() => {
    // Không cần gọi saveVocabularySets ở đây vì mỗi action đã gọi rồi
  }, [sets]);

  /** Thêm một bộ từ mới */
  const addSet = (set: VocabularySet) => {
    addVocabularySet(set);
    setSets((prev) => [...prev, set]);
  };

  /** Xóa một bộ từ theo id */
  const deleteSet = (id: string) => {
    deleteVocabularySet(id);
    setSets((prev) => prev.filter((s) => s.id !== id));
  };

  /** Cập nhật toàn bộ một bộ từ */
  const updateSet = (updatedSet: VocabularySet) => {
    updateVocabularySet(updatedSet);
    setSets((prev) => prev.map((s) => (s.id === updatedSet.id ? updatedSet : s)));
  };

  /** Đổi tên bộ từ */
  const renameSet = (id: string, newName: string) => {
    setSets((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, name: newName } : s));
      const target = updated.find((s) => s.id === id);
      if (target) updateVocabularySet(target);
      return updated;
    });
  };

  /** Cập nhật trạng thái học của một từ (new / known / unknown) */
  const updateWordStatus = (setId: string, wordId: number, status: WordStatus) => {
    setSets((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== setId) return s;
        return {
          ...s,
          words: s.words.map((w) => (w.id === wordId ? { ...w, status } : w)),
        };
      });
      const target = updated.find((s) => s.id === setId);
      if (target) updateVocabularySet(target);
      return updated;
    });
  };

  /** Thêm từ mới vào một bộ từ */
  const addWordToSet = (setId: string, word: Omit<Word, 'id'>) => {
    setSets((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== setId) return s;
        // Tạo id mới bằng cách lấy max id hiện tại + 1
        const maxId = s.words.reduce((max, w) => Math.max(max, w.id), 0);
        const newWord: Word = { ...word, id: maxId + 1 };
        return { ...s, words: [...s.words, newWord] };
      });
      const target = updated.find((s) => s.id === setId);
      if (target) updateVocabularySet(target);
      return updated;
    });
  };

  /** Sửa một từ trong bộ */
  const updateWordInSet = (setId: string, updatedWord: Word) => {
    setSets((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== setId) return s;
        return {
          ...s,
          words: s.words.map((w) => (w.id === updatedWord.id ? updatedWord : w)),
        };
      });
      const target = updated.find((s) => s.id === setId);
      if (target) updateVocabularySet(target);
      return updated;
    });
  };

  /** Xóa một từ khỏi bộ */
  const deleteWordFromSet = (setId: string, wordId: number) => {
    setSets((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== setId) return s;
        return { ...s, words: s.words.filter((w) => w.id !== wordId) };
      });
      const target = updated.find((s) => s.id === setId);
      if (target) updateVocabularySet(target);
      return updated;
    });
  };

  return (
    <VocabularyContext.Provider
      value={{
        sets,
        addSet,
        deleteSet,
        updateSet,
        renameSet,
        updateWordStatus,
        addWordToSet,
        updateWordInSet,
        deleteWordFromSet,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
}

/** Hook tiện ích để dùng context trong các component */
export function useVocabulary() {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error('useVocabulary phải được dùng trong VocabularyProvider');
  }
  return context;
}
