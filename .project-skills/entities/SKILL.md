---
name: entities-layer
description: "Use this skill when working on the Entities layer of the FSD architecture. Triggers include: 'entities layer', 'domain model', 'FormQuestionModel', 'FormSignatureModel', 'Zustand store', 'useFormQuestionListStore', 'StateService', 'ApiService', or when modifying src/entities/ directory. Also use when creating business domain models or state management. Do NOT use for UI components or user interactions."
---

> **원본 경로**: `.project-skills/entities/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Entities Layer Guide

## Overview

`entities` 레이어는 비즈니스 도메인 모델, 상태 관리, API 통신을 담당한다.

## Quick Reference

| Task | Naming Pattern |
|------|----------------|
| 모델 생성 | `*Model` (e.g., `FormQuestionModel`) |
| 스토어 생성 | `use*Store` (e.g., `useFormQuestionListStore`) |
| 상태 서비스 | `*StateService` (e.g., `QuestionStateService`) |
| API 서비스 | `*ApiService` (e.g., `FormApiService`) |
| API 함수 | 개별 함수 export (e.g., `getForms`, `postEvaluation`) |
| 파일 구조 확인 | `/.project-skills/entities/STRUCTURE.md` 참조 |

## Type Definitions

### types.d.ts — union 타입만

`types.d.ts`에는 union 타입/enum만 선언한다. interface는 사용처 파일 내부에 선언.

```typescript
// src/entities/form/types.d.ts
type FormQuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
type FormStatusType = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'CLOSED';

export type { FormQuestionType, FormStatusType };
```

### Model State/Props — 모델 파일 내부에 선언

`FormQuestionModel` 패턴을 따른다. `State`와 `Props` 인터페이스는 모델 파일 상단에 선언.

```typescript
// src/entities/form/model/form-question/index.ts
import type { FormQuestionType } from '../../types';

interface State {
  id: string;
  type: FormQuestionType;
  title: string;
  description: string | null;
  required: boolean;
  options: FormQuestionOptionModel[] | null;
}

interface Props {
  id?: string;
  type: FormQuestionType;
  title: string;
  description?: string | null;
  required?: boolean;
  options?: FormQuestionOptionModel[] | null;
}

class FormQuestionModel extends CustomModel<State> {
  private state: State;
  constructor(props: Props) {
    super();
    this.state = { /* initialize from props with defaults */ };
  }
  getValue<K extends keyof State>(key: K): State[K] { return this.state[key]; }
  setValue<K extends keyof State>(key: K, value: State[K]): FormQuestionModel {
    return this.clone({ [key]: value });
  }
  toJSON(): State { return this.state; }
  clone(props?: Partial<Exclude<State, 'id'>>): FormQuestionModel {
    return new FormQuestionModel({ ...this.state, ...props });
  }
}
```

## State Service Pattern

정적 메서드로 모델 상태 변환. 부수효과 없는 순수 함수.

```typescript
// src/entities/form/lib/question-state-service.ts
class QuestionStateService {
  static getInitialQuestion(type: FormQuestionType): FormQuestionModel {
    return new FormQuestionModel({ title: '', type });
  }
  static editQuestionTitle(prev: FormQuestionModel, title: string): FormQuestionModel {
    return prev.setValue('title', title);
  }
}
```

## Store Pattern

Zustand 스토어는 **상태 데이터 + setter만** 포함. clear/reset 등 별도 액션 불필요.

```typescript
// src/entities/evaluation/store/use-evaluation-list-store.ts
interface State {
  evaluations: Evaluation[];
  setEvaluations: (next: Evaluation[] | ((prev: Evaluation[]) => Evaluation[])) => void;
}

const useEvaluationListStore = create<State>(set => ({
  evaluations: [],
  setEvaluations: next => {
    set(state => ({
      evaluations: typeof next === 'function' ? next(state.evaluations) : next,
    }));
  },
}));
```

Nullable 상태에서 setter 콜백 시 `TypeGuard.checkNull(prev)`로 null 체크:

```typescript
setFormSignature(prev => {
  if (TypeGuard.checkNull(prev)) {
    return SomeStateService.getInitialState();
  }
  return SomeStateService.updateState(prev, newValue);
});
```

## API Layer Pattern

### API 함수 — 개별 함수 export

`api/` 디렉토리에 파일별로 하나의 API 함수를 선언한다. 인터페이스도 같은 파일에.

```typescript
// src/entities/form/api/get-forms.ts
import AxiosManager from '@/shared/lib/axios-manager';
import CustomSearchParams from '@/shared/lib/custom-search-params';

interface GetFormsParams {
  userId?: string;
  filter?: 'creator' | 'evaluator';
  status?: FormStatusType;
}

interface GetFormsResponse {
  id: string;
  title: string;
  status: FormStatusType;
  // ...
}

async function getForms(params?: GetFormsParams): Promise<GetFormsResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const url = CustomSearchParams.buildURL('/api/v1/forms', params ?? {});
  const response = await axios.get<GetFormsResponse[]>(url);
  return response.data;
}

export { getForms };
export type { GetFormsParams, GetFormsResponse };
```

### API 타입 네이밍 규칙

| 타입 | 네이밍 패턴 | 예시 |
|------|-------------|------|
| Response | `Get*Response` | `GetFormsResponse` |
| Query Params | `Get*Params` | `GetFormsParams` |
| Request Body | `*RequestData` | `PostFormRequestData` |

서버 응답 타입과 프론트 도메인 모델은 반드시 분리. 변환은 ApiService에서 수행.

### API Service — 도메인 모델 변환 + 캐싱

```typescript
// src/entities/evaluation/lib/evaluation-api-service.ts
class EvaluationApiService {
  private static CACHE_TTL_MS = 5 * 60 * 1000;

  static async fetchAssignedForms(): Promise<AssignedFormsResult> {
    const cached = CachedService.get<AssignedFormsResult>('key');
    if (cached) { return cached; }

    const response = await getEvaluatorAssignedForms();
    const forms = response.map(item => new FormSignatureModel({ id: item.formId, title: item.title }));
    // ...
    CachedService.set('key', result, this.CACHE_TTL_MS);
    return result;
  }
}
```

핵심: API 함수가 반환하는 서버 타입 → ApiService에서 도메인 모델로 변환.

## Segment Index Files

```typescript
// src/entities/form/model/index.ts
export { default as FormQuestionModel } from './form-question';
export { default as FormSignatureModel } from './form-signature';

// src/entities/form/lib/index.ts
export { default as QuestionStateService } from './question-state-service';
export { default as FormApiService } from './form-api-service';
```

항상 named export 사용. default export를 index에서 재수출.

## Reference

파일 구조: `/.project-skills/entities/STRUCTURE.md` 참조.
