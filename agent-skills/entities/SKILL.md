# Entities Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

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

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
