---
name: shared-layer
description: "Use this skill when working on the Shared layer of the FSD architecture. Triggers include: 'shared layer', 'utility', 'AxiosManager', 'EnvManager', 'TypeGuard', 'UUID', 'CustomModel', 'Modal', 'Alert', 'Toast', 'Iconography', or when modifying src/shared/ directory. Also use when creating reusable utilities or base UI components. Do NOT use for domain-specific logic or business models."
---

> **원본 경로**: `.project-skills/shared/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# Shared Layer Guide

## Overview

`shared` 레이어는 앱 전체에서 사용되는 유틸리티, 기반 컴포넌트, 기초 코드. 슬라이스 없이 세그먼트로 직접 구성.

## Quick Reference

| Task | Location |
|------|----------|
| 유틸리티 클래스 | `shared/lib/` |
| 기반 UI 컴포넌트 | `shared/ui/` |
| 기반 모델 클래스 | `shared/model/` |
| HTTP 클라이언트 | `AxiosManager.getAxiosInstance()` |
| 환경변수 | `EnvManager.getAppEnv(key)` |
| 타입 체크 | `TypeGuard.checkNull(value)` |
| UUID 생성 | `UUID.v4()` |
| 로깅 | `DeveloperConsole.log({ message, data, location })` |
| 날짜 파싱 | `DateStandard.fromISO(isoString)` |
| URL 빌드 | `CustomSearchParams.buildURL(path, params)` |
| 파일 구조 확인 | `/.project-skills/shared/STRUCTURE.md` 참조 |

## shared vs domain 모듈 판단

| 범위 | 위치 | 예시 |
|------|------|------|
| 하나의 도메인에서만 사용 | `entities/(domain)/lib/` | `QuestionStateService` |
| 여러 도메인에서 사용 | `shared/lib/` | `TypeGuard`, `UUID` |
| 도메인 모델 | `entities/(domain)/model/` | `FormQuestionModel` |
| 모든 모델의 기반 클래스 | `shared/model/` | `CustomModel` |

## shared/lib 주요 모듈

### 유틸리티 클래스

```typescript
// HTTP 클라이언트
import { AxiosManager } from '@/shared/lib';
const axios = AxiosManager.getAxiosInstance();

// 환경변수
const apiUrl = EnvManager.getAppEnv('VITE_API_BASE_URL');

// 타입 가드
if (TypeGuard.checkNull(value)) { /* null 처리 */ }
if (TypeGuard.checkUndefined(value)) { /* undefined 처리 */ }

// UUID
const id = UUID.v4();

// URL 빌드 (쿼리스트링)
const url = CustomSearchParams.buildURL('/api/v1/forms', { status: 'PUBLISHED' });

// 날짜 (ISO 문자열 파싱 시 new Date() 대신)
const date = DateStandard.fromISO(isoString);
```

### 로깅 — console.log 대신 DeveloperConsole

```typescript
// ✅ ILog 객체 사용
DeveloperConsole.log({ message: 'Action completed', data: { id: 123 }, location: 'Component/hook.ts' });

// ❌ 문자열 인자 사용 금지
console.log('Action completed');
```

### IndexedDB 관리

```typescript
import { IndexedDBManager } from '@/shared/lib';

await IndexedDBManager.open({ name: 'db', version: 1, onUpgrade: db => { /* ... */ } });
await IndexedDBManager.put(storeName, key, value);
const data = await IndexedDBManager.get<T>(storeName, key);
await IndexedDBManager.delete(storeName, key);
```

## shared/model

도메인 모델이 상속하는 기반 클래스만:

```typescript
abstract class CustomModel<T> {
  abstract toJSON(): T;
  abstract clone(props?: Partial<T>): CustomModel<T>;
}
```

도메인 모델은 반드시 `entities/*/model/`에 위치.

## shared/ui

앱 전체에서 사용하는 기반 UI 컴포넌트:

| 카테고리 | 컴포넌트 |
|----------|----------|
| 레이아웃 | Modal, Alert, Toast |
| 폼 | Radio |
| 아이콘 | `Iconography.Stroke.*`, `Iconography.Logo.*` |

## MSW & HTTP 응답 패턴

- AxiosManager 인터셉터가 MSW 래핑 응답(`{ success: true, data, meta }`)의 `data`를 자동 추출
- API 함수에서 `response.data`를 반환하면 래핑 없이 순수 데이터가 반환됨
- 에러 응답(`success: false`)은 래핑 해제하지 않음

## Reference

파일 구조: `/.project-skills/shared/STRUCTURE.md` 참조.
