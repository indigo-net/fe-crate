# AI_AGENT.md

> **Universal Instruction for AI Coding Assistants**
> This repository contains specific guidelines and standards. All AI agents (e.g., Cursor, Claude Code, Windsurf, Trae, etc.) must prioritize this document as the **Single Source of Truth** before modifying or generating any code.

> **원본 경로**: `.project-skills/common/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

## Git Commit 규칙

커밋 전에 반드시 `@project-agents/fsd-reviewer`를 실행하여 FSD 레이어 규칙 검증을 수행한다.
검증 통과 후 커밋을 진행한다.

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
4. **Centralized Types**: Use types from `@/entities/(domain)` instead of defining local type aliases

### Layer Structure Details

| Layer       | Has Slices | Structure Pattern                                           |
| ----------- | ---------- | ----------------------------------------------------------- |
| `app/`      | No         | Direct to segments                                          |
| `pages/`    | No         | Direct to `ui/`                                             |
| `widgets/`  | Yes        | `widgets/(widget)/ui/`                                      |
| `features/` | Yes        | `features/(feature)/ui/`, `api/`, `lib/`                    |
| `entities/` | Yes        | `entities/(domain)/ui/`, `model/`, `store/`, `api/`, `lib/` |
| `shared/`   | No         | Direct to segments                                          |

**Features Export Pattern:**

Features use **segment-level exports** (not slice-level):
- ✅ `features/publish-form/ui/index.ts` - exports UI components
- ❌ `features/publish-form/index.ts` - unnecessary slice-level export

## Import Order (ESLint Rule)

Imports must be ordered as follows (enforced by eslint-plugin-import):

1. Built-in modules
2. External packages
3. Internal modules (`@/` alias)
4. Parent imports
5. Sibling imports (ordered: `./lib/**` → `./model/**` → `./store/**` → `./ui/**`)
6. Index imports
7. Type imports (after a blank line from value imports)

The path alias `@/` resolves to `src/`.

**Fix import order issues:** `npx eslint --fix <file>`

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
- `hook.ts` contains pure logic only (data fetching, state, filtering) — text formatting, labels, colors belong in `.tsx` view components
- Always use `{}` for `if`/`for`/`while` blocks, even single-line bodies
- Use `DeveloperConsole.log({ message, data })` instead of `console.log()` - accepts ILog object (`{ message: string, data?: T, location?: string }`), NOT string args
- Use `DateStandard.fromISO()` instead of `new Date(isoString)` for ISO date parsing
- Use `CustomSearchParams.buildURL()` for API URL query string building


## Pull Request Workflow

### PR Template
Follow `.github/PULL_REQUEST_TEMPLATE.md`:
- 📝 개요
- 🔗 이슈 내용 (Jira 링크)
- 🛠 주요 변경 사항 (체크리스트)
- 🚀 기대 효과

### Review Feedback Commits
커밋 메시지에 구체적인 수정 내용 명시:
- ❌ `fix: 리뷰 피드백 반영`
- ✅ `fix: CodeRabbit 리뷰 반영 - 중앙화된 타입 import로 변경`

## Storybook

UI 컴포넌트 추가 시 **반드시** Storybook 스토리 파일을 함께 작성합니다.

### 파일 위치
- 컴포넌트와 동일 디렉토리에 `ComponentName.stories.tsx` 생성

### 필수 구조
```typescript
import ComponentName from './index';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'layer/ComponentName',  // shared/Button, features/LoginForm 등
  component: ComponentName,
  parameters: {
    layout: 'centered',  // 'centered' | 'fullscreen' | 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    // props 문서화
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // 기본 props
  },
};
```

### 스토리 작성 규칙
- `Default` 스토리 필수
- 주요 variants (상태, 크기 등) 별도 스토리로 작성
- `argTypes`로 props 설명 추가
- 필요 시 `decorators`로 래퍼 제공

## Layer Documentation

레이어별 상세 패턴(Model, Store, API, Widget Data Fetching, Modal, Context, Routing 등)은 각 레이어 스킬에 정의:

| Layer | Skill | 주요 내용 |
|-------|-------|-----------|
| **Entities** | `entities-layer` | Model/State 패턴, Store 패턴, API 함수/서비스, 타입 네이밍 |
| **Features** | `features-layer` | Feature 네이밍, Hook 패턴, Entities 관계 |
| **Widgets** | `widgets-layer` | Widget Data Fetching, Hook 패턴, 생성 기준 |
| **Pages** | `pages-layer` | 위젯 조합, Modal openModal 패턴, Hook |
| **Shared** | `shared-layer` | 유틸리티, CustomModel, MSW 응답 패턴, 로깅 |
| **App** | `app-layer` | Provider 순서, 라우팅, Context 사용법 |

## Key Rules Summary

### File Naming Convention

- **All component files/directories**: PascalCase (e.g., `QuestionAddSection/index.tsx`)
- **Pages**: `Page*/index.tsx` (e.g., `PageDashboard/index.tsx`)
- **Modals**: `Modal*/index.tsx` (e.g., `ModalPublishSetting/index.tsx`)

### Layer Structure (No Slices for app, pages, shared)

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
