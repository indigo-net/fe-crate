# Update Layer Structure

## Purpose

This skill updates STRUCTURE.md files in `agent-skills/*/` directories to reflect the current codebase structure using Repomix.

## When to Use

- After adding/removing files in a layer
- When the layer structure has changed
- To document the current state of a layer

## Process

1. Identify the target layer (e.g., `entities`, `features`, `shared`, `pages`, `widgets`, `app`, `@types`, `styles`)
2. Run the Repomix command with the appropriate source directory

## Command

```bash
npx repomix --include "src/{layer}/" --output "agent-skills/{layer}/STRUCTURE.md" --style markdown --no-file-summary
```

### Examples

```bash
# Update entities layer
npx repomix --include "src/entities/" --output "agent-skills/entities/STRUCTURE.md" --style markdown --no-file-summary

# Update features layer
npx repomix --include "src/features/" --output "agent-skills/features/STRUCTURE.md" --style markdown --no-file-summary

# Update shared layer
npx repomix --include "src/shared/" --output "agent-skills/shared/STRUCTURE.md" --style markdown --no-file-summary

# Update pages layer
npx repomix --include "src/pages/" --output "agent-skills/pages/STRUCTURE.md" --style markdown --no-file-summary

# Update widgets layer
npx repomix --include "src/widgets/" --output "agent-skills/widgets/STRUCTURE.md" --style markdown --no-file-summary

# Update app layer
npx repomix --include "src/app/" --output "agent-skills/app/STRUCTURE.md" --style markdown --no-file-summary

# Update @types layer
npx repomix --include "src/@types/" --output "agent-skills/@types/STRUCTURE.md" --style markdown --no-file-summary

# Update styles layer
npx repomix --include "src/styles/" --output "agent-skills/styles/STRUCTURE.md" --style markdown --no-file-summary
```

## Output Location

All STRUCTURE.md files are now located in `agent-skills/*/STRUCTURE.md` instead of `src/*/STRUCTURE.md`.

This change enables multiple AI systems (Claude, Cursor, Antigravity) to share the same structure documentation via symlinks.

## Notes

- The `--no-file-summary` flag keeps output concise
- The `--style markdown` ensures proper formatting
- Output files are markdown with directory structure and file contents
