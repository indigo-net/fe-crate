---
name: widgets-layer
description: "Use this skill when working on the Widgets layer of the FSD architecture. Triggers include: 'widgets layer', 'widget component', 'large UI block', 'DashboardHeader', 'FormBuilder', 'EvaluationPanel', or when extracting large UI sections from pages. Also use when page component exceeds 150 lines. Do NOT use for simple components or business logic."
---

> **원본 경로**: `.project-skills/widgets/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Widgets Layer Guide

## Overview

`widgets` 레이어는 페이지를 구성하는 큰 UI 블록. 여러 features/entities를 조합하여 자체적으로 데이터를 가져오고 렌더링하는 독립적 단위.

## Quick Reference

| Task | When to Use |
|------|-------------|
| 위젯 생성 | 페이지 컴포넌트 ~150줄 초과 시 |
| 위젯으로 추출 | 여러 features가 결합된 UI 블록 |
| features에 유지 | 단일 책임의 간단한 컴포넌트 |
| 파일 구조 확인 | `./STRUCTURE.md` 참조 |

## Widget Data Fetching Pattern

위젯은 **자체적으로 데이터를 가져온다** — 페이지에서 props로 전달받지 않는다.

```
✅ Widget hook.ts → XxxApiService.fetchXxx() 내부 호출
❌ Page에서 data를 fetch해서 props로 전달
```

여러 위젯이 같은 데이터를 요청할 경우 `CachedService`로 중복 제거.

### 실제 예시: AssignedFormList

```typescript
// src/widgets/evaluator-dashboard/ui/AssignedFormList/hook.ts
import { useCallback, useEffect, useState } from 'react';
import { EvaluationApiService } from '@/entities/evaluation/lib';
import { FormSignatureModel } from '@/entities/form';
import { DeveloperConsole } from '@/shared/lib';

const useAssignedFormListController = () => {
  const [forms, setForms] = useState<FormSignatureModel[]>([]);
  const [progressMap, setProgressMap] = useState<Map<string, { total: number; completed: number }>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await EvaluationApiService.fetchAssignedForms();
      setForms(result.forms);
      setProgressMap(result.progressMap);
    } catch (error) {
      DeveloperConsole.log({
        message: 'Failed to fetch assigned forms',
        data: error,
        location: 'AssignedFormList/hook.ts',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { forms, progressMap, isLoading };
};

export default useAssignedFormListController;
```

### 패턴 요약

- `hook.ts`에서 Entity ApiService를 직접 호출
- `useState`로 로딩/에러/데이터 상태 관리
- `useCallback` + `useEffect`로 초기화
- `DeveloperConsole.log()`로 에러 로깅 (location 포함)

## Widget Component Pattern

`memo()` 필수. `displayName` 필수.

```typescript
// src/widgets/evaluator-dashboard/ui/AssignedFormList/index.tsx
import { memo } from 'react';
import { AssignedFormCard } from '@/features/start-evaluation/ui';
import useAssignedFormListController from './hook';

const AssignedFormList = memo(() => {
  const { forms, progressMap, isLoading } = useAssignedFormListController();

  if (isLoading) {
    return <div>/* loading spinner */</div>;
  }

  if (forms.length === 0) {
    return <div>/* empty state */</div>;
  }

  return (
    <div>
      {forms.map(form => (
        <AssignedFormCard key={form.getValue('id')} form={form} progress={progressMap.get(form.getValue('id'))} />
      ))}
    </div>
  );
});

AssignedFormList.displayName = 'AssignedFormList';
export default AssignedFormList;
```

## When to Create a Widget

| 상황 | 액션 |
|------|------|
| 페이지 컴포넌트 ~150줄 초과 | 큰 섹션을 위젯으로 추출 |
| 여러 features가 결합된 UI 블록 | 위젯으로 생성 |
| 페이지 간 재사용 가능한 블록 | 위젯으로 생성 |
| 단일 기능의 간단한 컴포넌트 | features/entities에 유지 |

## hook.ts 규칙

- `hook.ts`는 **순수 로직만** 포함 (데이터 페칭, 상태, 필터링)
- 텍스트 포맷팅, 라벨, 색상 등은 `.tsx` 뷰 컴포넌트에서 처리
- 모달 열기: `useModalContext().openModal()` + `createElement` — hook.ts에서 호출
- Context provider 사용 가능 (`useAlertContext`, `useModalContext` 등)

## Reference

파일 구조: `./STRUCTURE.md` 참조.
