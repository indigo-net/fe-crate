---
name: widgets-layer
description: "Use this skill when working on the Widgets layer of the FSD architecture. Triggers include: 'widgets layer', 'widget component', 'large UI block', 'DashboardHeader', 'FormBuilder', 'EvaluationPanel', or when extracting large UI sections from pages. Also use when page component exceeds 150 lines. Do NOT use for simple components or business logic."
license: Proprietary
---

# Widgets Layer Guide

## Overview

The `widgets` layer contains large, self-contained UI units that compose pages or modals. Purpose is to improve pages/ui readability by extracting complex UI blocks.

## Quick Reference

| Task | When to Use |
|------|-------------|
| Create widget | Page exceeds ~150 lines |
| Extract to widget | Multiple features combined in one UI block |
| Keep in features | Simple component with single responsibility |
| 파일 구조 확인 | `./STRUCTURE.md` 참조 |

## Purpose

- Extract large UI blocks from pages for better readability
- Compose multiple features/entities into cohesive units
- Reusable across different pages (optional)

## Widget Definition

A **widget** is a large UI unit that:
- Combines multiple features/entities components
- Represents a significant portion of a page or modal
- Is self-contained with its own logic

### Examples

| Widget | Purpose |
|--------|---------|
| `DashboardHeader` | Page header with navigation and user info |
| `FormBuilder` | Complete form editing interface |
| `EvaluationPanel` | Application evaluation interface |

## Requirements

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

## When to Create a Widget

| Situation | Action |
|-----------|--------|
| Page component exceeds ~150 lines | Extract large sections as widgets |
| Multiple features combined in one UI block | Create a widget |
| Reusable across pages | Consider creating a widget |
| Simple component | Keep in features or entities |

## Example: Page with Widgets

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

**CRITICAL**: All widget components must use `React.memo` and have `displayName` set.

## Reference

For current file structure and module list, see `./STRUCTURE.md`.
