---
trigger: always_on
---

# Strategic UI Design & Layout Guide

The AI Agent must strictly follow these structural and stylistic principles to ensure consistency across all pages and components.

## 1. Design Strategy (Kitsch & Neon)
* **Kitsch Aesthetic:** Maintain a bold, experimental, and retro-futuristic visual style.
* **Typography:** Prioritize readability. Use neon color accents and high-contrast ratios between text and background to establish information hierarchy.
* **Contrast & Layering:** Ensure sharp separation between the background and component surfaces to create a punchy, high-definition look.

## 2. Component & Interaction Consistency
* **Unified UI Language:** All UI elements (Buttons, Inputs, Cards, etc.) must share consistent corner radii, border styles, and padding rules to ensure a cohesive user experience.
* **Reactive Interaction:** Every user action must provide visual feedback. Utilize neon glow effects (`drop-shadow`) as functional cues for states such as Hover, Active, and Focus.
* **Theme Compatibility:** All designs must be responsive to both Light and Dark modes. Ensure that visibility and the "neon" vibe remain consistent and clear across both themes.

## 3. Implementation Rules (Critical)
* **Strict Token Adherence:** You MUST scan all files in the `src/styles/` directory (including `colors.css` and `break-point.css`) before starting. Every UI element must be mapped to an existing CSS variable. Do not use hardcoded HEX codes or pixel values.
* **Layout Standards:** Apply responsive logic strictly according to the defined project breakpoints:
    - **Mobile:** `365px` (`--breakpoint-mobile`)
    - **Desktop:** `720px` (`--breakpoint-desktop`)

---
**Instruction for AI:** Before generating any code, analyze the overall page structure to ensure it aligns with the "Kitsch & Neon" strategy. All components must be designed for consistency in behavior, spacing, and design token usage across both Light and Dark modes.
