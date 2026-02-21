# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CRATE is a selection optimization solution - a React application that streamlines recruitment processes from application collection to evaluation. It provides an integrated platform for creating forms, managing evaluators, and conducting fair selection processes.

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

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS v4 with custom design tokens
- **State Management**: Zustand
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Architecture: Feature-Sliced Design (FSD)

This project follows the Feature-Sliced Design methodology. The `src/` directory is structured into layers with strict dependency rules:

### Layer Structure (higher layers depend on lower layers)

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

| Segment      | Purpose              | Example Contents                    |
| ------------ | -------------------- | ----------------------------------- |
| `ui/`        | UI components        | React components, Iconography       |
| `store/`     | State management     | Zustand stores                      |
| `types.d.ts` | Type definitions     | Type aliases, enums                 |
| `model/`     | Data models          | Model classes extending CustomModel |
| `api/`       | API calls            | API functions using AxiosManager    |
| `lib/`       | Utilities & services | Helper functions, service classes   |

### Key Architectural Patterns

1. **Layer Isolation**: Each layer can only import from layers below it
2. **Slice Segmentation**: Each feature/entity is self-contained with its own segments
3. **Public API**: Each slice exports through `index.ts` files

### Layer Structure Details

| Layer       | Has Slices | Structure Pattern                                           |
| ----------- | ---------- | ----------------------------------------------------------- |
| `app/`      | No         | Direct to segments                                          |
| `pages/`    | No         | Direct to `ui/`                                             |
| `widgets/`  | Yes        | `widgets/(widget)/ui/`                                      |
| `features/` | Yes        | `features/(feature)/ui/`, `api/`, `lib/`                    |
| `entities/` | Yes        | `entities/(domain)/ui/`, `model/`, `store/`, `api/`, `lib/` |
| `shared/`   | No         | Direct to segments                                          |

## Import Order (ESLint Rule)

Imports must be ordered as follows (enforced by eslint-plugin-import):

1. Built-in modules
2. External packages
3. Internal modules (`@/` alias)
4. Parent imports
5. Sibling imports (ordered: `./lib/**` → `./model/**` → `./store/**` → `./ui/**`)
6. Index imports

The path alias `@/` resolves to `src/`.

## Design System

### Color Tokens

The project uses a comprehensive color token system defined in `src/styles/colors.css`:

- **Brand Colors**: Indigo (primary), Orange (secondary)
- **Semantic Tokens**: `brand-primary`, `brand-secondary`, `bg-*`, `text-*`, `border-*`, `interactive-*`
- **Functional Colors**: `success`, `warning`, `error`, `info`
- **Neon Palette**: `neon-pink-*`, `neon-green-*`, `neon-violet-*` for accent effects

### Custom Tailwind Utilities

- Border radius: `rounded-slim-{sm, md, lg, xl, 2xl}`
- Border width: `border-slim`, `border-thin`
- Font weight: `font-slim-{thin, normal, semibold, bold}`
- Breakpoints: `mobile:365px`, `desktop:720px`

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

- `ModalProvider` / `useModalContext` - Modal dialogs
- `AlertProvider` / `useAlertContext` - Alert dialogs
- `ToastProvider` / `useToastContext` - Toast notifications

Wrap the app with these providers in order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Routing

Routes are defined in `src/app/ui/index.tsx`:

- `/` - Landing page
- `/new-form` - Form creation page
- `/kakao-authorize` - Kakao OAuth redirect handler
- `/dashboard` - Admin dashboard

## Environment Variables

Access via `EnvManager.getAppEnv(key)` or `import.meta.env[key]`:

- `VITE_API_BASE_URL` - API base URL
- `VITE_KAKAO_CLIENT_ID` - Kakao OAuth client ID
- `VITE_KAKAO_REDIRECT_URI` - Kakao OAuth redirect URI

## Code Style Guide

See `.claude/skills/code-style.md` for detailed code style guidelines including:

- Component declaration patterns
- Props type definitions
- File naming conventions
- Hook patterns
- Logging standards
- Early return patterns

**Quick Reference:**

- All component files/directories use **PascalCase**: `ComponentName/index.tsx`
- Pages use `Page*` prefix: `PageDashboard/index.tsx`
- Modals use `Modal*` prefix: `ModalPublishSetting/index.tsx`
- Use `hook.ts` for component-level hooks

## Layer Documentation

For detailed layer-specific best practices, see the skill files:

| Layer        | Skill File                         | Topics                                                  |
| ------------ | ---------------------------------- | ------------------------------------------------------- |
| **Entities** | `.claude/skills/entities-layer.md` | Model pattern, Store pattern, API layer, State services |
| **Shared**   | `.claude/skills/shared-layer.md`   | Utility classes, Base components, Shared modules        |
| **Features** | `.claude/skills/features-layer.md` | Feature definition, UI components, API patterns         |
| **Widgets**  | `.claude/skills/widgets-layer.md`  | Widget composition, When to create widgets              |
| **Pages**    | `.claude/skills/pages-layer.md`    | Page/Modal patterns, Component structure                |
| **App**      | `.claude/skills/app-layer.md`      | Entry point, Context providers, Routing                 |

## Key Rules Summary

### File Naming Convention

- **All component files/directories**: PascalCase (e.g., `QuestionAddSection/index.tsx`)
- **Pages**: `Page*/index.tsx` (e.g., `PageDashboard/index.tsx`)
- **Modals**: `Modal*/index.tsx` (e.g., `ModalPublishSetting/index.tsx`)

### Layer Structure (No Slices for app, pages, widgets)

```
src/
├── app/                    # No slice - direct to segment
│   ├── ui/index.tsx
│   └── lib/context-provider/
├── pages/                  # No slice - direct to segment
│   └── ui/
│       ├── index.tsx       # Export all pages
│       ├── PageDashboard/
│       └── ModalPublishSetting/
├── widgets/                # Has slices
│   └── (widget)/ui/
├── features/               # Has slices (edit-form, authenticate, etc.)
├── entities/               # Has slices (form, cache, etc.)
└── shared/                 # No slice - direct to segment
```
