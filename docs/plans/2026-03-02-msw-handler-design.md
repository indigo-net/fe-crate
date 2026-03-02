# CRATE-75: MSW 핸들러 기본 구조 설계

> 작성일: 2026-03-02
> 상태: 완료

## 요약

MSW 핸들러 구조 설계 및 백엔드 관점의 API 엔드포인트 정의. 구체적 타입 구현 없이 구조만 잡고, 에러 케이스 시뮬레이션(1/50 확률) 및 MSW 핸들러 Skill 작성 포함.

## 설계 결정 사항

| 항목 | 결정 |
|------|------|
| 인증 방식 | Session Cookie (MVP: 공개 API) |
| API 버전닝 | `/api/v1/*` |
| 소유권 | 공개 API (인증 없음) |
| 핸들러 구조 | Domain-Driven Organization |

## 파일 구조

```text
src/shared/lib/msw/
├── index.ts                    # MSW 진입점
├── browser.ts                  # 브라우저 워커 설정
├── handlers/
│   ├── index.ts                # 핸들러 집계
│   ├── forms.handler.ts        # Form 도메인
│   ├── questions.handler.ts    # Question 도메인
│   ├── applications.handler.ts # Application 도메인
│   ├── evaluations.handler.ts  # Evaluation 도메인
│   └── evaluators.handler.ts   # Evaluator 도메인
├── fixtures/
│   ├── index.ts                # Fixture 집계
│   ├── forms.fixture.ts        # Form mock 데이터
│   ├── questions.fixture.ts    # Question mock 데이터
│   ├── applications.fixture.ts # Application mock 데이터
│   ├── evaluations.fixture.ts  # Evaluation mock 데이터
│   └── evaluators.fixture.ts   # Evaluator mock 데이터
├── utils/
│   ├── index.ts                # 유틸 집계
│   ├── response.util.ts        # 공통 응답 래퍼
│   ├── error.util.ts           # 에러 응답 생성
│   └── delay.util.ts           # 지연 시뮬레이션
└── errors/
    └── error-codes.ts          # 표준 에러 코드
```

## API 엔드포인트

### Forms API

| Method | Endpoint | 설명 | 에러 케이스 |
|--------|----------|------|-------------|
| GET | `/api/v1/forms` | 공고 목록 조회 | 503 SERVICE_UNAVAILABLE |
| GET | `/api/v1/forms/:formId` | 공고 상세 조회 | 404 FORM_NOT_FOUND |
| POST | `/api/v1/forms` | 공고 생성 | 400 VALIDATION_ERROR |
| PATCH | `/api/v1/forms/:formId` | 공고 수정 | 409 FORM_NOT_DRAFT |
| DELETE | `/api/v1/forms/:formId` | 공고 삭제 | 403 FORBIDDEN |
| POST | `/api/v1/forms/:formId/publish` | 공고 게시 | 422 FORM_INCOMPLETE |
| POST | `/api/v1/forms/:formId/close` | 공고 조기 종료 | 409 FORM_NOT_ACTIVE |

### Questions API

| Method | Endpoint | 설명 | 에러 케이스 |
|--------|----------|------|-------------|
| GET | `/api/v1/forms/:formId/questions` | 질문 목록 조회 | 404 FORM_NOT_FOUND |
| POST | `/api/v1/forms/:formId/questions` | 질문 생성 | 409 QUESTION_LOCKED |
| PATCH | `/api/v1/questions/:questionId` | 질문 수정 | 409 QUESTION_LOCKED |
| DELETE | `/api/v1/questions/:questionId` | 질문 삭제 | 409 QUESTION_LOCKED |
| PATCH | `/api/v1/forms/:formId/questions/reorder` | 질문 순서 변경 | 400 VALIDATION_ERROR |

### Applications API

| Method | Endpoint | 설명 | 에러 케이스 |
|--------|----------|------|-------------|
| GET | `/api/v1/forms/:formId/applications` | 지원서 목록 조회 | 403 FORM_NOT_CLOSED |
| GET | `/api/v1/applications/:applicationId` | 지원서 상세 조회 | 404 APPLICATION_NOT_FOUND |
| POST | `/api/v1/forms/:formId/applications` | 지원서 제출 | 410 FORM_CLOSED |

### Evaluations API

