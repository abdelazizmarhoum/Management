import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InputPage } from './pages/InputPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<InputPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;