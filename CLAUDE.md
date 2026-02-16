# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CRATE is a selection optimization solution - a React application that streamlines recruitment processes from application collection to evaluation. It provides an integrated platform for creating forms, managing evaluators, and conducting fair selection processes.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check and build for production
pnpm build

# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Preview production build
pnpm preview
```

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS v4 with custom design tokens
- **State Management**: Zustand
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Architecture: Feature-Sliced Design (FSD)

This project follows the Feature-Sliced Design methodology. The `src/` directory is structured into layers with strict dependency rules:

### Layer Structure (higher layers depend on lower layers)

```
src/
├── app/           # Application initialization, providers, routing
├── pages/         # Page compositions - route-level components
├── widgets/       # Complex UI compositions (not yet implemented)
├── features/      # User-facing feature implementations
├── entities/      # Business domain models and logic
├── shared/        # Reusable utilities and base UI components
└── styles/        # Global CSS and design tokens
```

### Unified Segments

Each layer/slice can use these segments as needed. **Only create segments that are actually used**:

| Segment | Purpose | Example Contents |
|---------|---------|------------------|
| `ui/` | UI components | React components, Iconography |
| `store/` | State management | Zustand stores |
| `types.d.ts` | Type definitions | Type aliases, enums |
| `model/` | Data models | Model classes extending CustomModel |
| `api/` | API calls | API functions using AxiosManager |
| `lib/` | Utilities & services | Helper functions, service classes |

```
# Example: Full segment structure for a slice
src/entities/(domain)/
├── ui/
├── store/
├── types.d.ts
├── model/
├── api/
└── lib/

# Example: Minimal segment structure
src/features/(feature)/
├── ui/
└── lib/
```

### Key Architectural Patterns

1. **Layer Isolation**: Each layer can only import from layers below it
2. **Slice Segmentation**: Each feature/entity is self-contained with its own `ui/`, `lib/`, `model/`, `store/` directories
3. **Public API**: Each slice exports through `index.ts` files

## Import Order (ESLint Rule)

Imports must be ordered as follows (enforced by eslint-plugin-import):

1. Built-in modules
2. External packages
3. Internal modules (`@/` alias)
4. Parent imports
5. Sibling imports (ordered: `./lib/**` → `./model/**` → `./store/**` → `./ui/**`)
6. Index imports

The path alias `@/` resolves to `src/`.

## Design System

### Color Tokens

The project uses a comprehensive color token system defined in `src/styles/colors.css`:

- **Brand Colors**: Indigo (primary), Orange (secondary)
- **Semantic Tokens**: `brand-primary`, `brand-secondary`, `bg-*`, `text-*`, `border-*`, `interactive-*`
- **Functional Colors**: `success`, `warning`, `error`, `info`
- **Neon Palette**: `neon-pink-*`, `neon-green-*`, `neon-violet-*` for accent effects

### Custom Tailwind Utilities

- Border radius: `rounded-slim-{sm, md, lg, xl, 2xl}`
- Border width: `border-slim`, `border-thin`
- Font weight: `font-slim-{thin, normal, semibold, bold}`
- Breakpoints: `mobile:365px`, `desktop:720px`

### Dark Mode

Toggle dark mode by adding/removing the `dark` class on the document root. Color tokens automatically adjust via CSS variables.

## State Management Pattern

### Zustand Stores

Located in `entities/*/store/` - use Zustand for state management:

```typescript
// Store pattern
interface State {
  data: SomeModel[];
  setData: (next: SomeModel[] | ((prev: SomeModel[]) => SomeModel[])) => void;
}
```

### Custom Models

Domain models extend `CustomModel<T>` from `shared/model/`:

```typescript
abstract class CustomModel<T> {
  abstract toJSON(): T;
  abstract clone(props?: Partial<T>): CustomModel<T>;
}
```

This ensures immutable state updates and serialization support.

## Context System

Global UI contexts are provided in `app/lib/context-provider/`:

- `ModalProvider` / `useModalContext` - Modal dialogs
- `AlertProvider` / `useAlertContext` - Alert dialogs
- `ToastProvider` / `useToastContext` - Toast notifications

Wrap the app with these providers in order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Routing

Routes are defined in `src/app/ui/index.tsx`:

- `/` - Landing page
- `/new-form` - Form creation page
- `/kakao-authorize` - Kakao OAuth redirect handler
- `/dashboard` - Admin dashboard

## Environment Variables

Access via `EnvManager.getAppEnv(key)` or `import.meta.env[key]`:

- `VITE_API_BASE_URL` - API base URL
- `VITE_KAKAO_CLIENT_ID` - Kakao OAuth client ID
- `VITE_KAKAO_REDIRECT_URI` - Kakao OAuth redirect URI

## Code Style Guide

### Component Declaration

Use arrow functions with `memo` for all components. Always set `displayName` for debugging:

```typescript
// ✅ Correct
const ComponentName = memo(() => {
  // component logic
});
ComponentName.displayName = 'ComponentName';

