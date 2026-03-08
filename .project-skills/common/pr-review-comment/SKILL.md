---
name: pr-review-comment
description: "Use when the user wants to leave code review comments on a PR. Triggers include: '/pr-review', 'pr 리뷰', '리뷰 코멘트', '코드 리뷰', or when user provides a PR number and asks for review. Do NOT use for committing changes or responding to feedback."
---

# PR 리뷰 코멘트 스킬

## 목적

지정된 PR에 대해 코드 리뷰 코멘트를 남깁니다. 코드 품질, 잠재적 버그, 아키텍처 제안 등을 리뷰합니다.

## 트리거

- `/pr-review`
- `pr 리뷰`, `PR 리뷰`
- `리뷰 코멘트`
- `코드 리뷰`
- PR 번호와 함께 리뷰 요청

## 워크플로우

### 1. PR 정보 수집

```bash
# PR 기본 정보 및 변경 파일 확인
gh pr view {number} --json title,body,files,additions,deletions,headRefName

# 코드 변경사항 확인
gh pr diff {number}
```

### 2. 코드 리뷰 수행

다음 항목들을 중점적으로 리뷰:

- **버그/로직 오류**: 논리적 오류, 엣지 케이스 미처리
- **아키텍처**: FSD 레이어 위반, 의존성 방향 오류
- **코드 품질**: 중복 코드, 가독성, 네이밍
- **보안**: XSS, 인젝션, 민감 정보 노출
- **성능**: 불필요한 리렌더링, N+1 쿼리
- **타입 안전성**: any 사용, 타입 단언 남용

### 3. 리뷰 코멘트 작성

GitHub Review Comment API 사용:

```bash
# PR의 HEAD 커밋 ID 가져오기
PR_HEAD=$(gh pr view {number} --json headRefOid --jq '.headRefOid')

# 리뷰 생성 (JSON 파일로 관리)
cat > review.json << 'EOF'
{
  "commit_id": "COMMIT_ID_PLACEHOLDER",
  "body": "## 리뷰 요약\n\n전반적으로 잘 작성된 코드입니다.",
  "event": "COMMENT",
  "comments": [
    {
      "path": "src/file.ts",
      "line": 42,
      "body": "### 💡 제안\n\n제안 내용..."
    }
  ]
}
EOF

# 커밋 ID 치환 후 API 호출
sed -i '' "s/COMMIT_ID_PLACEHOLDER/$PR_HEAD/" review.json
gh api repos/{owner}/{repo}/pulls/{number}/reviews --input @review.json
rm review.json
```

### 에러 처리

```bash
# API 호출 실패 시
if ! gh api repos/{owner}/{repo}/pulls/{number}/reviews --input @review.json 2>/dev/null; then
  echo "❌ 리뷰 생성 실패. GitHub API 권한을 확인하세요."
  echo "   필요 권한: repo 스코프"
  exit 1
fi
```

### 4. 코멘트 형식

#### 인라인 코멘트 (특정 라인)

```markdown
### 💡 제안

{제안 내용}

**이유**: {왜 이 변경이 필요한지}
```

#### 요약 코멘트 (PR 전체)

```markdown
## 리뷰 요약

### 🎯 주요 발견 사항

1. {발견 사항 1}
2. {발견 사항 2}

### ✅ 잘 작성된 부분

- {칭찬할 점}

### ⚠️ 수정 제안

- {수정이 필요한 부분}
```

## 코멘트 타입 가이드

### 🐛 버그

```markdown
### 🐛 잠재적 버그

{버그 설명}

**영향**: {어떤 문제가 발생할 수 있는지}
**해결 방안**: {수정 제안}
```

### 💡 제안

```markdown
### 💡 제안

{제안 내용}

현재 동작에는 문제가 없지만, {개선 이유}.
```

### ❓ 질문

```markdown
### ❓ 질문

{이해가 안 되는 부분}

이 부분의 의도를 설명해 주시겠어요?
```

### ✅ 칭찬

```markdown
### ✅ 좋은 구현

{칭찬할 부분}

깔끔하게 작성되었습니다!
```

## 주의사항

1. **건설적인 톤**: 비판이 아닌 개선 제안
2. **구체적인 근거**: "이상하다"가 아닌 왜 문제인지 설명
3. **코드 예시 포함**: 가능하면 개선된 코드 예시 제공
4. **우선순위 표시**: 치명적인 문제와 스타일 제안 구분

## 예시

### 버그 리뷰

```bash
# PR HEAD 커밋 ID 가져오기
PR_HEAD=$(gh pr view 123 --json headRefOid --jq '.headRefOid')

# 리뷰 JSON 생성
cat > review.json << 'EOF'
{
  "commit_id": "COMMIT_ID_PLACEHOLDER",
  "body": "## 리뷰 요약\n\n전반적으로 잘 작성된 코드입니다.",
  "event": "COMMENT",
  "comments": [
    {
      "path": "src/entities/form/api/get-form.ts",
      "line": 25,
      "body": "### 🐛 잠재적 버그\n\n`null` 체크가 누락되었습니다.\n\n```typescript\n// 현재\nconst data = response.data.items;\n\n// 제안\nconst data = response.data?.items ?? [];\n```\n\n**영향**: API 응답이 예상과 다를 경우 런타임 에러 발생 가능"
    }
  ]
}
EOF

# 커밋 ID 치환 후 API 호출
sed -i '' "s/COMMIT_ID_PLACEHOLDER/$PR_HEAD/" review.json
gh api repos/owner/repo/pulls/123/reviews --input @review.json
rm review.json
```

## 관련 스킬

- `pr-feedback-commit`: 리뷰 피드백에 대응할 때 사용

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| 1.1.0 | 2026-03-08 | GitHub API 호출 방식 개선 - heredoc 사용, PR HEAD 커밋 ID 올바르게 획득, 에러 처리 추가 |
| 1.0.0 | 2026-03-08 | 초기 버전 - PR 리뷰 코멘트 스킬 정의 |
