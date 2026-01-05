---
trigger: always_on
---

# Frontend Controller–Service Architecture Rules (FSD-based)

## Core Principle

This project applies a backend-inspired **Controller–Service separation** to frontend code,
strictly aligned with **Feature-Sliced Design (FSD)**.

The goal is to isolate:

- UI rendering (View)
- User intent handling (Controller)
- Business/domain logic (Service)

---

## Layer Responsibilities

### 1. UI Components (features/ui)

- Must be **pure View**
- Render data only
- Bind UI events to controller handlers
- Must NOT:
  - Contain business logic
  - Modify state directly
  - Call domain/service logic

UI components are allowed to:

- Perform minimal null/empty guards for rendering
- Remain fully declarative and dumb

---

### 2. Controller Layer (features/ui/hooks)

- Implemented as **custom React hooks**
- Acts as the Controller layer (Application Layer)
- Responsibilities:
  - Receive user events and intents
  - Read/write state via stores
  - Orchestrate calls to Service logic
  - Decide _which_ Service logic to run and _when_

Controller hooks must:

- NOT contain domain rules
- NOT mutate domain objects directly
- NOT include UI rendering logic

They may:

- Coordinate multiple services
- Manage state transactions
- Translate UI events into domain actions

---

### 3. Service Layer (entities/\*\*/lib)

- Contains **pure business/domain logic**
- Implemented as stateless functions or static class methods
- Must be:
  - Framework-agnostic (no React, no hooks)
  - Side-effect free
  - Deterministic and testable

Services must:

- Never access UI or hooks
- Never depend on features or pages
- Encapsulate all domain rules and invariants

---

## Dependency Rules (Strict)

- features → entities ✔
- entities → features ✘
- services → UI ✘
- UI → services (directly) ✘ (must go through Controller)

---

## Scope Rules

- Controller hooks are primarily used in `features/ui`
- Usage in `pages` is allowed **only when unavoidable**
- If controller logic grows too large:
  - Split the controller
  - Or introduce a higher-level application service

---

## Naming Convention

- `use*Controller` → Controller hooks
- `*StateService`, `*DomainService` → Service layer

---

## Design Intent

This architecture is intentional and enforced.

Do NOT:

- Collapse layers for convenience
- Move logic back into UI
- Bypass controllers to call services directly

Always prefer:

- Explicit orchestration
- Predictable data flow
- Testable, isolated domain logic
