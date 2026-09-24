// =============================================
// utils/speech.ts
// Text-to-Speech dùng Web Speech API
// =============================================

/** Kiểm tra trình duyệt có hỗ trợ Speech Synthesis không */
export function isSpeechSupported(): boolean {
  return 'speechSynthesis' in window;
}

/**
 * Đọc một từ tiếng Anh bằng giọng đọc của trình duyệt
 * @param word - Từ cần đọc
 * @param lang - Ngôn ngữ (mặc định: 'en-US')
 */
export function speakWord(word: string, lang = 'en-US'): void {
  if (!isSpeechSupported()) {
    alert('Trình duyệt của bạn không hỗ trợ Text-to-Speech.');
    return;
  }

  // Dừng bất kỳ âm thanh nào đang phát
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = lang;
  utterance.rate = 0.9;   // Tốc độ đọc (0.1 - 10)
  utterance.pitch = 1;    // Cao độ giọng (0 - 2)
  utterance.volume = 1;   // Âm lượng (0 - 1)

  window.speechSynthesis.speak(utterance);
}
