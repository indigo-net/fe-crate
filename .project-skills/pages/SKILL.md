---
name: pages-layer
description: "Use this skill when working on the Pages layer of the FSD architecture. Triggers include: 'pages layer', 'page component', 'modal component', 'route-level', 'PageDashboard', 'PageLanding', 'ModalPublishSetting', or when modifying src/pages/ directory. Also use when creating new pages or modals. Do NOT use for business logic or reusable UI components."
license: Proprietary
---

# Pages Layer Guide

## Overview

The `pages` layer contains page and modal compositions. Only UI segment is used. No slices - components are organized directly under `ui/`.

## Quick Reference

| Task | Naming |
|------|--------|
| Create page | `Page*/index.tsx` (e.g., `PageDashboard/index.tsx`) |
| Create modal | `Modal*/index.tsx` (e.g., `ModalPublishSetting/index.tsx`) |
| Add page logic | `hook.ts` in page directory |
| Export pages | `src/pages/ui/index.ts` |
| 파일 구조 확인 | `./STRUCTURE.md` 참조 |

## Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| Page | `Page` | `PageMainLanding.tsx`, `PageDashboard.tsx` |
| Modal | `Modal` | `ModalFormPublishSetting.tsx`, `ModalUserProfile.tsx` |

## Page Component Pattern

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

## Modal Component Pattern

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

## Key Points

| Rule | Description |
|------|-------------|
| Only `ui/` segment | No lib, api, store in pages layer |
| Use widgets | Pages compose widgets, not individual features |
| Hook file | `hook.ts` for page/modal logic |
| React.memo required | All page/modal components use memo |

**CRITICAL**: All page and modal components must use `React.memo` and have `displayName` set.

## Reference

For current file structure and module list, see `./STRUCTURE.md`.
