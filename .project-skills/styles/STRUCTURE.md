This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
border-radius.css
border-width.css
break-point.css
colors.css
font-weight.css
fonts.css
index.css
```

# Files

## File: border-radius.css
```css
@theme {
  --radius-slim-sm: 4px;
  --radius-slim-md: 8px;
  --radius-slim-lg: 12px;
  --radius-slim-xl: 16px;
  --radius-slim-2xl: 24px;
}
```

## File: border-width.css
```css
@theme {
  --border-width-slim: 0.5px;
  --border-width-thin: 1px;
}
```

## File: break-point.css
```css
@theme {
  --breakpoint-mobile: 365px;
  --breakpoint-desktop: 720px;
}
```

## File: colors.css
```css
/* ============================================
 * CRATE Color Token System
 * Primary: Indigo | Secondary: Orange
 * Supports Light & Dark Modes
 * WCAG AA Compliant
 * ============================================ */

:root {
  /* ==================== BRAND COLORS ==================== */

  /* Primary (Indigo) - Main brand color */
  --color-primary-50: #eef2ff;
  --color-primary-100: #e0e7ff;
  --color-primary-200: #c7d2fe;
  --color-primary-300: #a5b4fc;
  --color-primary-400: #818cf8;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
  --color-primary-800: #3730a3;
  --color-primary-900: #312e81;

  /* Secondary (Orange) - Accent color */
  --color-secondary-50: #fff7ed;
  --color-secondary-100: #ffedd5;
  --color-secondary-200: #fed7aa;
  --color-secondary-300: #fdba74;
  --color-secondary-400: #fb923c;
  --color-secondary-500: #f97316;
  --color-secondary-600: #ea580c;
  --color-secondary-700: #c2410c;
  --color-secondary-800: #9a3412;
  --color-secondary-900: #7c2d12;

  /* ==================== SEMANTIC TOKENS ==================== */

  /* Brand */
  --color-brand-primary: var(--color-primary-600);
  --color-brand-secondary: var(--color-secondary-500);

  /* Backgrounds */
  --color-bg-base: #ffffff;
  --color-bg-subtle: #f9fafb;
  --color-bg-muted: #f3f4f6;

  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #9ca3af;
  --color-text-inverse: #ffffff;

  /* Borders */
  --color-border-default: #e5e7eb;
  --color-border-subtle: #f3f4f6;
  --color-border-strong: #d1d5db;

  /* Interactive States */
  --color-interactive-primary: var(--color-primary-600);
  --color-interactive-primary-hover: var(--color-primary-700);
  --color-interactive-primary-active: var(--color-primary-800);
  --color-interactive-secondary: var(--color-secondary-500);
  --color-interactive-secondary-hover: var(--color-secondary-600);
  --color-interactive-secondary-active: var(--color-secondary-700);

  /* ==================== FUNCTIONAL COLORS ==================== */

  /* Success (Green) */
  --color-success: #10b981;
  --color-success-bg: #d1fae5;
  --color-success-border: #6ee7b7;

  /* Warning (Amber) */
  --color-warning: #f59e0b;
  --color-warning-bg: #fef3c7;
  --color-warning-border: #fcd34d;

  /* Error (Red) */
  --color-error: #ef4444;
  --color-error-bg: #fee2e2;
  --color-error-border: #fca5a5;

  /* Info (Blue) */
  --color-info: #3b82f6;
  --color-info-bg: #dbeafe;
  --color-info-border: #93c5fd;

  /* ==================== SURFACE COLORS ==================== */

  --color-surface-overlay: rgba(0, 0, 0, 0.5);
  --color-surface-elevated: #ffffff;

  /* ==================== GRAYSCALE ==================== */

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* ==================== ADDITIONAL PALETTES ==================== */

  /* Blue */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;

  /* Green */
  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-200: #bbf7d0;
  --color-green-300: #86efac;
  --color-green-400: #4ade80;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;
  --color-green-800: #166534;
  --color-green-900: #14532d;

  /* Red */
  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;
  --color-red-900: #7f1d1d;

  /* Amber */
  --color-amber-50: #fffbeb;
  --color-amber-100: #fef3c7;
  --color-amber-200: #fde68a;
  --color-amber-300: #fcd34d;
  --color-amber-400: #fbbf24;
  --color-amber-500: #f59e0b;
  --color-amber-600: #d97706;
  --color-amber-700: #b45309;
  --color-amber-800: #92400e;
  --color-amber-900: #78350f;

  /* Indigo (extended) */
  --color-indigo-50: #eef2ff;
  --color-indigo-100: #e0e7ff;
  --color-indigo-200: #c7d2fe;
  --color-indigo-300: #a5b4fc;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-indigo-700: #4338ca;
  --color-indigo-800: #3730a3;
  --color-indigo-900: #312e81;

  /* Orange (extended) */
  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-300: #fdba74;
  --color-orange-400: #fb923c;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-700: #c2410c;
  --color-orange-800: #9a3412;
  --color-orange-900: #7c2d12;

  /* Cyan */
  --color-cyan-50: #ecfeff;
  --color-cyan-100: #cffafe;
  --color-cyan-200: #a5f3fc;
  --color-cyan-300: #67e8f9;
  --color-cyan-400: #22d3ee;
  --color-cyan-500: #06b6d4;
  --color-cyan-600: #0891b2;
  --color-cyan-700: #0e7490;
  --color-cyan-800: #155e75;
  --color-cyan-900: #164e63;

  /* Pink */
  --color-pink-50: #fdf2f8;
  --color-pink-100: #fce7f3;
  --color-pink-200: #fbcfe8;
  --color-pink-300: #f9a8d4;
  --color-pink-400: #f472b6;
  --color-pink-500: #ec4899;
  --color-pink-600: #db2777;
  --color-pink-700: #be185d;
  --color-pink-800: #9d174d;
  --color-pink-900: #831843;

  /* Purple */
  --color-purple-50: #faf5ff;
  --color-purple-100: #f3e8ff;
  --color-purple-200: #e9d5ff;
  --color-purple-300: #d8b4fe;
  --color-purple-400: #c084fc;
  --color-purple-500: #a855f7;
  --color-purple-600: #9333ea;
  --color-purple-700: #7e22ce;
  --color-purple-800: #6b21a8;
  --color-purple-900: #581c87;

  /* Neon Pink (Hot) */
  --color-neon-pink-50: #fdf2f8;
  --color-neon-pink-100: #fce7f3;
  --color-neon-pink-200: #fbcfe8;
  --color-neon-pink-300: #f9a8d4;
  --color-neon-pink-400: #f472b6;
  --color-neon-pink-500: #ec4899;
  --color-neon-pink-600: #db2777;
  --color-neon-pink-700: #be185d;
  --color-neon-pink-800: #9d174d;
  --color-neon-pink-900: #831843;

  /* Neon Green (Lime) */
  --color-neon-green-50: #f0fdf4;
  --color-neon-green-100: #dcfce7;
  --color-neon-green-200: #bbf7d0;
  --color-neon-green-300: #86efac;
  --color-neon-green-400: #4ade80;
  --color-neon-green-500: #22c55e;
  --color-neon-green-600: #16a34a;
  --color-neon-green-700: #15803d;
  --color-neon-green-800: #166534;
  --color-neon-green-900: #14532d;

  /* Neon Violet (Electric) */
  --color-neon-violet-50: #f5f3ff;
  --color-neon-violet-100: #ede9fe;
  --color-neon-violet-200: #ddd6fe;
  --color-neon-violet-300: #c4b5fd;
  --color-neon-violet-400: #a78bfa;
  --color-neon-violet-500: #8b5cf6;
  --color-neon-violet-600: #7c3aed;
  --color-neon-violet-700: #6d28d9;
  --color-neon-violet-800: #5b21b6;
  --color-neon-violet-900: #4c1d95;

  /* ==================== UTILITY ==================== */

  --color-white: #ffffff;
  --color-black: #000000;
}

