import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Cấu hình base cho GitHub Pages
// Nếu repo tên là "english-flashcard" thì base = '/english-flashcard/'
// Thay USERNAME và REPO_NAME cho phù hợp
export default defineConfig({
  plugins: [react()],
  base: '/english-flashcard/', // <-- Đổi thành tên repo của bạn
})