| Method | Endpoint | 설명 | 에러 케이스 |
|--------|----------|------|-------------|
| GET | `/api/v1/forms/:formId/evaluations` | 평가 목록 조회 | 403 FORM_NOT_CLOSED |
| POST | `/api/v1/applications/:appId/evaluations` | 평가 생성 | 409 ALREADY_EVALUATED |
| PATCH | `/api/v1/evaluations/:evaluationId` | 평가 수정 | 403 NOT_ASSIGNED |

### Evaluators API

| Method | Endpoint | 설명 | 에러 케이스 |
|--------|----------|------|-------------|
| GET | `/api/v1/forms/:formId/evaluators` | 평가자 목록 조회 | 404 FORM_NOT_FOUND |
| POST | `/api/v1/forms/:formId/evaluators` | 평가자 추가 | 400 VALIDATION_ERROR |
| DELETE | `/api/v1/evaluators/:evaluatorId` | 평가자 삭제 | 409 HAS_EVALUATIONS |
| POST | `/api/v1/forms/:formId/evaluators/assign` | 지원서 배정 | 400 NO_APPLICATIONS |

## 공통 응답 형식

### 성공 응답
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta: {
    timestamp: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

### 에러 응답
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;      // 머신 리더블 코드
    status: number;    // HTTP 상태
    message: string;   // 사람 리더블 메시지
    details?: object;  // 추가 정보
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

## 에러 코드 체계

| 코드 | HTTP | 설명 |
|------|------|------|
| SERVICE_UNAVAILABLE | 503 | 서비스 일시 불가 |
| VALIDATION_ERROR | 400 | 요청 데이터 검증 실패 |
| FORBIDDEN | 403 | 권한 없음 |
| FORM_NOT_FOUND | 404 | 공고 없음 |
| FORM_NOT_DRAFT | 409 | Draft 상태 아님 |
| FORM_NOT_ACTIVE | 409 | Active 상태 아님 |
| FORM_NOT_CLOSED | 403 | Closed 상태 아님 |
| FORM_INCOMPLETE | 422 | 게시 조건 미충족 |
| FORM_CLOSED | 410 | 마감된 공고 |
| QUESTION_NOT_FOUND | 404 | 질문 없음 |
| QUESTION_LOCKED | 409 | 게시 후 수정 불가 |
| APPLICATION_NOT_FOUND | 404 | 지원서 없음 |
| ALREADY_EVALUATED | 409 | 이미 평가됨 |
| NOT_ASSIGNED | 403 | 배정되지 않음 |
| EVALUATOR_NOT_FOUND | 404 | 평가자 없음 |
| HAS_EVALUATIONS | 409 | 평가 데이터 존재 |
| NO_APPLICATIONS | 400 | 지원서 없음 |

## 유틸리티 패턴

### 응답 래퍼 (response.util.ts)
```typescript
// 성공 응답
ResponseUtil.success(data);
ResponseUtil.success(data, { status: 201 });
ResponseUtil.success(data, { pagination: { page, limit, total } });

// 에러 응답
ResponseUtil.error('FORM_NOT_FOUND');
ResponseUtil.error('VALIDATION_ERROR', { field: 'title' });
```

### 지연 시뮬레이션 (delay.util.ts)
```typescript
await DelayUtil.random('fast');    // 50-150ms
await DelayUtil.random('normal');  // 150-300ms
await DelayUtil.random('slow');    // 300-500ms
await DelayUtil.random({ min: 100, max: 500 });
```

### 에러 확률 시뮬레이션 (error.util.ts)
```typescript
// 1/50 확률로 에러 발생
const randomError = ErrorUtil.maybeError('SERVICE_UNAVAILABLE');
if (randomError) return randomError;

// 커스텀 확률
const randomError = ErrorUtil.maybeError('VALIDATION_ERROR', 0.1);
```

## 검증 방법

1. `pnpm dev` 실행
2. 브라우저 Network 탭에서 `/api/v1/forms` 호출 확인
3. 콘솔에서 MSW 로그 확인: `[MSW] ...`
4. 에러 케이스 확인: 50회 요청 중 약 1회 에러 응답

## 관련 파일

- MSW Skill: `.claude/skills/msw-handler/SKILL.md`
- 에러 코드: `src/shared/lib/msw/errors/error-codes.ts`
- 응답 유틸: `src/shared/lib/msw/utils/response.util.ts`

## 참고

- MASTER_GUIDE.md의 비즈니스 로직 기반으로 상태 전이 규칙 적용
- Form 상태: DRAFT → SCHEDULED/ACTIVE → CLOSED
- 평가는 CLOSED 상태에서만 활성화