/* ============================================
 * DARK MODE
 * ============================================ */

.dark {
  /* ==================== SEMANTIC TOKENS (DARK) ==================== */

  /* Brand (lighter for dark backgrounds) */
  --color-brand-primary: var(--color-primary-400);
  --color-brand-secondary: var(--color-secondary-400);

  /* Backgrounds */
  --color-bg-base: #0f172a;
  --color-bg-subtle: #1e293b;
  --color-bg-muted: #334155;

  /* Text */
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #0f172a;

  /* Borders */
  --color-border-default: #334155;
  --color-border-subtle: #1e293b;
  --color-border-strong: #475569;

  /* Interactive States (lighter for visibility) */
  --color-interactive-primary: var(--color-primary-500);
  --color-interactive-primary-hover: var(--color-primary-400);
  --color-interactive-primary-active: var(--color-primary-300);
  --color-interactive-secondary: var(--color-secondary-500);
  --color-interactive-secondary-hover: var(--color-secondary-400);
  --color-interactive-secondary-active: var(--color-secondary-300);

  /* ==================== FUNCTIONAL COLORS (DARK) ==================== */

  /* Success */
  --color-success: #34d399;
  --color-success-bg: #064e3b;
  --color-success-border: #059669;

  /* Warning */
  --color-warning: #fbbf24;
  --color-warning-bg: #78350f;
  --color-warning-border: #d97706;

  /* Error */
  --color-error: #f87171;
  --color-error-bg: #7f1d1d;
  --color-error-border: #dc2626;

  /* Info */
  --color-info: #60a5fa;
  --color-info-bg: #1e3a8a;
  --color-info-border: #2563eb;

  /* ==================== SURFACE COLORS (DARK) ==================== */

  --color-surface-overlay: rgba(0, 0, 0, 0.7);
  --color-surface-elevated: #1e293b;

  /* Neon Pink (Hot) */
  --color-neon-pink-50: #fce7f3;
  --color-neon-pink-100: #fbcfe8;
  --color-neon-pink-200: #f9a8d4;
  --color-neon-pink-300: #f472b6;
  --color-neon-pink-400: #ec4899;
  --color-neon-pink-500: #db2777;
  --color-neon-pink-600: #be185d;
  --color-neon-pink-700: #9d174d;
  --color-neon-pink-800: #831843;
  --color-neon-pink-900: #701a75;

  /* Neon Green (Lime) */
  --color-neon-green-50: #dcfce7;
  --color-neon-green-100: #bbf7d0;
  --color-neon-green-200: #86efac;
  --color-neon-green-300: #4ade80;
  --color-neon-green-400: #22c55e;
  --color-neon-green-500: #16a34a;
  --color-neon-green-600: #15803d;
  --color-neon-green-700: #166534;
  --color-neon-green-800: #14532d;
  --color-neon-green-900: #064e3b;

  /* Neon Violet (Electric) */
  --color-neon-violet-50: #ede9fe;
  --color-neon-violet-100: #ddd6fe;
  --color-neon-violet-200: #c4b5fd;
  --color-neon-violet-300: #a78bfa;
  --color-neon-violet-400: #8b5cf6;
  --color-neon-violet-500: #7c3aed;
  --color-neon-violet-600: #6d28d9;
  --color-neon-violet-700: #5b21b6;
  --color-neon-violet-800: #4c1d95;
  --color-neon-violet-900: #3b0764;
}

