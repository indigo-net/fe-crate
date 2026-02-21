import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { EnvManager } from '@/shared/lib';

import './styles/index.css';

async function enableMocking() {
  // 개발 환경에서만 MSW 활성화
  if (EnvManager.checkDevMode()) {
    const { worker } = await import('@/shared/lib/msw');

    // Service Worker 시작
    return worker.start({
      onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 실제 네트워크로 전달
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

