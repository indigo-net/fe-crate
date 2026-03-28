---
name: pages-layer
description: "Use this skill when working on the Pages layer of the FSD architecture. Triggers include: 'pages layer', 'page component', 'modal component', 'route-level', 'PageDashboard', 'PageLanding', 'ModalPublishSetting', or when modifying src/pages/ directory. Also use when creating new pages or modals. Do NOT use for business logic or reusable UI components."
---

> **원본 경로**: `.project-skills/pages/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Pages Layer Guide

## Overview

`pages` 레이어는 라우트 레벨 컴포넌트와 모달. `ui/` 세그먼트만 사용. 슬라이스 없이 직접 `ui/` 아래에 구성.

## Quick Reference

| Task | Naming |
|------|--------|
| 페이지 생성 | `Page*/index.tsx` (e.g., `PageDashboard/index.tsx`) |
| 모달 생성 | `Modal*/index.tsx` (e.g., `ModalPublishSetting/index.tsx`) |
| 페이지 로직 | `hook.ts` in page directory |
| Export | `src/pages/ui/index.ts` |
| 파일 구조 확인 | `./STRUCTURE.md` 참조 |

## Page Component Pattern

페이지는 위젯을 조합하여 구성. 데이터 페칭은 위젯 내부에서 처리.

```typescript
// src/pages/ui/PageEvaluatorDashboard/index.tsx
import { memo } from 'react';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { AssignedFormList } from '@/widgets/evaluator-dashboard/ui';

const PageEvaluatorDashboard = memo(() => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-base text-text-primary">
      <header>
        {/* 헤더 + DarkModeButton */}
      </header>
      <main>
        <AssignedFormList />
      </main>
      <footer>{/* 푸터 */}</footer>
    </div>
  );
});

PageEvaluatorDashboard.displayName = 'PageEvaluatorDashboard';
export default PageEvaluatorDashboard;
```

핵심: 페이지는 위젯에 데이터를 props로 전달하지 않는다. 위젯이 자체적으로 데이터를 가져온다.

## Page Hook Pattern

페이지에 로직이 필요한 경우 `hook.ts` 사용. 라우터 파라미터, 네비게이션, 모달 열기 등.

```typescript
// src/pages/ui/PageFormDetail/hook.ts
const usePageFormDetailController = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { openModal } = useModalContext();

  const handleOpenPublishModal = useCallback(() => {
    openModal({
      id: UUID.v4(),
      title: '발행 설정',
      content: createElement(ModalPublishSetting, { formId }),
    });
  }, [formId, openModal]);

  return { formId, handleOpenPublishModal };
};
```

## Modal Pattern

모달은 **반드시** `useModalContext().openModal()` + `createElement`로 연다.

```
✅ openModal({ id, title, content: createElement(ModalComponent, { props }) })
❌ useState(isOpen) + <Modal isOpen={isOpen} /> 직접 렌더링
```

- `openModal()` 호출은 `hook.ts`에 위치 (tsx에서 직접 호출하지 않음)
- 모달 컴포넌트는 `Modal*` 접두사 사용

```typescript
// src/pages/ui/ModalPublishSetting/index.tsx
import { memo } from 'react';

interface Props {
  formId: string;
}

const ModalPublishSetting = memo(({ formId }: Props) => {
  // 모달 내부 UI 구현
  // isOpen/onClose는 ModalProvider가 처리하므로 props에 없음
  return (
    <div>
      {/* 발행 설정 폼 */}
    </div>
  );
});

ModalPublishSetting.displayName = 'ModalPublishSetting';
export default ModalPublishSetting;
```

## Key Rules

| Rule | Description |
|------|-------------|
| `ui/` 세그먼트만 | pages에 lib, api, store 없음 |
| 위젯 조합 | 페이지는 위젯을 조합, 개별 features 직접 사용은 최소화 |
| hook.ts | 페이지/모달 로직 담당 |
| memo() 필수 | 모든 페이지/모달 컴포넌트에 `React.memo` 적용 |
| displayName 필수 | `ComponentName.displayName = 'ComponentName'` |

## Reference

파일 구조: `./STRUCTURE.md` 참조.
