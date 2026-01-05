---
trigger: always_on
---

## React Hooks Usage Rules (Strict)

### Core Rule

UI components (`features/ui`) must NOT use React hooks directly.

This includes, but is not limited to:

- useState
- useEffect
- useMemo
- useCallback
- useRef
- useReducer

---

### Where Hooks Are Allowed

All React hooks must be declared and managed **only inside Controller hooks**:

- `use*Controller` (features/ui/hooks)

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
- Derive computed state

Allowed in UI:

- JSX
- Props
- Event binding to controller handlers
- Minimal render-time guards (e.g. null checks)

---

### Controller Responsibilities (Expanded)

Controller hooks are responsible for:

- State ownership (useState, store access, etc.)
- Memoization (useMemo, useCallback)
- Side effects (useEffect)
- Deriving computed values

Controllers expose:

- Plain values
- Plain functions

No JSX is allowed in controllers.

---

### Design Intent

This rule enforces a **hard View–Controller boundary**.

The UI layer must remain:

- Declarative
- Stateless
- Replaceable
- Easy to reason about

Violations of this rule are considered architectural errors,
not stylistic preferences.
