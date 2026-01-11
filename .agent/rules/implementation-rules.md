---
trigger: always_on
---

# Frontend Implementation Rules

## 3.0 Code Implementation Guidelines

Beyond the architectural structure, you must adhere to a precise set of coding standards to ensure code is readable, consistent, and follows established best practices.

- Readability: Use early returns (guard clauses) wherever possible to reduce nested logic.
- Styling: Use Tailwind classes exclusively for all styling. Do not use plain CSS or `<style>` tags. All utility classes must conform to the latest Tailwind v4 conventions.
- Conditional Styling: When applying Tailwind classes, use class-based conditional syntax wherever possible to improve readability.
- Naming: Use descriptive names for all variables and functions. Event handler functions must be prefixed with `handle`.
- Accessibility: Implement accessibility features on interactive elements. For example, a clickable `<div>` should have `tabIndex="0"`, an appropriate `aria-label`, and both `onClick` and `onKeyDown` handlers.
- Function Syntax: Define functions using const arrow function syntax and apply TypeScript types where possible.

---

## 4.0 React Hooks Usage Rules (Strict)

### Core Rule

UI components (`features/ui`) must NOT use React hooks directly.

This includes, but is not limited to:

- useState
- useEffect
- useMemo
- useCallback
- useRef
- useReducer

This rule has no exceptions.

---

### Where Hooks Are Allowed

All React hooks must be declared and managed **only inside Controller hooks**:

- `use*Controller` (`features/ui/hooks`)

UI components must:

- Receive values and handlers from the controller
- Call functions passed from the controller
- Render JSX only

---

### UI Component Restrictions

UI components must NOT:

- Declare local state
- Use memoization hooks
- Contain side effects
- Derive or compute state from props or stores

Allowed in UI components:

- JSX
- Props
- Event binding to controller handlers
- Minimal render-time guards (e.g. null or empty checks)

---

### Controller Responsibilities (Expanded)

Controller hooks are responsible for:

- State ownership (useState, external store access, etc.)
- Memoization (useMemo, useCallback)
- Side effects (useEffect)
- Deriving computed values for the UI

Controllers expose:

- Plain values
- Plain functions

No JSX is allowed in controller hooks.

---

### Design Intent

This rule enforces a **hard View–Controller boundary**.

The UI layer must remain:

- Declarative
- Stateless
- Replaceable
- Easy to reason about

Violations of this rule are considered **architectural errors**,  
not stylistic preferences.
