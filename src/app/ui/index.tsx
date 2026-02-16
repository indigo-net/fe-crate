import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AlertProvider, ToastProvider, ModalProvider } from '@/app/lib';
import { PageDashboard, PageKakaoRedirect, PageLanding, PageNewForm } from '@/pages/ui';

const App = () => {
  return (
    <ToastProvider>
      <AlertProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PageLanding />} />
              <Route path="/kakao-authorize" element={<PageKakaoRedirect />} />
              <Route path="/dashboard" element={<PageDashboard />} />
              <Route path="/new-form" element={<PageNewForm />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </AlertProvider>
    </ToastProvider>
  );
};

export default App;
