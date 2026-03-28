---
name: features-layer
description: "Use this skill when working on the Features layer of the FSD architecture. Triggers include: 'features layer', 'feature component', 'user action', 'edit-form', 'authenticate', 'toggle-theme', 'QuestionAddSection', 'FormSignatureEditSection', or when modifying src/features/ directory. Also use when implementing interactive UI with event handling. Do NOT use for static/presentational UI or business models."
---

> **원본 경로**: `.project-skills/features/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Features Layer Guide

## Overview

`features` 레이어는 사용자 액션/인터랙션을 구현하는 컴포넌트. entities의 모델/서비스를 사용하되, 새로운 도메인 모델을 정의하지 않는다.

## Quick Reference

| Task | Location |
|------|----------|
| 인터랙티브 UI 생성 | `features/(feature)/ui/` |
| API 호출 추가 | `features/(feature)/api/` |
| 로직 추가 | `features/(feature)/lib/` |
| 네이밍 | verb-noun 패턴 (e.g., `edit-form`, `toggle-theme`) |
| 파일 구조 확인 | `/.project-skills/features/STRUCTURE.md` 참조 |

## Feature Naming

**verb-noun** 패턴 사용:

```
✅ edit-form, toggle-theme, submit-application, evaluate-form, start-evaluation
❌ form-editor, theme-switcher, application-submitter
```

## Export Pattern

Features는 **세그먼트 레벨 export** 사용 (슬라이스 레벨 아님):

```
✅ features/publish-form/ui/index.ts — UI 컴포넌트 export
❌ features/publish-form/index.ts — 불필요한 슬라이스 레벨 export
```

## UI Components

### features vs entities vs shared

| 컴포넌트 타입 | 위치 | 예시 |
|--------------|------|------|
| 이벤트 핸들링이 있는 인터랙티브 UI | `features/*/ui/` | `QuestionAddSection`, `EvaluationCard` |
| 정적/표현용 UI | `entities/*/ui/` | `QuestionCard`, `FormSignatureDisplay` |
| 범용 재사용 UI | `shared/ui/` | `Modal`, `Button`, `Input` |

### Component Naming

| 접미사 | 용도 | 예시 |
|--------|------|------|
| `*Section` | 주요 UI 섹션 | `FormSignatureEditSection` |
| `*Button` | 액션 버튼 | `SubmitButton`, `DarkModeButton` |
| `*Card` | 카드형 UI | `EvaluationCard`, `AssignedFormCard` |
| `*Navigation` | 네비게이션 UI | `EvaluationNavigation` |

## Hook Pattern

`hook.ts`에서 entities 스토어/서비스를 호출하고, 핸들러를 반환.

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

### hook.ts 규칙

- **순수 로직만**: 데이터 페칭, 상태 관리, 필터링, 핸들러
- **텍스트/스타일은 tsx에서**: 포맷팅, 라벨, 색상은 `.tsx` 뷰 컴포넌트 담당
- **모달 열기**: `openModal()` 호출은 hook.ts에서
- **memo() + displayName**: 모든 컴포넌트 필수

## Relationship with Entities

features는 entities를 **사용**하되 새로운 모델을 정의하지 않는다:

```typescript
// ✅ entities 모델/스토어/서비스 사용
import { FormQuestionModel } from '@/entities/form/model';
import { useFormQuestionListStore } from '@/entities/form/store';

// ❌ features에서 새 도메인 모델 정의 금지
class FeatureSpecificModel { ... }
```

## Reference

파일 구조: `/.project-skills/features/STRUCTURE.md` 참조.
