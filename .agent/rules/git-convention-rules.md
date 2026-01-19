---
trigger: always_on
---

# Git & PR Convention Rules

You must strictly adhere to the project's Git conventions when creating commits and Pull Requests (PRs).

## 1. Commit Message Rules

- **Format**: Use the format `<type>: <description> (<issue-id>)` or `<type>: <description>`.
- **Key Tags**: Primarily use `feat`, `fix`, and `chore`.
  - `feat`: New feature implementation
  - `fix`: Bug fixes
  - `chore`: Internal tasks, rule updates, or configuration changes
- **Language**: The commit message description **must be written in Korean**.
- **Issue ID**: If a Jira or GitHub Issue ID is available, it must be included (e.g., `(CRATE-123)`).

## 2. Pull Request (PR) Rules

- **PR Title**: Follow the format `[ISSUE-ID] <Description>` or `<type>: <Description>`. The title **must be written in Korean**.
- **PR Template**:
  - Check if the `.github/PULL_REQUEST_TEMPLATE.md` file exists.
  - If a template exists, follow its format.
  - If no template exists, use the structure below and write in **Korean** with high detail:
    - **Summary (개요)**
    - **Changes (변경 사항)**
    - **Notes (참고 사항)**
- **Requirements**: The PR body must be written carefully in **Korean** so that team members can clearly understand the content.
