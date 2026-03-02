---
name: features-layer
description: "Use this skill when working on the Features layer of the FSD architecture. Triggers include: 'features layer', 'feature component', 'user action', 'edit-form', 'authenticate', 'toggle-theme', 'QuestionAddSection', 'FormSignatureEditSection', or when modifying src/features/ directory. Also use when implementing interactive UI with event handling. Do NOT use for static/presentational UI or business models."
---

# Features Layer Guide

## Overview

The `features` layer contains user-facing features that represent user actions. Each feature handles user interactions and may communicate with APIs.

## Quick Reference

| Task                  | Location                                              |
| --------------------- | ----------------------------------------------------- |
| Create interactive UI | `features/(feature)/ui/`                              |
| Add API calls         | `features/(feature)/api/`                             |
| Add feature logic     | `features/(feature)/lib/`                             |
| Name feature          | verb-noun pattern (e.g., `edit-form`, `toggle-theme`) |
| 파일 구조 확인        | `/.project-skills/features/STRUCTURE.md` 참조         |

## Feature Definition

A **feature** represents a user action or interaction:

| Feature              | Purpose                    |
| -------------------- | -------------------------- |
| `edit-form`          | Form editing functionality |
| `authenticate`       | User authentication        |
| `toggle-theme`       | Theme switching            |
| `submit-application` | Application submission     |

## Naming Convention

Use **verb-noun** pattern for feature names:

```
✅ edit-form, toggle-theme, submit-application, authenticate
❌ form-editor, theme-switcher, application-submitter
```

## Segments

| Segment      | Purpose                     | When to Use                  |
| ------------ | --------------------------- | ---------------------------- |
| `ui/`        | Interactive components      | Always (required)            |
| `api/`       | API call declarations       | When API calls are needed    |
| `lib/`       | Feature logic, API services | When complex logic is needed |
| `types.d.ts` | Feature-specific types      | When custom types are needed |

## UI Components

### When to use features/ui vs entities/ui

| Component Type                     | Location         | Example                                          |
| ---------------------------------- | ---------------- | ------------------------------------------------ |
| Interactive UI with event handling | `features/*/ui/` | `QuestionAddSection`, `FormSignatureEditSection` |
| Static/presentational UI           | `entities/*/ui/` | `QuestionCard`, `FormSignatureDisplay`           |
| Base reusable UI                   | `shared/ui/`     | `Modal`, `Button`, `Input`                       |

### Component Naming

Use role-based naming:

| Suffix     | Purpose           | Example                          |
| ---------- | ----------------- | -------------------------------- |
| `*Section` | Major UI sections | `FormSignatureEditSection`       |
| `*Button`  | Action buttons    | `SubmitButton`, `DarkModeButton` |
| `*List`    | List components   | `QuestionList`                   |

## API Layer Pattern

### API Functions

`api/(feature)-api.ts`: Declare raw API calls

```typescript
// src/features/submit-form/api/submit-form-api.ts
import { AxiosManager } from '@/shared/lib';

const submitFormApi = {
  submitForm: (data: SubmitFormRequest) =>
    AxiosManager.getAxiosInstance().post('/forms/submit', data),
  saveDraft: (data: SaveDraftRequest) => AxiosManager.getAxiosInstance().post('/forms/draft', data),
};

export { submitFormApi };
```

### API Service

`lib/(feature)-api-service.ts`: Execute API and handle responses

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

## Hook Pattern

Use `hook.ts` for component logic:

```typescript
// src/features/edit-form/ui/QuestionAddSection/hook.ts
import { useCallback } from 'react';
import { QuestionStateService, QuestionListStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';
import type { FormQuestionType } from '@/entities/form';

const useQuestionAddSectionController = () => {
  const { setFormQuestions } = useFormQuestionListStore();

  const handleAddQuestion = useCallback(
    (questionType: FormQuestionType) => {
      const formQuestion = QuestionStateService.getInitialQuestion(questionType);
      setFormQuestions(prev => QuestionListStateService.pushQuestion(prev, formQuestion));
    },
    [setFormQuestions],
  );

  return { handleAddQuestion };
};

export default useQuestionAddSectionController;
```

## Relationship with Entities

Features **use** entities but don't define new models:

```typescript
// ✅ Correct: Using entities models and stores
import { FormQuestionModel } from '@/entities/form/model';
import { useFormQuestionListStore } from '@/entities/form/store';
import { QuestionStateService } from '@/entities/form/lib';

// ❌ Avoid: Defining new models in features
class FeatureSpecificModel { ... }
```

**CRITICAL**: Never define domain models in the features layer. Use models from entities instead.

## Reference

For current file structure and module list, see `/.project-skills/features/STRUCTURE.md`.
