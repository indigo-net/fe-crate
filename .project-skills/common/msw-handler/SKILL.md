---
name: msw-handler
description: "Use this skill when working with MSW handlers. Triggers include: 'msw', 'mock api', 'api handler', 'mock server', adding new API endpoints to mock, or when modifying src/shared/lib/msw/ directory."
---

# MSW Handler 작성 가이드

MSW(Mock Service Worker) 핸들러를 작성할 때 따라야 할 패턴과 규칙입니다.

## 파일 구조

```text
src/shared/lib/msw/
├── handlers/
│   ├── index.ts                # 핸들러 집계
│   └── {domain}.handler.ts     # 도메인별 핸들러
├── fixtures/
│   ├── index.ts                # Fixture 집계
│   └── {domain}.fixture.ts     # 도메인별 mock 데이터
├── utils/
│   ├── index.ts
│   ├── response.util.ts        # MockResponseManager 클래스
│   ├── delay.util.ts           # MockDelayManager 클래스
│   └── error.util.ts           # MockErrorSimulator 클래스
├── errors/
│   └── error-codes.ts          # 에러 코드 상수
├── browser.ts
└── index.ts
```

## 핸들러 작성 패턴

### 1. 기본 핸들러 구조

```typescript
import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { dataStore } from '../fixtures';
import { MockDelayManager, MockErrorSimulator, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const domainHandlers = [
  http.get(`${API_PREFIX}/resource`, async () => {
    await MockDelayManager.random('normal');

    // 랜덤 에러 (1/50 확률)
    const randomError = MockErrorSimulator.maybeError('SERVICE_UNAVAILABLE');
    if (randomError) return randomError;

    return MockResponseManager.success(dataStore);
  }),
];
```

### 2. MockResponseManager 사용

```typescript
// 성공 응답
return MockResponseManager.success(data);
return MockResponseManager.success(data, { status: 201 });
return MockResponseManager.success(data, {
  pagination: { page: 1, limit: 10, total: 100 }
});

// 에러 응답
return MockResponseManager.error('FORM_NOT_FOUND');
return MockResponseManager.error('VALIDATION_ERROR', { field: 'title' });
```

### 3. MockDelayManager 사용

```typescript
// 프리셋 사용
await MockDelayManager.random('fast');    // 50-150ms
await MockDelayManager.random('normal');  // 150-300ms (기본값)
await MockDelayManager.random('slow');    // 300-500ms

// 커스텀 범위
await MockDelayManager.random({ min: 100, max: 500 });

// 프리셋 조회
const presets = MockDelayManager.getPresets();
```

### 4. MockErrorSimulator 사용

```typescript
// 1/50 확률로 에러 발생
const randomError = MockErrorSimulator.maybeError('SERVICE_UNAVAILABLE');
if (randomError) return randomError;

// 커스텀 확률 (10%)
const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR', 0.1);
if (randomError) return randomError;

// 기본 확률 조회
const defaultProb = MockErrorSimulator.getDefaultProbability(); // 0.02
```

## Fixture 작성 패턴

### 1. 기본 Fixture 구조

```typescript
export interface DataFixture {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const dataFixture: DataFixture[] = [
  {
    id: 'data-1',
    name: '샘플 데이터',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

// In-memory store (mutation용)
export const dataStore = [...dataFixture];

// Store 초기화 함수
export function resetDataStore(): void {
  dataStore.length = 0;
  dataStore.push(...dataFixture);
}
```

### 2. Fixture 연관 관계

```typescript
// 다른 도메인과 연결된 데이터는 ID 참조
export interface ChildFixture {
  id: string;
  parentId: string;  // 부모 도메인 ID 참조
  // ...
}
```

## 새 에러 코드 추가

`errors/error-codes.ts`에 에러 코드 추가:

```typescript
export const ErrorCodes = {
  // ...existing codes
  NEW_ERROR_CODE: {
    code: 'NEW_ERROR_CODE',
    status: 400,  // HTTP 상태 코드
    message: '사용자에게 표시할 메시지',
  },
} as const;
```

## 새 핸들러 등록

`handlers/index.ts`에 새 핸들러 추가:

```typescript
import { newDomainHandlers } from './new-domain.handler';

export const handlers = [
  // ...existing handlers
  ...newDomainHandlers,
];
```

## API 설계 규칙

### URL 패턴

- 버전 프리픽스: `/api/v1/`
- 리소스 복수형: `/forms`, `/questions`
- 중첩 리소스: `/forms/:formId/questions`
- 액션: `/forms/:formId/publish` (POST)

### HTTP 메서드

| 메서드 | 용도 | 예시 |
|--------|------|------|
| GET | 조회 | `/forms`, `/forms/:id` |
| POST | 생성, 액션 | `/forms`, `/forms/:id/publish` |
| PATCH | 부분 수정 | `/forms/:id` |
| DELETE | 삭제 | `/forms/:id` |

### 응답 형식

```typescript
// 성공
{
  success: true,
  data: T,
  meta: {
    timestamp: string,
    pagination?: { page, limit, total, totalPages }
  }
}

// 에러
{
  success: false,
  error: {
    code: string,      // 머신 리더블
    status: number,    // HTTP 상태
    message: string,   // 사람 리더블
    details?: object
  },
  meta: {
    timestamp: string,
    requestId: string
  }
}
```

## 체크리스트

- [ ] Fixture 타입 정의 및 mock 데이터 작성
- [ ] `fixtures/index.ts`에 export 추가
- [ ] 핸들러 파일 생성 (`{domain}.handler.ts`)
- [ ] `handlers/index.ts`에 핸들러 등록
- [ ] 필요시 에러 코드 추가
- [ ] 랜덤 지연 적용 (`MockDelayManager.random`)
- [ ] 에러 케이스별 랜덤 에러 적용 (`MockErrorSimulator.maybeError`)
