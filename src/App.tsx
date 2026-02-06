import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/ui/dashboard';
import KakaoRedirectPage from './pages/ui/kakao-redirect';
import LandingPage from './pages/ui/landing';
import NewFormPage from './pages/ui/new-form';
import { AlertProvider, ToastProvider, ModalProvider } from './shared/lib';

const App = () => {
  return (
    <ToastProvider>
      <AlertProvider>
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
      </AlertProvider>
    </ToastProvider>
  );
};

export default App;