/* ============================================
 * TAILWIND V4 THEME INTEGRATION
 * ============================================ */

@theme {
  /* ==================== BRAND ==================== */
  --color-brand-primary: var(--color-brand-primary);
  --color-brand-secondary: var(--color-brand-secondary);

  /* ==================== SEMANTIC ==================== */
  --color-bg-base: var(--color-bg-base);
  --color-bg-subtle: var(--color-bg-subtle);
  --color-bg-muted: var(--color-bg-muted);

  --color-text-primary: var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);
  --color-text-tertiary: var(--color-text-tertiary);
  --color-text-inverse: var(--color-text-inverse);

  --color-border-default: var(--color-border-default);
  --color-border-subtle: var(--color-border-subtle);
  --color-border-strong: var(--color-border-strong);

  /* ==================== INTERACTIVE ==================== */
  --color-interactive-primary: var(--color-interactive-primary);
  --color-interactive-primary-hover: var(--color-interactive-primary-hover);
  --color-interactive-primary-active: var(--color-interactive-primary-active);
  --color-interactive-secondary: var(--color-interactive-secondary);
  --color-interactive-secondary-hover: var(--color-interactive-secondary-hover);
  --color-interactive-secondary-active: var(--color-interactive-secondary-active);

  /* ==================== FUNCTIONAL ==================== */
  --color-success: var(--color-success);
  --color-success-bg: var(--color-success-bg);
  --color-success-border: var(--color-success-border);

  --color-warning: var(--color-warning);
  --color-warning-bg: var(--color-warning-bg);
  --color-warning-border: var(--color-warning-border);

  --color-error: var(--color-error);
  --color-error-bg: var(--color-error-bg);
  --color-error-border: var(--color-error-border);

  --color-info: var(--color-info);
  --color-info-bg: var(--color-info-bg);
  --color-info-border: var(--color-info-border);

  /* ==================== SURFACE ==================== */
  --color-surface-overlay: var(--color-surface-overlay);
  --color-surface-elevated: var(--color-surface-elevated);

  /* ==================== PALETTES ==================== */

  /* Primary (Indigo) */
  --color-primary-50: var(--color-primary-50);
  --color-primary-100: var(--color-primary-100);
  --color-primary-200: var(--color-primary-200);
  --color-primary-300: var(--color-primary-300);
  --color-primary-400: var(--color-primary-400);
  --color-primary-500: var(--color-primary-500);
  --color-primary-600: var(--color-primary-600);
  --color-primary-700: var(--color-primary-700);
  --color-primary-800: var(--color-primary-800);
  --color-primary-900: var(--color-primary-900);

  /* Secondary (Orange) */
  --color-secondary-50: var(--color-secondary-50);
  --color-secondary-100: var(--color-secondary-100);
  --color-secondary-200: var(--color-secondary-200);
  --color-secondary-300: var(--color-secondary-300);
  --color-secondary-400: var(--color-secondary-400);
  --color-secondary-500: var(--color-secondary-500);
  --color-secondary-600: var(--color-secondary-600);
  --color-secondary-700: var(--color-secondary-700);
  --color-secondary-800: var(--color-secondary-800);
  --color-secondary-900: var(--color-secondary-900);

  /* Grayscale */
  --color-gray-50: var(--color-gray-50);
  --color-gray-100: var(--color-gray-100);
  --color-gray-200: var(--color-gray-200);
  --color-gray-300: var(--color-gray-300);
  --color-gray-400: var(--color-gray-400);
  --color-gray-500: var(--color-gray-500);
  --color-gray-600: var(--color-gray-600);
  --color-gray-700: var(--color-gray-700);
  --color-gray-800: var(--color-gray-800);
  --color-gray-900: var(--color-gray-900);

  /* Blue */
  --color-blue-50: var(--color-blue-50);
  --color-blue-100: var(--color-blue-100);
  --color-blue-200: var(--color-blue-200);
  --color-blue-300: var(--color-blue-300);
  --color-blue-400: var(--color-blue-400);
  --color-blue-500: var(--color-blue-500);
  --color-blue-600: var(--color-blue-600);
  --color-blue-700: var(--color-blue-700);
  --color-blue-800: var(--color-blue-800);
  --color-blue-900: var(--color-blue-900);

  /* Green */
  --color-green-50: var(--color-green-50);
  --color-green-100: var(--color-green-100);
  --color-green-200: var(--color-green-200);
  --color-green-300: var(--color-green-300);
  --color-green-400: var(--color-green-400);
  --color-green-500: var(--color-green-500);
  --color-green-600: var(--color-green-600);
  --color-green-700: var(--color-green-700);
  --color-green-800: var(--color-green-800);
  --color-green-900: var(--color-green-900);

  /* Red */
  --color-red-50: var(--color-red-50);
  --color-red-100: var(--color-red-100);
  --color-red-200: var(--color-red-200);
  --color-red-300: var(--color-red-300);
  --color-red-400: var(--color-red-400);
  --color-red-500: var(--color-red-500);
  --color-red-600: var(--color-red-600);
  --color-red-700: var(--color-red-700);
  --color-red-800: var(--color-red-800);
  --color-red-900: var(--color-red-900);

  /* Amber */
  --color-amber-50: var(--color-amber-50);
  --color-amber-100: var(--color-amber-100);
  --color-amber-200: var(--color-amber-200);
  --color-amber-300: var(--color-amber-300);
  --color-amber-400: var(--color-amber-400);
  --color-amber-500: var(--color-amber-500);
  --color-amber-600: var(--color-amber-600);
  --color-amber-700: var(--color-amber-700);
  --color-amber-800: var(--color-amber-800);
  --color-amber-900: var(--color-amber-900);

  /* Indigo */
  --color-indigo-50: var(--color-indigo-50);
  --color-indigo-100: var(--color-indigo-100);
  --color-indigo-200: var(--color-indigo-200);
  --color-indigo-300: var(--color-indigo-300);
  --color-indigo-400: var(--color-indigo-400);
  --color-indigo-500: var(--color-indigo-500);
  --color-indigo-600: var(--color-indigo-600);
  --color-indigo-700: var(--color-indigo-700);
  --color-indigo-800: var(--color-indigo-800);
  --color-indigo-900: var(--color-indigo-900);

  /* Orange */
  --color-orange-50: var(--color-orange-50);
  --color-orange-100: var(--color-orange-100);
  --color-orange-200: var(--color-orange-200);
  --color-orange-300: var(--color-orange-300);
  --color-orange-400: var(--color-orange-400);
  --color-orange-500: var(--color-orange-500);
  --color-orange-600: var(--color-orange-600);
  --color-orange-700: var(--color-orange-700);
  --color-orange-800: var(--color-orange-800);
  --color-orange-900: var(--color-orange-900);

  /* Cyan */
  --color-cyan-50: var(--color-cyan-50);
  --color-cyan-100: var(--color-cyan-100);
  --color-cyan-200: var(--color-cyan-200);
  --color-cyan-300: var(--color-cyan-300);
  --color-cyan-400: var(--color-cyan-400);
  --color-cyan-500: var(--color-cyan-500);
  --color-cyan-600: var(--color-cyan-600);
  --color-cyan-700: var(--color-cyan-700);
  --color-cyan-800: var(--color-cyan-800);
  --color-cyan-900: var(--color-cyan-900);

  /* Pink */
  --color-pink-50: var(--color-pink-50);
  --color-pink-100: var(--color-pink-100);
  --color-pink-200: var(--color-pink-200);
  --color-pink-300: var(--color-pink-300);
  --color-pink-400: var(--color-pink-400);
  --color-pink-500: var(--color-pink-500);
  --color-pink-600: var(--color-pink-600);
  --color-pink-700: var(--color-pink-700);
  --color-pink-800: var(--color-pink-800);
  --color-pink-900: var(--color-pink-900);

  /* Purple */
  --color-purple-50: var(--color-purple-50);
  --color-purple-100: var(--color-purple-100);
  --color-purple-200: var(--color-purple-200);
  --color-purple-300: var(--color-purple-300);
  --color-purple-400: var(--color-purple-400);
  --color-purple-500: var(--color-purple-500);
  --color-purple-600: var(--color-purple-600);
  --color-purple-700: var(--color-purple-700);
  --color-purple-800: var(--color-purple-800);
  --color-purple-900: var(--color-purple-900);

  /* Neon Pink */
  --color-neon-pink-50: var(--color-neon-pink-50);
  --color-neon-pink-100: var(--color-neon-pink-100);
  --color-neon-pink-200: var(--color-neon-pink-200);
  --color-neon-pink-300: var(--color-neon-pink-300);
  --color-neon-pink-400: var(--color-neon-pink-400);
  --color-neon-pink-500: var(--color-neon-pink-500);
  --color-neon-pink-600: var(--color-neon-pink-600);
  --color-neon-pink-700: var(--color-neon-pink-700);
  --color-neon-pink-800: var(--color-neon-pink-800);
  --color-neon-pink-900: var(--color-neon-pink-900);

  /* Neon Green */
  --color-neon-green-50: var(--color-neon-green-50);
  --color-neon-green-100: var(--color-neon-green-100);
  --color-neon-green-200: var(--color-neon-green-200);
  --color-neon-green-300: var(--color-neon-green-300);
  --color-neon-green-400: var(--color-neon-green-400);
  --color-neon-green-500: var(--color-neon-green-500);
  --color-neon-green-600: var(--color-neon-green-600);
  --color-neon-green-700: var(--color-neon-green-700);
  --color-neon-green-800: var(--color-neon-green-800);
  --color-neon-green-900: var(--color-neon-green-900);

  /* Neon Violet */
  --color-neon-violet-50: var(--color-neon-violet-50);
  --color-neon-violet-100: var(--color-neon-violet-100);
  --color-neon-violet-200: var(--color-neon-violet-200);
  --color-neon-violet-300: var(--color-neon-violet-300);
  --color-neon-violet-400: var(--color-neon-violet-400);
  --color-neon-violet-500: var(--color-neon-violet-500);
  --color-neon-violet-600: var(--color-neon-violet-600);
  --color-neon-violet-700: var(--color-neon-violet-700);
  --color-neon-violet-800: var(--color-neon-violet-800);
  --color-neon-violet-900: var(--color-neon-violet-900);

  /* Utility */
  --color-white: var(--color-white);
  --color-black: var(--color-black);
}
```

## File: font-weight.css
```css
@theme {
  --font-weight-slim-thin: 300;
  --font-weight-slim-normal: 400;
  --font-weight-slim-semibold: 600;
  --font-weight-slim-bold: 700;
}
```

## File: fonts.css
```css
@theme {
  --font-sans:
    'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
}
```

## File: index.css
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

@import 'tailwindcss';
@import './fonts.css';
@import './border-radius.css';
@import './border-width.css';
@import './break-point.css';
@import './colors.css';
@import './font-weight.css';

* {
  /* padding과 border를 width에 포함 */
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  font-size: 16px;
  /* 텍스트 렌더링 최적화 */
  text-rendering: optimizeLegibility;
  /* Firefox에서 폰트 렌더링 개선 */
  -webkit-font-smoothing: antialiased;
  /* macOS/iOS에서 폰트 렌더링 개선 */
  -moz-osx-font-smoothing: grayscale;
  /* 테마 색상 적용 */
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
}

body {
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
```
