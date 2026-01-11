---
trigger: always_on
---

# Frontend Architecture Rules (FSD-based)

## 1.0 Core Architectural Principles: Controller-Service Separation (FSD-Based)

The strategic application of a Controller-Service architectural pattern, inspired by backend design and aligned with Feature-Sliced Design (FSD), is a non-negotiable foundation of this project. This separation of concerns is critical for maintaining a scalable, testable, and maintainable codebase. Logic must be strictly segregated into the following three layers. The data and dependency flow is strictly unidirectional:

**UI → Controller → Service**

If any architectural or structural decision is not explicitly defined in this document, you must follow the **official Feature-Sliced Design (FSD) guidelines** as the default source of truth.

---

## 1.1 UI Layer (View)

Located within `features/ui`, this layer is exclusively for presentation. Components in this layer must be pure, declarative, and "dumb."

### Responsibilities

- Function as a pure "View" layer, responsible only for rendering data passed down via props.
- Bind UI events (e.g., onClick, onChange) to handler functions provided by the Controller layer.
- Perform minimal, render-time null or empty checks for display purposes.

### Strict Prohibitions

- Containing any business logic, state modification, or data transformation.
- Calling any Service layer logic directly.
- It is strictly forbidden to use any React hooks directly. This includes useState, useEffect, useCallback, useMemo, and all other hooks. All state and effects must be managed by the Controller.

---

## 1.2 Controller Layer (Hooks)

Implemented as custom React hooks within `features/ui/hooks`, this layer acts as the intermediary between the user's intent (View) and the application's business logic (Service).

### Responsibilities

- Receive user events and intents forwarded from the UI Layer.
- Orchestrate and delegate calls to the appropriate Service layer logic.
- Read from and write to state management stores (e.g., Zustand).
- Manage all component-level state, side effects, and memoization by exclusively using all React hooks (useState, useEffect, useMemo, etc.).

### Strict Prohibitions

- Containing any core domain rules or business invariants.
- Mutating domain objects directly; mutations must be performed by a Service.
- Including any UI rendering logic (JSX). The output of a Controller hook should be plain values and handler functions.

---

## 1.3 Service Layer (Domain Logic)

Located within `entities/**/lib`, the Service layer is the brain of the application, containing all pure, framework-agnostic business and domain logic.

### Responsibilities & Attributes

- Must be implemented as stateless functions or static class methods.
- Must be side-effect free, deterministic, and easily testable in isolation.
- Encapsulates all domain rules, data transformations, and business invariants.

### Strict Prohibitions

- Under no circumstances may Services access UI components, Controller hooks, or any other part of the React lifecycle.
- Services must never depend on features or pages slices.

---

## 2.0 Strict Dependency and Naming Rules

To enforce the architectural data flow and maintain code predictability, the following dependency and naming conventions are mandatory.

### 2.1 Dependency Rule Hierarchy

The flow of dependencies is strictly unidirectional to prevent coupling and maintain layer integrity.

- features → entities ✔
- entities → features ✘
- UI → Controller ✔
- Controller → Services ✔
- UI → Services (directly) ✘
- Services → UI ✘

---

### 2.2 Naming Conventions

- **Controller Hooks**  
  Must follow the `use*Controller` pattern (e.g., `useQuestionListController`).

- **Service Layer Files**  
  Must follow either `*StateService` or `*DomainService` patterns (e.g., `FormSignatureStateService`).
