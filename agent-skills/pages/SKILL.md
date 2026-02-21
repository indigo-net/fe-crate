# Pages Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

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

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
