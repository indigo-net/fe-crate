---
name: crate-project-guide
description: "Use this skill as the primary reference when working on the CRATE project. Triggers include: any code modification, refactoring, new feature implementation, bug fixing, or architectural questions. Also use when asked about project structure, conventions, FSD layers, design system, or state management patterns. Do NOT use for unrelated projects or general programming questions not specific to this codebase."
license: Proprietary
---

# CRATE Project Guide

This document serves as the primary guideline for all AI agents (e.g., Claude, Cursor, GitHub Copilot) operating within this repository.

## Overview

CRATE is a selection optimization solution - a React application that streamlines recruitment processes from application collection to evaluation. It provides an integrated platform for creating forms, managing evaluators, and conducting fair selection processes.

## Quick Reference

| Task | Approach |
|------|----------|
| Install dependencies | `pnpm install` |
| Start dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Run linter | `pnpm lint` |
| Format code | `pnpm format` |

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check and build for production
pnpm build

# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format

# Preview production build
pnpm preview
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 with TypeScript |
| Build Tool | Vite 7 |
| Styling | TailwindCSS v4 with custom design tokens |
| State Management | Zustand |
| Routing | React Router 7 |
| HTTP Client | Axios |
| Package Manager | pnpm |

## Architecture: Feature-Sliced Design (FSD)

This project follows the Feature-Sliced Design methodology. The `src/` directory is structured into layers with strict dependency rules.

### Layer Structure

Higher layers depend on lower layers:

```
src/
├── app/           # Application initialization, providers, routing
├── pages/         # Page compositions - route-level components
├── widgets/       # Complex UI compositions
├── features/      # User-facing feature implementations
├── entities/      # Business domain models and logic
├── shared/        # Reusable utilities and base UI components
└── styles/        # Global CSS and design tokens
```

### Unified Segments

Each layer/slice can use these segments as needed. **Only create segments that are actually used**:

| Segment | Purpose | Example Contents |
|---------|---------|------------------|
| `ui/` | UI components | React components, Iconography |
| `store/` | State management | Zustand stores |
| `types.d.ts` | Type definitions | Type aliases, enums |
| `model/` | Data models | Model classes extending CustomModel |
| `api/` | API calls | API functions using AxiosManager |
| `lib/` | Utilities & services | Helper functions, service classes |

### Key Architectural Patterns

1. **Layer Isolation**: Each layer can only import from layers below it
2. **Slice Segmentation**: Each feature/entity is self-contained with its own segments
3. **Public API**: Each slice exports through `index.ts` files

### Layer Structure Details

| Layer | Has Slices | Structure Pattern |
|-------|-----------|-------------------|
| `app/` | No | Direct to segments |
| `pages/` | No | Direct to `ui/` |
| `widgets/` | Yes | `widgets/(widget)/ui/` |
| `features/` | Yes | `features/(feature)/ui/`, `api/`, `lib/` |
| `entities/` | Yes | `entities/(domain)/ui/`, `model/`, `store/`, `api/`, `lib/` |
| `shared/` | No | Direct to segments |

## Import Order (ESLint Rule)

Imports must be ordered as follows (enforced by eslint-plugin-import):

1. Built-in modules
2. External packages
3. Internal modules (`@/` alias)
4. Parent imports
5. Sibling imports (ordered: `./lib/**` → `./model/**` → `./store/**` → `./ui/**`)
6. Index imports

**Note**: The path alias `@/` resolves to `src/`.

## Design System

### Color Tokens

The project uses a comprehensive color token system defined in `src/styles/colors.css`:

| Category | Tokens |
|----------|--------|
| Brand Colors | Indigo (primary), Orange (secondary) |
| Semantic Tokens | `brand-primary`, `brand-secondary`, `bg-*`, `text-*`, `border-*`, `interactive-*` |
| Functional Colors | `success`, `warning`, `error`, `info` |
| Neon Palette | `neon-pink-*`, `neon-green-*`, `neon-violet-*` for accent effects |

### Custom Tailwind Utilities

