# Shared Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

### Directory Structure

```
src/shared/
├── types.d.ts          # Common type definitions (moved from @types)
├── lib/                # Utility classes and helper functions
│   ├── axios-manager/
│   ├── env-manager/
│   ├── type-guard/
│   ├── uuid/
│   ├── date-standard/
│   ├── developer-console/
│   └── index.ts
├── model/              # Base classes only
│   ├── custom-model/
│   └── index.ts
└── ui/                 # Base UI components
    ├── Modal/
    ├── Alert/
    ├── Toast/
    ├── Radio/
    ├── iconography/
    └── index.ts
```

### Shared vs Domain Modules

When creating a new module, decide the location based on scope:

| Scope | Location | Example |
|-------|----------|---------|
| Used in one domain | `entities/(domain)/lib/` | `QuestionStateService` |
| Used across multiple domains | `shared/lib/` | `TypeGuard`, `UUID` |
| Domain-specific model | `entities/(domain)/model/` | `FormQuestionModel` |
| Base class for all models | `shared/model/` | `CustomModel` |

### shared/lib Modules

**Utility Classes** (singleton pattern):

```typescript
// AxiosManager - HTTP client instance
import { AxiosManager } from '@/shared/lib';
const axios = AxiosManager.getAxiosInstance();

// EnvManager - Environment variables
const apiUrl = EnvManager.getAppEnv('VITE_API_BASE_URL');

// TypeGuard - Runtime type checking
if (TypeGuard.checkNull(value)) { /* ... */ }
if (TypeGuard.checkString(value)) { /* ... */ }
```

**Helper Functions**:

```typescript
// UUID - Unique identifier generation
const id = UUID.v4();

// DateStandard - Date formatting standards
const now = DateStandard.now();  // ISO 8601 UTC

// DeveloperConsole - Development logging (replaces console.*)
DeveloperConsole.log({ message: 'Action completed', data: { id: 123 } });
```

### shared/model

Contains only base classes that domain models extend:

```typescript
// shared/model/custom-model/index.ts
abstract class CustomModel<T> {
  abstract toJSON(): T;
  abstract clone(props?: Partial<T>): CustomModel<T>;
}
```

### shared/ui

Base UI components used throughout the application:

- **Layout components**: Modal, Alert, Toast
- **Form components**: Radio
- **Iconography**: Logo icons, Stroke icons

```typescript
// Usage example
import { Iconography, Modal, Alert, Toast, Radio } from '@/shared/ui';
```

### shared/types.d.ts

Common type definitions shared across the application:

```typescript
// shared/types.d.ts
type AppEnvKey = 'VITE_API_BASE_URL' | 'VITE_KAKAO_CLIENT_ID' | 'VITE_KAKAO_REDIRECT_URI';

export type { AppEnvKey };
```

### Context Providers (in app layer)

Global context providers are located in `app/lib/context-provider/`:

```
src/app/lib/context-provider/
├── ModalProvider/
├── AlertProvider/
├── ToastProvider/
└── index.ts
```

All pages are wrapped with the same providers. Provider order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
