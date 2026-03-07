import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AlertProvider, AuthProvider, ToastProvider, ModalProvider } from '@/app/lib';
import {
  PageDashboard,
  PageEvaluation,
  PageEvaluatorDashboard,
  PageFormApply,
  PageFormDetail,
  PageKakaoRedirect,
  PageLanding,
  PageNewForm,
} from '@/pages/ui';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AlertProvider>
            <ModalProvider>
              <Routes>
                <Route path="/" element={<PageLanding />} />
                <Route path="/kakao-authorize" element={<PageKakaoRedirect />} />
                <Route path="/dashboard" element={<PageDashboard />} />
                <Route path="/evaluator/dashboard" element={<PageEvaluatorDashboard />} />
                <Route path="/evaluation/:formId" element={<PageEvaluation />} />
                <Route path="/new-form" element={<PageNewForm />} />
                <Route path="/form/:formId" element={<PageFormDetail />} />
                <Route path="/form/:formId/apply" element={<PageFormApply />} />
              </Routes>
            </ModalProvider>
          </AlertProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
