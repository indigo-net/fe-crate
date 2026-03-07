---
name: pr-feedback-commit
description: "Use when responding to PR review feedback. Triggers include: '/pr-feedback', '피드백 반영', '리뷰 대응', '피드백 커밋', or when user wants to address unresolved review comments. Do NOT use for creating new reviews."
---

# PR 피드백 대응 스킬

## 목적

미해결 PR 리뷰 피드백에 대해 코드를 수정하거나 "수정 없음" 코멘트를 남깁니다. 각 피드백을 분석하여 적절히 대응합니다.

## 트리거

- `/pr-feedback`
- `피드백 반영`, `피드백 커밋`
- `리뷰 대응`, `리뷰 피드백`
- PR 번호와 함께 피드백 처리 요청

## 공통 코멘트 템플릿

모든 피드백 대응은 아래 형식을 따릅니다:

```markdown
> **원문 피드백**
> {original_feedback_content}

### ✅ 반영 완료 / ⏭️ 수정 없음

{description_of_changes_or_reason}
```

### 상태 아이콘

| 아이콘 | 의미 | 사용 시점 |
|--------|------|-----------|
| ✅ 반영 완료 | 피드백 반영함 | 코드를 수정한 경우 |
| ⏭️ 수정 없음 | 변경하지 않음 | 피드백이 부적절하거나 불필요한 경우 |

## 워크플로우

### 1. 미해결 피드백 수집

```bash
# PR 코멘트 확인
gh pr view {number} --comments

# 리뷰 코멘트 상세 조회
gh api repos/{owner}/{repo}/pulls/{number}/comments

# 미해결 리뷰 스레드 확인
gh api repos/{owner}/{repo}/pulls/{number}/review_requests
```

### 2. 각 피드백 분석

피드백을 읽고 다음 중 하나로 분류:

| 분류 | 액션 |
|------|------|
| **반영 필요** | 코드 수정 → 커밋 → 코멘트 |
| **불필요** | "수정 없음" 코멘트만 |
| **애매함** | AskUserQuestion으로 질문 |

### 3. 피드백 대응

#### ✅ 반영 완료

1. 코드 수정
2. 커밋 (메시지에 피드백 출처 명시)
3. 코멘트 작성:

```markdown
> **원문 피드백**
> 페이지네이션 파라미터가 하드코딩되어 있습니다. 호출부에서 조절할 수 있도록 props로 받는 것이 좋겠습니다.

### ✅ 반영 완료

`limit` 파라미터를 호출부에서 전달받도록 변경했습니다.

```typescript
// 변경 전
async function getApplications() {
  return api.get('/applications?limit=10');
}

// 변경 후
async function getApplications(limit: number = 10) {
  return api.get(`/applications?limit=${limit}`);
}
```
```

#### ⏭️ 수정 없음

```markdown
> **원문 피드백**
> 이 함수는 너무 복잡합니다. 분리하는 것이 좋겠습니다.

### ⏭️ 수정 없음

현재 로직이 하나의 트랜잭션으로 처리되어야 해서 분리가 어렵습니다. 함수 내부에 주석으로 각 단계를 명확히 설명하는 것으로 대체했습니다. 추후 리팩토링 시 검토하겠습니다.
```

### 4. 커밋 메시지 규칙

피드백 반영 커밋은 구체적인 수정 내용을 명시:

```bash
# ❌ 좋지 않은 예
git commit -m "fix: 리뷰 피드백 반영"

# ✅ 좋은 예
git commit -m "fix: CodeRabbit 리뷰 반영 - 중앙화된 타입 import로 변경"
git commit -m "refactor: 팀 리뷰 반영 - 페이징 파라미터 props화"
```

## GitHub API로 코멘트 작성

### PR 코멘트 (일반)

```bash
gh api repos/{owner}/{repo}/issues/{number}/comments \
  -f body="{comment_body}"
```

### 리뷰 스레드 답글

```bash
gh api repos/{owner}/{repo}/pulls/{number}/comments/{comment_id}/replies \
  -f body="{reply_body}"
```

## 판단 가이드

### 반영이 필요한 경우

- 명확한 버그 지적
- FSD 아키텍처 위반
- 보안 문제
- 성능 개선 제안 (구체적인 근거 있음)
- 타입 안전성 문제

### 수정 없음이 적절한 경우

- 주관적 스타일 선호
- 현재 구현이 의도적
- 우선순위가 낮은 개선
- 변경 비용 > 이득
- 오해에서 비롯된 피드백

### 질문이 필요한 경우

- 피드백 의도가 불명확
- 여러 해석 가능
- 큰 변경이 필요한 제안
- 사용자의 의도 확인 필요

## 예시 시나리오

### 시나리오 1: 버그 수정

**피드백**: "null 체크가 누락되었습니다"

**대응**:
1. 코드에서 null 체크 추가
2. 커밋: `fix: 리뷰 반영 - null 체크 추가`
3. 코멘트:
```markdown
> **원문 피드백**
> null 체크가 누락되었습니다

### ✅ 반영 완료

Optional chaining과 nullish coalescing으로 안전하게 처리했습니다.
```

### 시나리오 2: 아키텍처 제안 거절

**피드백**: "이 로직을 커스텀 훅으로 분리하세요"

**대응**:
```markdown
> **원문 피드백**
> 이 로직을 커스텀 훅으로 분리하세요

### ⏭️ 수정 없음

현재 컴포넌트에서만 사용되는 로직이라 분리하지 않았습니다. 다른 컴포넌트에서도 동일한 로직이 필요해지면 그때 `useXxx` 훅으로 분리하겠습니다.
```

### 시나리오 3: 애매한 피드백

**피드백**: "이 코드를 개선하세요"

**대응**: 사용자에게 질문
```typescript
AskUserQuestion({
  questions: [{
    question: "이 피드백에 대해 어떻게 대응하시겠습니까?",
    header: "피드백 대응",
    options: [
      { label: "리팩토링", description: "코드를 개선하여 반영" },
      { label: "수정 없음", description: "현재 유지하며 사유 코멘트" },
      { label: "질문", description: "피드백 작성자에게 질문" }
    ]
  }]
})
```

## 주의사항

1. **모든 피드백에 응답**: 미해결 피드백을 남기지 않음
2. **정중한 톤**: "수정 없음"도 존중하는 언어로
3. **근거 제시**: 왜 반영/미반영 했는지 명확히
4. **커밋 분리**: 각 피드백은 별도 커밋으로 (관련된 것끼리는 묶어도 됨)

## 관련 스킬

- `pr-review-comment`: 새로운 리뷰 코멘트를 남길 때 사용
- `commit`: 커밋 메시지 작성 가이드
