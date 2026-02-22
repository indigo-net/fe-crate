# Widgets Layer Structure

This file documents the structure of the `src/widgets/` directory.

## Current Status

No widgets have been created yet. As the application grows, large UI blocks will be extracted from pages into this layer.

## When to Create Widgets

| Situation | Action |
|-----------|--------|
| Page component exceeds ~150 lines | Extract large sections as widgets |
| Multiple features combined in one UI block | Create a widget |
| Reusable across pages | Consider creating a widget |

## Planned Widgets

- `dashboard-header/` - Dashboard page header with navigation
- `form-builder/` - Complete form editing interface
- `evaluation-panel/` - Application evaluation interface

## Directory Structure (Template)

```
src/widgets/(widget)/
├── ui/
│   ├── WidgetName/
│   │   ├── index.tsx
│   │   └── hook.ts
│   └── index.ts
└── types.d.ts
```
