---
name: commit-guide
description: "Use this skill when creating git commits for this project. Triggers include: 'commit', 'git commit', '커밋', '커밋 메시지', or when user asks to commit changes. Also use when writing commit messages to ensure they follow project conventions. Do NOT use for reading commit history or git operations other than committing."
---

> **원본 경로**: `.project-skills/common/commit/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Git 커밋 가이드

## Overview

이 프로젝트의 Git 커밋 컨벤션을 정의합니다. 모든 커밋 메시지는 한글로 작성하며 Conventional Commits 형식을 따릅니다.

## Quick Reference

| 타입 | 용도 | 예시 |
|------|------|------|
| feat | 새로운 기능 | `feat: 로그인 기능 추가` |
| fix | 버그 수정 | `fix: 인증 토큰 만료 처리` |
| docs | 문서 변경 | `docs: CLAUDE.md 업데이트` |
| refactor | 코드 리팩토링 | `refactor: 컴포넌트 구조 개선` |
| test | 테스트 관련 | `test: 단위 테스트 추가` |
| chore | 기타 작업 | `chore: 의존성 업데이트` |

## 커밋 메시지 형식

```
<type>: <subject>

[optional body]

[optional footer]
```

### Subject 작성 규칙

- **필수**: 한글로 작성
- 명령형 어조 사용 (예: "추가함" → "추가")
- 마침표(.) 생략
- 50자 이내 권장

### Body 작성 규칙 (선택)

- 복잡한 변경사항 설명 시에만 작성
- 무엇을, 왜 변경했는지 설명
- 한 줄에 72자 이내 권장

### Footer 작성 규칙 (선택)

- Breaking Changes: `BREAKING CHANGE: 설명`
- 이슈 참조: `Closes #123`
- 공동 작성자: `Co-Authored-By: Name <email>`

## 커밋 타입 상세

### feat (feature)

새로운 기능 추가:

```
feat: 폼 유효성 검사 기능 추가
feat: 다크 모드 지원
```

### fix (bug fix)

버그 수정:

```
fix: 로그인 리다이렉트 오류 수정
fix: 메모리 누수 해결
```

### docs (documentation)

문서 변경:

```
docs: README 설치 방법 업데이트
docs: API 문서 추가
```

### refactor

코드 리팩토링 (기능 변경 없음):

```
refactor: 유틸리티 함수 분리
refactor: 타입 정의 개선
```

### test

테스트 관련:

```
test: 로그인 컴포넌트 테스트 추가
test: 통합 테스트 수정
```

### chore

기타 작업 (빌드, 설정, 의존성 등):

```
chore: ESLint 설정 업데이트
chore: 불필요한 파일 제거
```

## 실제 예시

### 간단한 커밋

```
feat: 질문 추가 섹션 컴포넌트 구현
```

### Body 포함

```
refactor: 상태 관리 로직 분리

- Zustand 스토어를 entities 레이어로 이동
- API 서비스를 별도 파일로 분리
- 컴포넌트에서 직접 API 호출 제거
```

### Footer 포함

```
feat: 사용자 인증 기능 추가

JWT 토큰 기반 인증 시스템 구현

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

## 주의사항

1. **한글 필수**: 영문 커밋 메시지 금지
2. **타입 필수**: 커밋 타입 없이 메시지만 작성 금지
3. **스코프 생략**: 복잡성을 줄이기 위해 스코프 사용 안 함
4. **atomic commit**: 하나의 커밋은 하나의 논리적 변경

## Reference

프로젝트 전체 가이드는 `../common/SKILL.md` 참조
