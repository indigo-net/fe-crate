import { BrowserRouter, Routes, Route } from 'react-router-dom';

import KakaoRedirectPage from './pages/kakao-redirect';
import LandingPage from './pages/landing';
import NewFormPage from './pages/new-form';
import { ToastProvider } from './shared/context';

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new-form" element={<NewFormPage />} />
          <Route path="/kakao-authorize" element={<KakaoRedirectPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
