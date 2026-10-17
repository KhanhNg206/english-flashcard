// =============================================
// firebase.ts
// Khởi tạo Firebase App và Firestore
// =============================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'englishflashcard-3254e',
  authDomain: 'englishflashcard-3254e.firebaseapp.com',
  storageBucket: 'englishflashcard-3254e.appspot.com',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
