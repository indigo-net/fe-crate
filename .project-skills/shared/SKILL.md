---
name: shared-layer
description: "Use this skill when working on the Shared layer of the FSD architecture. Triggers include: 'shared layer', 'utility', 'AxiosManager', 'EnvManager', 'TypeGuard', 'UUID', 'CustomModel', 'Modal', 'Alert', 'Toast', 'Iconography', or when modifying src/shared/ directory. Also use when creating reusable utilities or base UI components. Do NOT use for domain-specific logic or business models."
license: Proprietary
---

# Shared Layer Guide

## Overview

The `shared` layer contains reusable utilities, base components, and foundational code used across the entire application. This layer has no slices - all code is organized directly under segments.

## Quick Reference

| Task                     | Location                                    |
| ------------------------ | ------------------------------------------- |
| Create utility class     | `shared/lib/`                               |
| Create base UI component | `shared/ui/`                                |
| Create base model class  | `shared/model/`                             |
| Access HTTP client       | `AxiosManager.getAxiosInstance()`           |
| Access env variables     | `EnvManager.getAppEnv(key)`                 |
| Type checking            | `TypeGuard.checkNull(value)`                |
| Generate UUID            | `UUID.v4()`                                 |
| 파일 구조 확인           | `/.project-skills/shared/STRUCTURE.md` 참조 |

## Shared vs Domain Modules

When creating a new module, decide the location based on scope:

| Scope                        | Location                   | Example                |
| ---------------------------- | -------------------------- | ---------------------- |
| Used in one domain           | `entities/(domain)/lib/`   | `QuestionStateService` |
| Used across multiple domains | `shared/lib/`              | `TypeGuard`, `UUID`    |
| Domain-specific model        | `entities/(domain)/model/` | `FormQuestionModel`    |
| Base class for all models    | `shared/model/`            | `CustomModel`          |

## shared/lib Modules

### Utility Classes (singleton pattern)

```typescript
// AxiosManager - HTTP client instance
import { AxiosManager } from '@/shared/lib';
const axios = AxiosManager.getAxiosInstance();

// EnvManager - Environment variables
const apiUrl = EnvManager.getAppEnv('VITE_API_BASE_URL');

// TypeGuard - Runtime type checking
if (TypeGuard.checkNull(value)) {
  /* ... */
}
if (TypeGuard.checkString(value)) {
  /* ... */
}
```

### Helper Functions

```typescript
// UUID - Unique identifier generation
const id = UUID.v4();

// DateStandard - Date formatting standards
const now = DateStandard.now(); // ISO 8601 UTC

// DeveloperConsole - Development logging (replaces console.*)
DeveloperConsole.log({ message: 'Action completed', data: { id: 123 } });
```

## shared/model

Contains only base classes that domain models extend:

```typescript
// shared/model/custom-model/index.ts
abstract class CustomModel<T> {
  abstract toJSON(): T;
  abstract clone(props?: Partial<T>): CustomModel<T>;
}
```

**CRITICAL**: Only add base classes to `shared/model/`. Domain-specific models belong in `entities/*/model/`.

## shared/ui

Base UI components used throughout the application:

| Category          | Components               |
| ----------------- | ------------------------ |
| Layout components | Modal, Alert, Toast      |
| Form components   | Radio                    |
| Iconography       | Logo icons, Stroke icons |

```typescript
// Usage example
import { Iconography, Modal, Alert, Toast, Radio } from '@/shared/ui';
```

## shared/types.d.ts

Common type definitions shared across the application:

```typescript
// shared/types.d.ts
type AppEnvKey = 'VITE_API_BASE_URL' | 'VITE_KAKAO_CLIENT_ID' | 'VITE_KAKAO_REDIRECT_URI';

export type { AppEnvKey };
```

## Context Providers (in app layer)

Global context providers are located in `app/lib/context-provider/`.

**Note**: All pages are wrapped with the same providers. Provider order: `ToastProvider` → `AlertProvider` → `ModalProvider`.

## Reference

For current file structure and module list, see `/.project-skills/shared/STRUCTURE.md`.
