# Features Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

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

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