export default ComponentName;

// ❌ Avoid
function ComponentName() { ... }
const ComponentName = function() { ... }
```

### Component Directory Structure

Always use folder structure for components, even for simple ones:

```
ComponentName/
├── index.tsx      # Component implementation
├── hook.ts        # Custom hooks for the component (if needed)
└── type.d.ts      # Type definitions (if needed)
```

### Props Type Definition

Use `interface` for Props types:

```typescript
// ✅ Correct
interface Props {
  title: string;
  onSubmit: () => void;
}

// ❌ Avoid
type Props = {
  title: string;
  onSubmit: () => void;
}
```

### File Naming Convention

All component files and directories use **PascalCase**:

```
✅ ComponentName/index.tsx
✅ QuestionAddSection/index.tsx
✅ FormSignatureEditSection/index.tsx
✅ DarkModeButton/index.tsx

❌ question-add-section/index.tsx
❌ form-signature-edit-section/index.tsx
❌ dark-mode-button/index.tsx
```

### Hook File Naming

Use `hook.ts` for component-level hooks:

```
ComponentName/
├── index.tsx
└── hook.ts        # Custom hook for this component
```

### Export Pattern

Use default export at the end of the file (component is already memoized):

```typescript
const ComponentName = memo(() => {
  // ...
});
ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

### Comments

Use JSDoc style for documentation:

```typescript
/**
 * 폼 질문을 렌더링하는 컴포넌트입니다.
 * @param {FormQuestionModel} question - 질문 데이터 모델
 * @param {(id: string, value: string) => void} onChangeTitle - 제목 변경 핸들러
 */
```

### Logging

Use `DeveloperConsole` instead of native `console` methods:

```typescript
// ✅ Correct
import DeveloperConsole from '@/shared/lib/developer-console';

DeveloperConsole.log({ message: 'User action', data: { userId: 123 } });
DeveloperConsole.error({ message: 'API error', data: error });

// ❌ Avoid
console.log('User action');
console.error(error);
```

### Early Return Pattern

Prefer early returns over nested conditions:

```typescript
// ✅ Correct
const handleSubmit = () => {
  if (!isValid) {
    return;
  }
  if (isLoading) {
    return;
  }
  submitForm();
};

// ❌ Avoid
const handleSubmit = () => {
  if (isValid) {
    if (!isLoading) {
      submitForm();
    }
  }
};
```

## Entities Layer Best Practices

The `entities` layer defines domain models, types, and related utilities for specific business concerns.

### Directory Structure

```
src/entities/(domain)/
├── types.d.ts              # Domain-level type aliases and enums
├── api/
│   ├── (feature)-api.ts    # API call functions (use AxiosManager)
│   └── index.ts            # Public API exports
├── lib/
│   ├── (model)-state-service.ts    # Static methods for state mutations
│   ├── (model)-api-service.ts      # API execution + response-to-model conversion
│   └── index.ts            # Public API exports
├── model/
│   ├── (model)Model/       # Domain model class
│   │   └── index.ts
│   └── index.ts            # Public API exports
├── store/
│   ├── use(model)Store.ts  # Zustand store for the model
│   └── index.ts            # Public API exports
└── ui/                     # Domain-specific UI components
    └── index.ts            # Public API exports
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Model | `*Model` | `FormQuestionModel`, `FormSignatureModel` |
| Store | `use*Store` | `useFormQuestionListStore`, `useFormSignatureStore` |
| Service (State) | `*StateService` | `QuestionStateService`, `QuestionListStateService` |
| Service (API) | `*ApiService` | `QuestionApiService`, `FormApiService` |
| Service (Cache) | `*CacheService` | `CacheService` |
| Service (Sort) | `*SortService` | `QuestionSortService` |
| API Function | `*Api` | `questionApi`, `formApi` |

Service naming follows its purpose - not all services need `State` suffix.

### Type Definitions

**Domain Types (enums, type aliases)**: Place in `entities/(domain)/types.d.ts`

```typescript
// src/entities/form/types.d.ts
type FormQuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

export type { FormQuestionType };
```

**Model I/O Types (Props, State)**: Define inside the Model file

```typescript
// src/entities/form/model/form-question/index.ts
interface State {
  id: string;
  title: string;
  // ...
}

