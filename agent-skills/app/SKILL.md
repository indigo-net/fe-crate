# App Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

### Directory Structure

```
src/app/
├── ui/
│   └── index.tsx             # App entry with routes and provider wrapping
├── lib/
│   ├── context-provider/     # Individual context providers
│   │   ├── ModalProvider/
│   │   ├── AlertProvider/
│   │   ├── ToastProvider/
│   │   └── index.ts
│   └── index.ts
└── index.ts                  # Public API
```

### Entry Point

`main.tsx` imports from `src/app/ui`:

```typescript
// src/main.tsx
import App from '@/app/ui';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
```

### App Component Structure

```typescript
// src/app/ui/index.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AlertProvider, ToastProvider, ModalProvider } from '@/app/lib';
import { PageLanding, PageDashboard, PageNewForm, PageKakaoRedirect } from '@/pages/ui';

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
```

### Context Providers

Each provider is defined in `app/lib/context-provider/`:

```
src/app/lib/context-provider/
├── ModalProvider/
│   ├── index.tsx
│   ├── hook.ts
│   └── type.d.ts
├── AlertProvider/
│   ├── index.tsx
│   └── hook.ts
├── ToastProvider/
│   ├── index.tsx
│   └── hook.ts
└── index.ts
```

```typescript
// src/app/lib/context-provider/index.ts
export { ModalProvider, useModalContext } from './ModalProvider';
export { AlertProvider, useAlertContext } from './AlertProvider';
export { ToastProvider, useToastContext } from './ToastProvider';
```

### Key Points

1. **Unified providers** - All pages wrapped with same providers
2. **Routes in index.tsx** - All routing defined in app/ui/index.tsx
3. **Provider order matters** - ToastProvider → AlertProvider → ModalProvider
4. **No src/App.tsx** - App component is in src/app/ui/index.tsx

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
