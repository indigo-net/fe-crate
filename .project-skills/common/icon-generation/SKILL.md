---
name: icon-generation
description: "Use this skill when generating or modifying icons in src/shared/ui/iconography/. Triggers include: 'create icon', 'add icon', 'new icon', 'generate icon', 'SVG icon', or when working with icon components. Do NOT use for general component development."
trigger: glob
globs: src/shared/ui/iconography/**/*.{ts,tsx}
license: Proprietary
---

# Icon Generation Rules

When generating an icon, the model MUST follow this rule set without exception. Any output that violates the rules is invalid.

## 1. Output Format

- Always provide both:
  - Raw .svg markup
  - React component code
- React component must be written in TypeScript.

## 2. SVG Structure

- Use <svg> tag only. No <symbol>, no external defs.
- Always include a <title> tag for accessibility.
- viewBox must be "0 0 24 24".
- Default size: width=24, height=24.

## 3. Styling Rules

- Solid style icon.
- Color must be currentColor only.
- `fill="none"` on <svg>.
- Use <path> only unless geometry strictly requires otherwise.
- Stroke rules:
  - `stroke="currentColor"`
  - `strokeWidth={1.125}`
  - `strokeLinecap="round"`
  - `strokeLinejoin="round"`

## 4. Geometry Rules

- Icon must be visually centered.
- Use even spacing and symmetrical coordinates.
- Avoid unnecessary complexity.
- No decorative noise, no shading, no gradients.

## 5. React Component Rules

- Component signature:

```tsx
import type { SVGProps } from 'react';
```

- Destructure props exactly:
  - `width = 24`
  - `height = 24`
  - `'aria-label'`
  - `'aria-hidden'`
- `<title>` must render conditionally:
  - Render only when aria-hidden is false.
- Spread props onto <svg>.

## 6. Naming

- Component name must be PascalCase.
- aria-label value must match the icon name (lowercase).

## 7. Consistency Enforcement Phrase

Every icon generation MUST internally obey this rule set.
If any rule is violated, the icon is considered invalid and must be regenerated.
