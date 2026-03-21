---
name: update-layer-structure
description: "Use this skill when you need to update or regenerate STRUCTURE.md files for FSD layers. Triggers include: 'update structure', 'regenerate structure', 'update STRUCTURE.md', or when the codebase structure has changed significantly. Also use when asked about how to document current layer structure. Do NOT use for reading or understanding existing structure - use the STRUCTURE.md files directly instead."
---

> **원본 경로**: `.project-skills/common/update-structure/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Update Layer Structure

## Overview

This skill updates STRUCTURE.md files in `.project-skills/*/` directories to reflect the current codebase structure using Repomix. STRUCTURE.md files provide a comprehensive view of each FSD layer's contents for AI systems.

## Quick Reference

| Task | Command |
|------|---------|
| Update entities layer | `npx repomix --include "src/entities/" --output ".project-skills/entities/STRUCTURE.md" --style markdown --no-file-summary` |
| Update features layer | `npx repomix --include "src/features/" --output ".project-skills/features/STRUCTURE.md" --style markdown --no-file-summary` |
| Update shared layer | `npx repomix --include "src/shared/" --output ".project-skills/shared/STRUCTURE.md" --style markdown --no-file-summary` |
| Update pages layer | `npx repomix --include "src/pages/" --output ".project-skills/pages/STRUCTURE.md" --style markdown --no-file-summary` |

## Process

### Step 1: Identify Target Layer

Identify the target layer (e.g., `entities`, `features`, `shared`, `pages`, `widgets`, `app`, `@types`, `styles`).

### Step 2: Run Repomix Command

```bash
npx repomix --include "src/{layer}/" --output ".project-skills/{layer}/STRUCTURE.md" --style markdown --no-file-summary
```

## All Layer Commands

```bash
# Update entities layer
npx repomix --include "src/entities/" --output ".project-skills/entities/STRUCTURE.md" --style markdown --no-file-summary

# Update features layer
npx repomix --include "src/features/" --output ".project-skills/features/STRUCTURE.md" --style markdown --no-file-summary

# Update shared layer
npx repomix --include "src/shared/" --output ".project-skills/shared/STRUCTURE.md" --style markdown --no-file-summary

# Update pages layer
npx repomix --include "src/pages/" --output ".project-skills/pages/STRUCTURE.md" --style markdown --no-file-summary

# Update widgets layer
npx repomix --include "src/widgets/" --output ".project-skills/widgets/STRUCTURE.md" --style markdown --no-file-summary

# Update app layer
npx repomix --include "src/app/" --output ".project-skills/app/STRUCTURE.md" --style markdown --no-file-summary

# Update @types layer
npx repomix --include "src/@types/" --output ".project-skills/@types/STRUCTURE.md" --style markdown --no-file-summary

# Update styles layer
npx repomix --include "src/styles/" --output ".project-skills/styles/STRUCTURE.md" --style markdown --no-file-summary
```

## Output Location

All STRUCTURE.md files are located in `.project-skills/*/STRUCTURE.md`.

**Note**: The original `src/*/STRUCTURE.md` files are now symlinks pointing to `.project-skills/*/STRUCTURE.md`, enabling multiple AI systems to share the same structure documentation.

## Command Flags

| Flag | Purpose |
|------|---------|
| `--include` | Specify source directory to include |
| `--output` | Output file path |
| `--style markdown` | Use markdown formatting |
| `--no-file-summary` | Keep output concise |

**CRITICAL**: Always use `--no-file-summary` flag to keep files manageable and `--style markdown` for proper formatting.
