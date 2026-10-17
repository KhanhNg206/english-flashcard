// =============================================
// context/VocabularyContext.tsx
// Context toàn cục quản lý dữ liệu từ vựng với Firestore & LocalStorage backup
// =============================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { VocabularySet, Word, WordStatus } from '../types';
import {
  getVocabularySetsFromFirestore,
  saveVocabularySetToFirestore,
  deleteVocabularySetFromFirestore,
} from '../services/firestoreService';
import {
  loadVocabularySets,
  saveVocabularySets,
} from '../utils/storage';

// ---- Định nghĩa kiểu dữ liệu cho Context ----
interface VocabularyContextType {
  sets: VocabularySet[];                                           // Danh sách tất cả bộ từ
  loading: boolean;                                               // Trạng thái tải dữ liệu từ Firestore
  allWords: Word[];                                               // Toàn bộ từ vựng tổng hợp từ mọi bộ từ
  addSet: (set: VocabularySet) => Promise<void>;                  // Thêm bộ từ mới
  deleteSet: (id: string) => Promise<void>;                       // Xóa bộ từ
  updateSet: (set: VocabularySet) => Promise<void>;               // Cập nhật bộ từ
  renameSet: (id: string, newName: string) => Promise<void>;      // Đổi tên bộ từ
  updateWordStatus: (setId: string, wordId: number, status: WordStatus) => Promise<void>; // Cập nhật trạng thái từ
  addWordToSet: (setId: string, word: Omit<Word, 'id'>) => Promise<void>;  // Thêm từ vào bộ
  updateWordInSet: (setId: string, updatedWord: Word) => Promise<void>;    // Sửa từ
  deleteWordFromSet: (setId: string, wordId: number) => Promise<void>;     // Xóa từ
}

// ---- Tạo Context ----
const VocabularyContext = createContext<VocabularyContextType | null>(null);

// ---- Provider Component ----
export function VocabularyProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo state ban đầu từ localStorage để giao diện tải nhanh
  const [sets, setSets] = useState<VocabularySet[]>(() => loadVocabularySets());
  const [loading, setLoading] = useState<boolean>(true);

  // Tải dữ liệu từ Cloud Firestore khi mở ứng dụng
  useEffect(() => {
    let isMounted = true;
    async function fetchFromFirestore() {
      try {
        const firestoreSets = await getVocabularySetsFromFirestore();
        if (isMounted) {
          if (firestoreSets.length > 0) {
            setSets(firestoreSets);
            saveVocabularySets(firestoreSets);
          }
        }
      } catch (err) {
        console.warn('Không thể kết nối Firestore, chuyển sang dùng LocalStorage:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFromFirestore();
    return () => {
      isMounted = false;
    };
  }, []);

  // Tổng hợp tất cả các từ từ mọi bộ từ để dùng cho Quiz trộn toàn hệ thống
  const allWords: Word[] = React.useMemo(() => {
    const list: Word[] = [];
    sets.forEach((s) => {
      list.push(...s.words);
    });
    return list;
  }, [sets]);

  /** Thêm một bộ từ mới */
  const addSet = async (newSet: VocabularySet) => {
    const updated = [...sets, newSet];
    setSets(updated);
    saveVocabularySets(updated);
    try {
      await saveVocabularySetToFirestore(newSet);
    } catch (e) {
      console.error('Lỗi khi thêm bộ từ lên Firestore:', e);
    }
  };

  /** Xóa một bộ từ theo id */
  const deleteSet = async (id: string) => {
    const updated = sets.filter((s) => s.id !== id);
    setSets(updated);
    saveVocabularySets(updated);
    try {
      await deleteVocabularySetFromFirestore(id);
    } catch (e) {
      console.error('Lỗi khi xóa bộ từ trên Firestore:', e);
    }
  };

  /** Cập nhật toàn bộ một bộ từ */
  const updateSet = async (updatedSet: VocabularySet) => {
    const updated = sets.map((s) => (s.id === updatedSet.id ? updatedSet : s));
    setSets(updated);
    saveVocabularySets(updated);
    try {
      await saveVocabularySetToFirestore(updatedSet);
    } catch (e) {
      console.error('Lỗi khi cập nhật bộ từ lên Firestore:', e);
    }
  };

  /** Đổi tên bộ từ */
  const renameSet = async (id: string, newName: string) => {
    let targetSet: VocabularySet | undefined;
    const updated = sets.map((s) => {
      if (s.id === id) {
        targetSet = { ...s, name: newName };
        return targetSet;
      }
      return s;
    });
    setSets(updated);
    saveVocabularySets(updated);
    if (targetSet) {
      try {
        await saveVocabularySetToFirestore(targetSet);
      } catch (e) {
        console.error('Lỗi khi đổi tên bộ từ lên Firestore:', e);
      }
    }
  };

  /** Cập nhật trạng thái học của một từ (new / known / unknown) */
  const updateWordStatus = async (setId: string, wordId: number, status: WordStatus) => {
    let targetSet: VocabularySet | undefined;
    const updated = sets.map((s) => {
      if (s.id !== setId) return s;
      targetSet = {
        ...s,
        words: s.words.map((w) => (w.id === wordId ? { ...w, status } : w)),
      };
      return targetSet;
    });
    setSets(updated);
    saveVocabularySets(updated);
    if (targetSet) {
      try {
        await saveVocabularySetToFirestore(targetSet);
      } catch (e) {
        console.error('Lỗi khi cập nhật trạng thái từ lên Firestore:', e);
      }
    }
  };

  /** Thêm từ mới vào một bộ từ */
  const addWordToSet = async (setId: string, word: Omit<Word, 'id'>) => {
    let targetSet: VocabularySet | undefined;
    const updated = sets.map((s) => {
      if (s.id !== setId) return s;
      const maxId = s.words.reduce((max, w) => Math.max(max, w.id), 0);
      const newWord: Word = { ...word, id: maxId + 1 };
      targetSet = { ...s, words: [...s.words, newWord] };
      return targetSet;
    });
    setSets(updated);
    saveVocabularySets(updated);
    if (targetSet) {
      try {
        await saveVocabularySetToFirestore(targetSet);
      } catch (e) {
        console.error('Lỗi khi thêm từ lên Firestore:', e);
      }
    }
  };

  /** Sửa một từ trong bộ */
  const updateWordInSet = async (setId: string, updatedWord: Word) => {
    let targetSet: VocabularySet | undefined;
    const updated = sets.map((s) => {
      if (s.id !== setId) return s;
      targetSet = {
        ...s,
        words: s.words.map((w) => (w.id === updatedWord.id ? updatedWord : w)),
      };
      return targetSet;
    });
    setSets(updated);
    saveVocabularySets(updated);
    if (targetSet) {
      try {
        await saveVocabularySetToFirestore(targetSet);
      } catch (e) {
        console.error('Lỗi khi sửa từ lên Firestore:', e);
      }
    }
  };

  /** Xóa một từ khỏi bộ */
  const deleteWordFromSet = async (setId: string, wordId: number) => {
    let targetSet: VocabularySet | undefined;
    const updated = sets.map((s) => {
      if (s.id !== setId) return s;
      targetSet = { ...s, words: s.words.filter((w) => w.id !== wordId) };
      return targetSet;
    });
    setSets(updated);
    saveVocabularySets(updated);
    if (targetSet) {
      try {
        await saveVocabularySetToFirestore(targetSet);
      } catch (e) {
        console.error('Lỗi khi xóa từ trên Firestore:', e);
      }
    }
  };

  return (
    <VocabularyContext.Provider
      value={{
        sets,
        loading,
        allWords,
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