interface Props {
  id?: string;
  title: string;
  // ...
}

class FormQuestionModel extends CustomModel<State> {
  // ...
}
```

### Model Pattern

Extend `CustomModel<T>` and use `getValue`/`setValue` pattern:

```typescript
class FormQuestionModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    this.state = { /* initialize from props */ };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormQuestionModel {
    return this.clone({ [key]: value });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<Exclude<State, 'id'>>): FormQuestionModel {
    return new FormQuestionModel({ ...this.state, ...props });
  }
}
```

### State Service Pattern

Use static methods for state mutations:

```typescript
// src/entities/form/lib/question-state-service.ts
class QuestionStateService {
  static getInitialQuestion(type: FormQuestionType): FormQuestionModel {
    return new FormQuestionModel({ title: '', type });
  }

  static editQuestionTitle(prev: FormQuestionModel, title: string): FormQuestionModel {
    return prev.setValue('title', title);
  }

  static editQuestionType(prev: FormQuestionModel, type: FormQuestionType): FormQuestionModel {
    return prev.setValue('type', type);
  }
}
```

### Store Pattern

Use Zustand with type-safe state interface:

```typescript
// src/entities/form/store/use-form-question-list-store.ts
interface State {
  formQuestions: FormQuestionModel[];
  setFormQuestions: (
    next: FormQuestionModel[] | ((prev: FormQuestionModel[]) => FormQuestionModel[]),
  ) => void;
}

const useFormQuestionListStore = create<State>(set => ({
  formQuestions: [],
  setFormQuestions: next => {
    set(state => ({
      formQuestions: typeof next === 'function' ? next(state.formQuestions) : next,
    }));
  },
}));
```

### API Layer Pattern

**API Functions** (`api/(feature)-api.ts`): Define raw API calls using `AxiosManager`

```typescript
// src/entities/form/api/form-api.ts
import { AxiosManager } from '@/shared/lib';

const formApi = {
  getFormList: () => AxiosManager.getAxiosInstance().get('/forms'),
  getFormDetail: (id: string) => AxiosManager.getAxiosInstance().get(`/forms/${id}`),
  createForm: (data: CreateFormRequest) => AxiosManager.getAxiosInstance().post('/forms', data),
};
```

**API Service** (`lib/(model)-api-service.ts`): Execute API calls and convert responses to models

```typescript
// src/entities/form/lib/form-api-service.ts
import { formApi } from '../api';
import { FormQuestionModel } from '../model';

class FormApiService {
  static async getFormQuestions(formId: string): Promise<FormQuestionModel[]> {
    const response = await formApi.getFormDetail(formId);
    return response.data.questions.map(q => new FormQuestionModel(q));
  }
}
```

### Segment Index Files

Each segment (api, lib, model, store, ui) should have an `index.ts` that exports only publicly accessible modules.

**IMPORTANT: Always use named exports with the following pattern:**

```typescript
export { default as (ModuleName) } from './module-directory';
```

**Examples:**

```typescript
// src/entities/form/model/index.ts
export { default as FormQuestionModel } from './form-question';
export { default as FormQuestionOptionModel } from './form-question/option';
export { default as FormSignatureModel } from './form-signature';

// src/entities/form/lib/index.ts
export { default as QuestionStateService } from './question-state-service';
export { default as QuestionListStateService } from './question-list-state-service';
export { default as FormApiService } from './form-api-service';

// src/app/index.ts (slice-level public API)
export { default as App } from './ui';
export { AlertProvider, useAlertContext } from './lib';