| Utility | Values |
|---------|--------|
| Border radius | `rounded-slim-{sm, md, lg, xl, 2xl}` |
| Border width | `border-slim`, `border-thin` |
| Font weight | `font-slim-{thin, normal, semibold, bold}` |
| Breakpoints | `mobile:365px`, `desktop:720px` |

### Dark Mode

Toggle dark mode by adding/removing the `dark` class on the document root. Color tokens automatically adjust via CSS variables.

## State Management Pattern

### Zustand Stores

Located in `entities/*/store/` - use Zustand for state management:

```typescript
interface State {
  data: SomeModel[];
  setData: (next: SomeModel[] | ((prev: SomeModel[]) => SomeModel[])) => void;
}
```

### Custom Models

Domain models extend `CustomModel<T>` from `shared/model/`:

```typescript
abstract class CustomModel<T> {
  abstract toJSON(): T;
  abstract clone(props?: Partial<T>): CustomModel<T>;
}
```

## Context System

Global UI contexts are provided in `app/lib/context-provider/`:

| Provider | Hook | Purpose |
|----------|------|---------|
| `ModalProvider` | `useModalContext` | Modal dialogs |
| `AlertProvider` | `useAlertContext` | Alert dialogs |
| `ToastProvider` | `useToastContext` | Toast notifications |

**CRITICAL**: Wrap the app with providers in this order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Routing

Routes are defined in `src/app/ui/index.tsx`:

| Path | Page |
|------|------|
| `/` | Landing page |
| `/new-form` | Form creation page |
| `/kakao-authorize` | Kakao OAuth redirect handler |
| `/dashboard` | Admin dashboard |

## Environment Variables

Access via `EnvManager.getAppEnv(key)` or `import.meta.env[key]`:

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | API base URL |
| `VITE_KAKAO_CLIENT_ID` | Kakao OAuth client ID |
| `VITE_KAKAO_REDIRECT_URI` | Kakao OAuth redirect URI |

## Code Style Guide

### Quick Reference

| Element | Convention |
|---------|-----------|
| Component files/directories | PascalCase (e.g., `QuestionAddSection/index.tsx`) |
| Pages | `Page*` prefix (e.g., `PageDashboard/index.tsx`) |
| Modals | `Modal*` prefix (e.g., `ModalPublishSetting/index.tsx`) |
| Component hooks | `hook.ts` |

## Layer Documentation

For detailed layer-specific best practices, see the skill files:

| Layer | Skill File | Topics |
|-------|-----------|--------|
| **Entities** | `agent-skills/entities/SKILL.md` | Model pattern, Store pattern, API layer, State services |
| **Shared** | `agent-skills/shared/SKILL.md` | Utility classes, Base components, Shared modules |
| **Features** | `agent-skills/features/SKILL.md` | Feature definition, UI components, API patterns |
| **Widgets** | `agent-skills/widgets/SKILL.md` | Widget composition, When to create widgets |
| **Pages** | `agent-skills/pages/SKILL.md` | Page/Modal patterns, Component structure |
| **App** | `agent-skills/app/SKILL.md` | Entry point, Context providers, Routing |

## Agent-Skills Directory

Shared skill documentation for multiple AI systems (Claude, Cursor, Copilot):

| Directory | Purpose |
|-----------|---------|
| `agent-skills/common/` | Project guide (this file) |
| `agent-skills/*/SKILL.md` | Layer-specific guides |
| `agent-skills/*/STRUCTURE.md` | Auto-generated file structure |

**Symlinks:** `CLAUDE.md` → `agent-skills/common/SKILL.md`, `.claude/skills/*.md` → `agent-skills/*/SKILL.md`

### Updating STRUCTURE.md

Regenerate layer structure documentation with Repomix:

```bash
npx repomix --style plain --no-files --output agent-skills/<layer>/STRUCTURE.md src/<layer>
```

### SKILL.md Format

All skill files use YAML frontmatter: `name`, `description` (with trigger keywords), `license: Proprietary`
