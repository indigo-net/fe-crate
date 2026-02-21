# Update Layer Structure

Generate STRUCTURE.md files for FSD layers using repomix with --no-files option.

## When to Use

- Run `/update-structure` command to manually update all layer structures
- Run automatically after completing work that modifies layer code
- Use when onboarding to understand layer structure

## Execution

### Manual Update (All Layers)

When user runs `/update-structure`:

```bash
# Generate STRUCTURE.md for each layer (directory structure only, no file contents)
npx repomix src/app --output src/app/STRUCTURE.md --style markdown --no-files
npx repomix src/pages --output src/pages/STRUCTURE.md --style markdown --no-files
npx repomix src/widgets --output src/widgets/STRUCTURE.md --style markdown --no-files
npx repomix src/features --output src/features/STRUCTURE.md --style markdown --no-files
npx repomix src/entities --output src/entities/STRUCTURE.md --style markdown --no-files
npx repomix src/shared --output src/shared/STRUCTURE.md --style markdown --no-files
npx repomix src/@types --output src/@types/STRUCTURE.md --style markdown --no-files
npx repomix src/styles --output src/styles/STRUCTURE.md --style markdown --no-files
```

### Selective Update (Changed Layers Only)

After completing work, update only affected layers:

1. Identify changed layers from git diff or file paths
2. Run repomix only for those directories
3. Commit changes with message: `docs: update STRUCTURE.md for [layer]`

## Target Directories

| Directory | Description |
|-----------|-------------|
| `src/app` | Application initialization, providers, routing |
| `src/pages` | Page compositions |
| `src/widgets` | Complex UI compositions |
| `src/features` | User-facing features |
| `src/entities` | Business domain models |
| `src/shared` | Reusable utilities and base UI |
| `src/@types` | Global type definitions |
| `src/styles` | Global CSS and design tokens |

## Output Format

Each STRUCTURE.md contains:
- Directory structure overview (file tree)
- File list without contents
- Generated timestamp

The `--no-files` option excludes file contents, making the output lightweight and focused on structure.

## Post-Generation

1. Review generated files for sensitive information
2. Commit with appropriate message
3. Inform user of completed layers

## Example

```bash
# Update single layer
npx repomix src/entities --output src/entities/STRUCTURE.md --style markdown --no-files

# Commit
git add src/entities/STRUCTURE.md
git commit -m "docs: update STRUCTURE.md for entities layer"
```