// src/pages/ui/index.ts (segment-level re-exports)
export { default as PageDashboard } from './PageDashboard';
export { default as PageLanding } from './PageLanding';
export { default as ModalPublishSetting } from './ModalPublishSetting';
```

## Shared Layer Best Practices

The `shared` layer contains reusable utilities, base components, and foundational code used across the entire application.

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

## Features Layer Best Practices

The `features` layer contains user-facing features that represent user actions. Each feature handles user interactions and may communicate with APIs.

### Directory Structure

```
src/features/(feature)/
├── ui/                     # Interactive UI components
│   ├── ComponentName/      # Role-based naming (*Section, *Button, etc.)
│   │   ├── index.tsx
│   │   └── hook.ts         # Component logic hook (unified naming)
│   └── index.ts
├── api/                    # API call declarations
│   ├── (feature)-api.ts    # Raw API functions
│   └── index.ts
├── lib/                    # Feature logic
│   ├── (feature)-api-service.ts  # API execution + response handling
│   └── index.ts
└── types.d.ts              # Feature-specific types (if needed)
```

### Feature Definition

A **feature** represents a user action or interaction:
- `edit-form` - Form editing functionality
- `authenticate` - User authentication
- `toggle-theme` - Theme switching
- `submit-application` - Application submission

### Naming Convention

Use **verb-noun** pattern for feature names:

```
✅ edit-form, toggle-theme, submit-application, authenticate
❌ form-editor, theme-switcher, application-submitter
```

### Segments

| Segment | Purpose | When to Use |
|---------|---------|-------------|
| `ui/` | Interactive components | Always (required) |
| `api/` | API call declarations | When API calls are needed |
| `lib/` | Feature logic, API services | When complex logic is needed |
| `types.d.ts` | Feature-specific types | When custom types are needed |

### UI Components

**When to use features/ui vs entities/ui:**

| Component Type | Location | Example |
|----------------|----------|---------|
| Interactive UI with event handling | `features/*/ui/` | `QuestionAddSection`, `FormSignatureEditSection` |
| Static/presentational UI | `entities/*/ui/` | `QuestionCard`, `FormSignatureDisplay` |
| Base reusable UI | `shared/ui/` | `Modal`, `Button`, `Input` |

**Component Naming:** Use role-based naming:
- `*Section` - Major UI sections (e.g., `FormSignatureEditSection`)
- `*Button` - Action buttons (e.g., `SubmitButton`, `DarkModeButton`)
- `*List` - List components (e.g., `QuestionList`)

### API Layer Pattern

**API Functions** (`api/(feature)-api.ts`): Declare raw API calls

```typescript
// src/features/submit-form/api/submit-form-api.ts
import { AxiosManager } from '@/shared/lib';

const submitFormApi = {
  submitForm: (data: SubmitFormRequest) =>
    AxiosManager.getAxiosInstance().post('/forms/submit', data),
  saveDraft: (data: SaveDraftRequest) =>
    AxiosManager.getAxiosInstance().post('/forms/draft', data),
};

export { submitFormApi };
```

**API Service** (`lib/(feature)-api-service.ts`): Execute API and handle responses

```typescript
// src/features/submit-form/lib/submit-form-api-service.ts
import { submitFormApi } from '../api';
import { FormQuestionModel } from '@/entities/form/model';

class SubmitFormApiService {
  static async submitForm(questions: FormQuestionModel[]): Promise<void> {
    const requestData = {
      questions: questions.map(q => q.toJSON()),
    };
    await submitFormApi.submitForm(requestData);
  }
}

