---
name: entities-layer
description: "Use this skill when working on the Entities layer of the FSD architecture. Triggers include: 'entities layer', 'domain model', 'FormQuestionModel', 'FormSignatureModel', 'Zustand store', 'useFormQuestionListStore', 'StateService', 'ApiService', or when modifying src/entities/ directory. Also use when creating business domain models or state management. Do NOT use for UI components or user interactions."
license: Proprietary
---

# Entities Layer Guide

## Overview

The `entities` layer defines domain models, types, and related utilities for specific business concerns. This is where business logic and state management live.

## Quick Reference

| Task                 | Naming Pattern                                 |
| -------------------- | ---------------------------------------------- |
| Create model         | `*Model` (e.g., `FormQuestionModel`)           |
| Create store         | `use*Store` (e.g., `useFormQuestionListStore`) |
| Create state service | `*StateService` (e.g., `QuestionStateService`) |
| Create API service   | `*ApiService` (e.g., `FormApiService`)         |
| Create API functions | `*Api` (e.g., `formApi`)                       |
| 파일 구조 확인       | `/.project-skills/entities/STRUCTURE.md` 참조  |

## Naming Conventions

| Type            | Pattern         | Example                                             |
| --------------- | --------------- | --------------------------------------------------- |
| Model           | `*Model`        | `FormQuestionModel`, `FormSignatureModel`           |
| Store           | `use*Store`     | `useFormQuestionListStore`, `useFormSignatureStore` |
| Service (State) | `*StateService` | `QuestionStateService`, `QuestionListStateService`  |
| Service (API)   | `*ApiService`   | `QuestionApiService`, `FormApiService`              |
| Service (Cache) | `*CacheService` | `CacheService`                                      |
| Service (Sort)  | `*SortService`  | `QuestionSortService`                               |
| API Function    | `*Api`          | `questionApi`, `formApi`                            |

**Note**: Service naming follows its purpose - not all services need `State` suffix.

## Type Definitions

### Domain Types

Place enums and type aliases in `entities/(domain)/types.d.ts`:

```typescript
// src/entities/form/types.d.ts
type FormQuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

export type { FormQuestionType };
```

### Model I/O Types

Define Props and State inside the Model file:

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

## Model Pattern

Extend `CustomModel<T>` and use `getValue`/`setValue` pattern:

```typescript
class FormQuestionModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    this.state = {
      /* initialize from props */
    };
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

## State Service Pattern

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

## Store Pattern

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

## API Layer Pattern

### API Functions

`api/(feature)-api.ts`: Define raw API calls using `AxiosManager`

```typescript
// src/entities/form/api/form-api.ts
import { AxiosManager } from '@/shared/lib';

const formApi = {
  getFormList: () => AxiosManager.getAxiosInstance().get('/forms'),
  getFormDetail: (id: string) => AxiosManager.getAxiosInstance().get(`/forms/${id}`),
  createForm: (data: CreateFormRequest) => AxiosManager.getAxiosInstance().post('/forms', data),
};
```

### API Service

`lib/(model)-api-service.ts`: Execute API calls and convert responses to models

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

## Segment Index Files

Each segment should have an `index.ts` that exports publicly accessible modules.

**CRITICAL**: Always use named exports with the following pattern:

```typescript
export { default as (ModuleName) } from './module-directory';
```

### Examples

```typescript
// src/entities/form/model/index.ts
export { default as FormQuestionModel } from './form-question';
export { default as FormQuestionOptionModel } from './form-question/option';
export { default as FormSignatureModel } from './form-signature';

// src/entities/form/lib/index.ts
export { default as QuestionStateService } from './question-state-service';
export { default as QuestionListStateService } from './question-list-state-service';
export { default as FormApiService } from './form-api-service';
```

**WARNING**: Never use default exports in index files. Always use named exports for consistency.

## Reference

For current file structure and module list, see `/.project-skills/entities/STRUCTURE.md`.
