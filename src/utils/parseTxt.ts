// =============================================
// utils/parseTxt.ts
// Parse file .txt thành danh sách từ vựng
// =============================================

import type { Word } from '../types';

/**
 * Parse nội dung file TXT thành mảng Word
 * Hỗ trợ các format:
 * 1. "word|meaning"
 * 2. "word|meaning|wordType"
 * 3. "word|meaning|wordType|note"
 * Ví dụ: "apple|quả táo|noun|Trái cây ăn ngon"
 */
export function parseVocabularyFile(text: string): Word[] {
  const words: Word[] = [];
  const lines = text.split('\n'); // Tách từng dòng

  let idCounter = 1;

  for (const line of lines) {
    // Bỏ qua dòng trống
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Kiểm tra có dấu | không
    if (!trimmedLine.includes('|')) continue;

    const parts = trimmedLine.split('|').map(p => p.trim());
    const word = parts[0] || '';
    const meaning = parts[1] || '';
    const wordType = parts[2] || undefined;
    const note = parts[3] || undefined;

    // Bỏ qua nếu từ hoặc nghĩa bị rỗng
    if (!word || !meaning) continue;

    words.push({
      id: idCounter++,
      word,
      meaning,
      status: 'new', // Mặc định khi mới import
      wordType: wordType || undefined,
      note: note || undefined,
    });
  }

  return words;
}

/**
 * Validate file TXT trước khi parse
 * Trả về { valid: true } hoặc { valid: false, error: '...' }
 */
export function validateTxtFile(file: File): { valid: boolean; error?: string } {
  // Kiểm tra extension
  if (!file.name.toLowerCase().endsWith('.txt')) {
    return { valid: false, error: 'Chỉ chấp nhận file .txt' };
  }

  // Kiểm tra kích thước (tối đa 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: 'File quá lớn. Tối đa 5MB.' };
  }

  return { valid: true };
}

/**
 * Xuất danh sách từ vựng ra file .txt
 */
export function exportToTXT(setName: string, words: Word[]): void {
  if (words.length === 0) {
    alert("Bộ từ vựng này đang trống.");
    return;
  }
  
  // Nối các từ lại thành chuỗi, định dạng word|meaning|wordType|note (nếu có)
  const textContent = words.map(w => {
    if (w.note) {
      return `${w.word}|${w.meaning}|${w.wordType || ''}|${w.note}`;
    }
    if (w.wordType) {
      return `${w.word}|${w.meaning}|${w.wordType}`;
    }
    return `${w.word}|${w.meaning}`;
  }).join('\n');
  
  // Tạo blob chứa dữ liệu
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Tạo thẻ a ẩn để trigger download
  const link = document.createElement('a');
  link.href = url;
  // Đặt tên file là tên bộ từ (xóa các ký tự đặc biệt có thể gây lỗi tên file)
  const safeFileName = setName.replace(/[^a-zA-Z0-9\s-_A-ZÀ-Ỹà-ỹ]/g, '').trim() || 'vocabulary';
  link.download = `${safeFileName}.txt`;
  
  document.body.appendChild(link);
  link.click();
  
  // Dọn dẹp
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