export default SubmitFormApiService;
```

### Hook Pattern

Use `hook.ts` for component logic (unified with entities naming):

```typescript
// src/features/edit-form/ui/QuestionAddSection/hook.ts
import { useCallback } from 'react';
import { QuestionStateService, QuestionListStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';
import type { FormQuestionType } from '@/entities/form';

const useQuestionAddSectionController = () => {
  const { setFormQuestions } = useFormQuestionListStore();

  const handleAddQuestion = useCallback((questionType: FormQuestionType) => {
    const formQuestion = QuestionStateService.getInitialQuestion(questionType);
    setFormQuestions(prev => QuestionListStateService.pushQuestion(prev, formQuestion));
  }, [setFormQuestions]);

  return { handleAddQuestion };
};

export default useQuestionAddSectionController;
```

### Relationship with Entities

Features **use** entities but don't define new models:

```typescript
// ✅ Correct: Using entities models and stores
import { FormQuestionModel } from '@/entities/form/model';
import { useFormQuestionListStore } from '@/entities/form/store';
import { QuestionStateService } from '@/entities/form/lib';

// ❌ Avoid: Defining new models in features
class FeatureSpecificModel { ... }
```

### Example: Complete Feature Structure

```
src/features/submit-form/
├── ui/
│   ├── SubmitButton/
│   │   ├── index.tsx           # Submit button component
│   │   └── hook.ts             # Submit logic
│   ├── DraftSaveButton/
│   │   ├── index.tsx
│   │   └── hook.ts
│   └── index.ts
├── api/
│   ├── submit-form-api.ts      # POST /forms/submit, POST /forms/draft
│   └── index.ts
├── lib/
│   ├── submit-form-api-service.ts
│   └── index.ts
└── types.d.ts                  # SubmitFormRequest, SaveDraftRequest
```

## Widgets Layer Best Practices

The `widgets` layer contains large, self-contained UI units that compose pages or modals. Purpose is to improve pages/ui readability by extracting complex UI blocks.

### Purpose

- Extract large UI blocks from pages for better readability
- Compose multiple features/entities into cohesive units
- Reusable across different pages (optional)

### Directory Structure

```
src/widgets/(widget)/
├── ui/
│   ├── WidgetName/
│   │   ├── index.tsx         # Widget component (memo required)
│   │   └── hook.ts           # Widget logic (if needed)
│   └── index.ts
└── types.d.ts                # Widget-specific types (if needed)
```

### Widget Definition

A **widget** is a large UI unit that:
- Combines multiple features/entities components
- Represents a significant portion of a page or modal
- Is self-contained with its own logic

Examples:
- `DashboardHeader` - Page header with navigation and user info
- `FormBuilder` - Complete form editing interface
- `EvaluationPanel` - Application evaluation interface

### Requirements

**React.memo is mandatory** for all widget components:

```typescript
// src/widgets/dashboard-header/ui/DashboardHeader/index.tsx
import { memo } from 'react';

interface Props {
  userName: string;
  onLogout: () => void;
}

const DashboardHeader = memo(({ userName, onLogout }: Props) => {
  return (
    <header>
      {/* Header implementation */}
    </header>
  );
});
DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
```

### When to Create a Widget

| Situation | Action |
|-----------|--------|
| Page component exceeds ~150 lines | Extract large sections as widgets |
| Multiple features combined in one UI block | Create a widget |
| Reusable across pages | Consider creating a widget |
| Simple component | Keep in features or entities |

### Example: Page with Widgets

```
src/pages/dashboard/
├── ui/
│   └── index.tsx           # Clean composition of widgets
└── hook.ts

src/widgets/
├── dashboard-header/
│   └── ui/DashboardHeader/
├── dashboard-stats/
│   └── ui/DashboardStats/
├── evaluator-list/
│   └── ui/EvaluatorList/
└── activity-feed/
    └── ui/ActivityFeed/
```

```typescript
// src/pages/dashboard/ui/index.tsx
import { DashboardHeader, DashboardStats, EvaluatorList, ActivityFeed } from '@/widgets';

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <main>
        <DashboardStats />
        <EvaluatorList />
        <ActivityFeed />
      </main>
    </div>
  );
};
```

## Pages Layer Best Practices

The `pages` layer contains page and modal compositions. Only UI segment is used. No slices - components are organized directly under `ui/`.

### Directory Structure

```
src/pages/
├── ui/
│   ├── index.tsx             # Export all pages
│   ├── PageDashboard/
│   │   ├── index.tsx
│   │   └── hook.ts
│   ├── PageLanding/
│   │   ├── index.tsx
│   │   └── hook.ts
│   ├── PageNewForm/
│   ├── PageKakaoRedirect/
│   └── ModalPublishSetting/
└── index.ts
```

### Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| Page | `Page` | `PageMainLanding.tsx`, `PageDashboard.tsx` |
| Modal | `Modal` | `ModalFormPublishSetting.tsx`, `ModalUserProfile.tsx` |

### Example Structure

```
src/pages/
├── ui/
│   ├── index.tsx               # Export all pages
│   ├── PageDashboard/
│   ├── PageLanding/
│   ├── PageNewForm/
│   ├── PageKakaoRedirect/
│   └── ModalPublishSetting/
└── index.ts
```

### Page Component Pattern

```typescript
// src/pages/ui/PageDashboard/index.tsx
import { memo } from 'react';
import { DashboardHeader, DashboardStats, EvaluatorList } from '@/widgets';
import { usePageDashboardController } from './hook';

interface Props {
  // Route params if needed
}

const PageDashboard = memo(({}: Props) => {
  const { data } = usePageDashboardController();

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main>
        <DashboardStats data={data.stats} />
        <EvaluatorList evaluators={data.evaluators} />
      </main>
    </div>
  );
});
PageDashboard.displayName = 'PageDashboard';

export default PageDashboard;
```

### Modal Component Pattern

```typescript
// src/pages/ui/ModalPublishSetting/index.tsx
import { memo } from 'react';
import { Modal } from '@/shared/ui';
import { useModalPublishSettingController } from './hook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

const ModalPublishSetting = memo(({ isOpen, onClose, formId }: Props) => {
  const { handleSubmit, isSubmitting } = useModalPublishSettingController(formId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal content */}
    </Modal>
  );
});
ModalPublishSetting.displayName = 'ModalPublishSetting';

export default ModalPublishSetting;
```

### Key Points

1. **Only `ui/` segment** - No lib, api, store in pages layer
2. **Use widgets** - Pages compose widgets, not individual features
3. **Hook file** - `hook.ts` for page/modal logic
4. **React.memo required** - All page/modal components use memo

## App Layer Best Practices

The `app` layer is the application entry point. It provides routing and context providers.

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
