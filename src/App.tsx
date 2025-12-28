import { BrowserRouter, Routes, Route } from 'react-router-dom';

import KakaoRedirect from './pages/kakao-redirect';
import LandingPage from './pages/landing';
import NewFormPage from './pages/new-form';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/new-form" element={<NewFormPage />} />
        <Route path="/kakao-authorize" element={<KakaoRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
