---
name: writing-skills
description: "Use when creating new skills, editing existing skills, or verifying skills work before deployment. Triggers: 'create skill', 'write SKILL.md', 'new skill', 'update skill', 'skill guide'. Do NOT use for general documentation or README files."
---

> **원본 경로**: `.project-skills/common/writing-skills/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# SKILL.md Writing Guide

Claude Code 스킬 문서 작성 가이드입니다.

## Quick Reference

| 작업 | 접근 방식 |
|------|----------|
| 새 스킬 생성 | YAML 프론트매터 → H1 제목 → 본문 섹션 |
| Description 작성 | 트리거 조건 + 제외 사항 명시 |
| 코드 예제 | 실행 가능한 완전한 코드 블록 |
| 경고 강조 | `**CRITICAL**`, `**WARNING**`, `**Note**` |
| 스킬 배포 | Claude Code + Antigravity 심볼릭 링크 생성 |

## YAML 프론트매터 (필수)

```yaml
---
name: skill-name                    # 스킬 폴더명과 일치 (소문자, 하이픈 구분)
description: "Use this skill when [condition]. Triggers include: [keywords], [file types]. Do NOT use for [exclusions]."
license: Proprietary                # 또는 구체적 라이선스
---
```

### Description 작성 규칙

- **200자 이내**로 간결하게
- **트리거 조건** 명시: 키워드, 파일 형식, 상황
- **제외 사항** 명시: `Do NOT use for...`
- 패턴: `"Use this skill when... Triggers include:... Do NOT use for..."`

❌ **나쁜 예:** `description: 'Word documents'`

✅ **좋은 예:**
```yaml
description: "Use this skill when the user wants to create, read, or edit Word documents (.docx). Triggers: 'Word doc', '.docx', 'report', 'memo'. Do NOT use for PDFs or spreadsheets."
```

## 본문 구조

### 1. 제목 (H1)

```markdown
# [스킬의 핵심 기능]
```

### 2. Overview (선택)

기술적 배경과 목적을 1-2문장으로 설명.

### 3. Quick Reference (권장)

주요 작업과 접근 방식을 표로 매핑:

```markdown
| 작업 | 접근 방식 | 복잡도 |
|------|----------|--------|
| 읽기 | pandoc   | 낮음   |
| 생성 | docx-js  | 중간   |
```

### 4. 상세 가이드

각 작업마다:
1. H3/H4 제목 (명확한 작업명)
2. 설명 (무엇을, 언제, 왜)
3. 코드 블록 (실행 가능한 예제)
4. 주의사항 (필요시)

## 코드 예제 규칙

- **완전하고 복사 가능**: 실제 실행 가능한 코드
- **언어 태그 명시**: `bash`, `javascript`, `python` 등
- **간단한 설명** 포함

```bash
# 텍스트 추출
pandoc document.docx -o output.md
```

## 강조 패턴

```markdown
**CRITICAL**: 반드시 지켜야 할 사항
**WARNING**: 주의 필요
**Note**: 부가 정보
```

## 체크리스트

- [ ] YAML 프론트매터 (name, description, license)
- [ ] 명확한 H1 제목
- [ ] Quick Reference 표
- [ ] 실행 가능한 코드 예제
- [ ] CRITICAL/WARNING 강조
- [ ] 제외 사항 명시
- [ ] Claude Code 심볼릭 링크 (`.claude/skills/<name>.md`)
- [ ] Antigravity 심볼릭 링크 (`.agent/skills/<name>/SKILL.md`)

## 스킬 배포 (심볼릭 링크)

새 스킬을 `.project-skills/`에 추가한 후, 두 에이전트에서 사용할 수 있도록 심볼릭 링크를 생성해야 합니다.

### Claude Code

```bash
ln -s ../../.project-skills/<skill-path>/SKILL.md .claude/skills/<skill-name>.md
```

### Antigravity

```bash
mkdir -p .agent/skills/<skill-name>
ln -s ../../../.project-skills/<skill-path>/SKILL.md .agent/skills/<skill-name>/SKILL.md
```

**CRITICAL**: `.project-skills/`가 단일 소스 오브 트루스(Single Source of Truth)입니다. 모든 에이전트는 이 디렉토리의 파일을 심볼릭 링크로 참조합니다.

## 템플릿

```markdown
---
name: your-skill-name
description: "Use this skill when [condition]. Triggers include: [keywords]. Do NOT use for [exclusions]."
---

# [Skill Title]

## Overview

[Technical definition and purpose]

## Quick Reference

| Task | Approach |
|------|----------|
| [Task 1] | [Method 1] |

## [Main Topic]

[Description]

```bash
[Working example]
```

**CRITICAL**: [Important warning]
```

### 배포 명령어

```bash
# Claude Code
ln -s ../../.project-skills/common/your-skill-name/SKILL.md .claude/skills/your-skill-name.md

# Antigravity
mkdir -p .agent/skills/your-skill-name
ln -s ../../../.project-skills/common/your-skill-name/SKILL.md .agent/skills/your-skill-name/SKILL.md
```
