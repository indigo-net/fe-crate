# Widgets Layer Guide

## When to Read
- 이 계층에 작업이나 탐색이 필요할 때 에이전트 판단에 따라 읽음
- 새 모듈 추가, 기존 모듈 수정, 구조 파악 시

## Base Practice

### Purpose

- Extract large UI blocks from pages for better readability
- Compose multiple features/entities into cohesive units
- Reusable across different pages (optional)

### Directory Structure

```
src/widgets/(widget)/
├── ui/
│   ├── WidgetName/
│   │   ├── index.tsx         # Widget component (memo required)
│   │   └── hook.ts           # Widget logic (if needed)
│   └── index.ts
└── types.d.ts                # Widget-specific types (if needed)
```

### Widget Definition

A **widget** is a large UI unit that:
- Combines multiple features/entities components
- Represents a significant portion of a page or modal
- Is self-contained with its own logic

Examples:
- `DashboardHeader` - Page header with navigation and user info
- `FormBuilder` - Complete form editing interface
- `EvaluationPanel` - Application evaluation interface

### Requirements

**React.memo is mandatory** for all widget components:

```typescript
// src/widgets/dashboard-header/ui/DashboardHeader/index.tsx
import { memo } from 'react';

interface Props {
  userName: string;
  onLogout: () => void;
}

const DashboardHeader = memo(({ userName, onLogout }: Props) => {
  return (
    <header>
      {/* Header implementation */}
    </header>
  );
});
DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
```

### When to Create a Widget

| Situation | Action |
|-----------|--------|
| Page component exceeds ~150 lines | Extract large sections as widgets |
| Multiple features combined in one UI block | Create a widget |
| Reusable across pages | Consider creating a widget |
| Simple component | Keep in features or entities |

### Example: Page with Widgets

```
src/pages/dashboard/
├── ui/
│   └── index.tsx           # Clean composition of widgets
└── hook.ts

src/widgets/
├── dashboard-header/
│   └── ui/DashboardHeader/
├── dashboard-stats/
│   └── ui/DashboardStats/
├── evaluator-list/
│   └── ui/EvaluatorList/
└── activity-feed/
    └── ui/ActivityFeed/
```

```typescript
// src/pages/dashboard/ui/index.tsx
import { DashboardHeader, DashboardStats, EvaluatorList, ActivityFeed } from '@/widgets';

const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <main>
        <DashboardStats />
        <EvaluatorList />
        <ActivityFeed />
      </main>
    </div>
  );
};
```

## Reference
- 탐색이나 관리 방법 참고: `./STRUCTURE.md`
- 현재 계층의 파일 구조와 모듈 목록 확인
