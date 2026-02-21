# App Layer Structure

This file documents the structure of the `src/app/` directory.

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

## Modules

### ui/
- `index.tsx` - Main App component with routing and provider composition

### lib/context-provider/
- `ModalProvider/` - Modal dialog context
- `AlertProvider/` - Alert dialog context
- `ToastProvider/` - Toast notification context

## Notes
- This layer has no slices - all code is directly under segments
- All pages are wrapped with the same providers
- Provider order: `ToastProvider` → `AlertProvider` → `ModalProvider`
