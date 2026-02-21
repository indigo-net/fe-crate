---
name: app-layer
description: "Use this skill when working on the App layer of the FSD architecture. Triggers include: 'app layer', 'routing', 'context provider', 'entry point', 'provider setup', or when modifying src/app/ directory. Also use when adding new routes, providers, or understanding application initialization. Do NOT use for page-level components or business logic."
license: Proprietary
---

# App Layer Guide

## Overview

The `app` layer is the application entry point. It provides routing and context providers. This layer has no slices - all code is organized directly under segments.

## Quick Reference

| Task | Location |
|------|----------|
| Add new route | `src/app/ui/index.tsx` |
| Create context provider | `src/app/lib/context-provider/` |
| Modify provider order | `src/app/ui/index.tsx` |
| Access modal context | `useModalContext` |
| Access alert context | `useAlertContext` |
| Access toast context | `useToastContext` |

## Directory Structure

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

## Entry Point

`main.tsx` imports from `src/app/ui`:

```typescript
// src/main.tsx
import App from '@/app/ui';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
```

## App Component Structure

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

## Context Providers

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

### Provider Exports

```typescript
// src/app/lib/context-provider/index.ts
export { ModalProvider, useModalContext } from './ModalProvider';
export { AlertProvider, useAlertContext } from './AlertProvider';
export { ToastProvider, useToastContext } from './ToastProvider';
```

## Key Points

| Rule | Description |
|------|-------------|
| Unified providers | All pages wrapped with same providers |
| Routes in index.tsx | All routing defined in app/ui/index.tsx |
| Provider order | `ToastProvider` → `AlertProvider` → `ModalProvider` |
| No src/App.tsx | App component is in src/app/ui/index.tsx |

**CRITICAL**: Provider order matters! Always wrap in this order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Reference

For current file structure and module list, see `./STRUCTURE.md`.
