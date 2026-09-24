// =============================================
// main.tsx
// Entry point của ứng dụng
// =============================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { VocabularyProvider } from './context/VocabularyContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Dùng HashRouter để deploy GitHub Pages không bị lỗi 404 khi reload */}
    <HashRouter>
      <VocabularyProvider>
        <App />
      </VocabularyProvider>
    </HashRouter>
  </StrictMode>,
);
