// =============================================
// App.tsx
// Cấu hình Router và Layout chính của ứng dụng
// =============================================

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Quiz from './pages/Quiz';
import Study from './pages/Study';
import Vocabulary from './pages/Vocabulary';
import VocabularyDetail from './pages/VocabularyDetail';
import Theory from './pages/Theory';
import TheoryDetail from './pages/TheoryDetail';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/theory/:id" element={<TheoryDetail />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/vocabulary/:id" element={<VocabularyDetail />} />
          <Route path="/study/:id" element={<Study />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
