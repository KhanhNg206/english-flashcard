// =============================================
// utils/parseTxt.ts
// Parse file .txt thành danh sách từ vựng
// =============================================

import type { Word } from '../types';

/**
 * Parse nội dung file TXT thành mảng Word
 * Format mỗi dòng: "từ tiếng Anh|nghĩa tiếng Việt"
 * Ví dụ: "apple|quả táo"
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

    // Tách theo dấu | đầu tiên (phòng trường hợp nghĩa có chứa |)
    const pipeIndex = trimmedLine.indexOf('|');
    const word    = trimmedLine.slice(0, pipeIndex).trim();
    const meaning = trimmedLine.slice(pipeIndex + 1).trim();

    // Bỏ qua nếu từ hoặc nghĩa bị rỗng
    if (!word || !meaning) continue;

    words.push({
      id: idCounter++,
      word,
      meaning,
      status: 'new', // Mặc định khi mới import
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
  
  // Nối các từ lại thành chuỗi, định dạng word|meaning
  const textContent = words.map(w => `${w.word}|${w.meaning}`).join('\n');
  
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
