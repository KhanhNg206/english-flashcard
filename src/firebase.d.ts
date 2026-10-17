declare module 'firebase/app' {
  export interface FirebaseApp {
    name: string;
    options: Record<string, any>;
  }
  export function initializeApp(options: Record<string, any>, name?: string): FirebaseApp;
}

declare module 'firebase/firestore' {
  export interface Firestore {
    type: string;
    app: any;
  }
  export interface DocumentData {
    [field: string]: any;
  }
  export interface QueryDocumentSnapshot<T = DocumentData> {
    id: string;
    data(): T;
  }
  export interface QuerySnapshot<T = DocumentData> {
    empty: boolean;
    size: number;
    docs: QueryDocumentSnapshot<T>[];
    forEach(callback: (result: QueryDocumentSnapshot<T>) => void, thisArg?: any): void;
  }
  export interface DocumentReference<T = DocumentData> {
    id: string;
    path: string;
  }
  export interface CollectionReference<T = DocumentData> {
    id: string;
    path: string;
  }
  export interface WriteBatch {
    set<T>(documentRef: DocumentReference<T>, data: Partial<T>, options?: { merge?: boolean }): WriteBatch;
    commit(): Promise<void>;
  }

  export function getFirestore(app?: any): Firestore;
  export function collection(firestore: Firestore, path: string, ...pathSegments: string[]): CollectionReference;
  export function doc(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference;
  export function getDocs(query: any): Promise<QuerySnapshot>;
  export function setDoc(reference: DocumentReference, data: any, options?: { merge?: boolean }): Promise<void>;
  export function deleteDoc(reference: DocumentReference): Promise<void>;
  export function writeBatch(firestore: Firestore): WriteBatch;
}
