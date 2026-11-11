// =============================================
// services/firestoreService.ts
// Dịch vụ giao tiếp với Cloud Firestore
// =============================================

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import type { VocabularySet } from '../types';

const SETS_COLLECTION = 'vocabulary_sets';

export const DEFAULT_SET: VocabularySet = {
  id: 'default-set-1',
  name: '📚 Bộ từ vựng mẫu (Cơ bản)',
  createdAt: new Date().toISOString(),
  words: [
    { id: 1, word: 'apple', meaning: 'quả táo', status: 'new', wordType: 'Noun (Danh từ)', note: 'Một loại trái cây phổ biến' },
    { id: 2, word: 'beautiful', meaning: 'xinh đẹp', status: 'new', wordType: 'Adjective (Tính từ)', note: 'Từ đồng nghĩa: pretty, gorgeous' },
    { id: 3, word: 'environment', meaning: 'môi trường', status: 'new', wordType: 'Noun (Danh từ)', note: 'Thường gặp trong TOEIC Part 7' },
    { id: 4, word: 'development', meaning: 'sự phát triển', status: 'new', wordType: 'Noun (Danh từ)', note: 'Động từ tương ứng: develop' },
    { id: 5, word: 'important', meaning: 'quan trọng', status: 'new', wordType: 'Adjective (Tính từ)', note: 'Cấu trúc: It is important that...' },
  ],
};

/** Lấy tất cả bộ từ vựng từ Firestore */
export async function getVocabularySetsFromFirestore(): Promise<VocabularySet[]> {
  try {
    const colRef = collection(db, SETS_COLLECTION);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Nếu Firestore chưa có dữ liệu nào, tự động khởi tạo bộ từ mẫu
      await saveVocabularySetToFirestore(DEFAULT_SET);
      return [DEFAULT_SET];
    }
    const sets: VocabularySet[] = [];
    snapshot.forEach((docSnap: any) => {
      const data = docSnap.data() as VocabularySet;
      sets.push({
        ...data,
        id: docSnap.id,
      });
    });
    return sets;
  } catch (error) {
    console.error('Lỗi khi tải bộ từ từ Firestore:', error);
    throw error;
  }
}

/** Lưu hoặc cập nhật một bộ từ vựng lên Firestore */
export async function saveVocabularySetToFirestore(set: VocabularySet): Promise<void> {
  try {
    const docRef = doc(db, SETS_COLLECTION, set.id);
    await setDoc(docRef, set, { merge: true });
  } catch (error) {
    console.error('Lỗi khi lưu bộ từ lên Firestore:', error);
    throw error;
  }
}

/** Xóa một bộ từ vựng khỏi Firestore */
export async function deleteVocabularySetFromFirestore(id: string): Promise<void> {
  try {
    const docRef = doc(db, SETS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Lỗi khi xóa bộ từ khỏi Firestore:', error);
    throw error;
  }
}

/** Đồng bộ danh sách bộ từ vựng ban đầu từ LocalStorage lên Firestore (Migration helper) */
export async function syncLocalSetsToFirestore(sets: VocabularySet[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const set of sets) {
      const docRef = doc(db, SETS_COLLECTION, set.id);
      batch.set(docRef, set, { merge: true });
    }
    await batch.commit();
  } catch (error) {
    console.error('Lỗi khi đồng bộ danh sách bộ từ lên Firestore:', error);
  }
}
