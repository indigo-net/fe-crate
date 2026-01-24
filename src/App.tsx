import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard';
import KakaoRedirectPage from './pages/kakao-redirect';
import LandingPage from './pages/landing';
import NewFormPage from './pages/new-form';
import { ToastProvider, ModalProvider } from './shared/context';

const App = () => {
  return (
    <ToastProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-form" element={<NewFormPage />} />
            <Route path="/kakao-authorize" element={<KakaoRedirectPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ToastProvider>
  );
};

export default App;
