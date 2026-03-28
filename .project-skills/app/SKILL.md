---
name: app-layer
description: "Use this skill when working on the App layer of the FSD architecture. Triggers include: 'app layer', 'routing', 'context provider', 'entry point', 'provider setup', or when modifying src/app/ directory. Also use when adding new routes, providers, or understanding application initialization. Do NOT use for page-level components or business logic."
---

> **원본 경로**: `.project-skills/app/SKILL.md`
> symlink 혹은 원본을 수정하여 커밋할 경우, 반드시 `.project-skills/` 내 원본 파일과 symlink 대상 파일을 함께 커밋해야 합니다.

# App Layer Guide

## Overview

`app` 레이어는 애플리케이션 진입점. 라우팅과 Context Provider를 제공. 슬라이스 없이 세그먼트로 직접 구성.

## Quick Reference

| Task | Location |
|------|----------|
| 라우트 추가 | `src/app/ui/index.tsx` |
| Context Provider 생성 | `src/app/lib/context-provider/` |
| Provider 순서 변경 | `src/app/ui/index.tsx` |
| 모달 컨텍스트 | `useModalContext` |
| 알림 컨텍스트 | `useAlertContext` |
| 토스트 컨텍스트 | `useToastContext` |
| 파일 구조 확인 | `/.project-skills/app/STRUCTURE.md` 참조 |

## App Component (현행)

```typescript
// src/app/ui/index.tsx
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AlertProvider>
            <ModalProvider>
              <Routes>
                <Route path="/" element={<PageLanding />} />
                <Route path="/kakao-authorize" element={<PageKakaoRedirect />} />
                <Route path="/dashboard" element={<PageDashboard />} />
                <Route path="/evaluator/dashboard" element={<PageEvaluatorDashboard />} />
                <Route path="/evaluation/:formId" element={<PageEvaluation />} />
                <Route path="/new-form" element={<PageNewForm />} />
                <Route path="/form/:formId" element={<PageFormDetail />} />
                <Route path="/form/:formId/apply" element={<PageFormApply />} />
                <Route path="/invite/:inviteToken" element={<PageInviteAccept />} />
              </Routes>
            </ModalProvider>
          </AlertProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
```

## Provider 중첩 순서

```
BrowserRouter > AuthProvider > ToastProvider > AlertProvider > ModalProvider
```

순서가 중요한 이유: 내부 Provider가 외부 Provider의 컨텍스트에 접근할 수 있어야 하므로.

## Context Provider 사용

### Modal — openModal + createElement

```typescript
import { useModalContext } from '@/app/lib/context-provider/ModalProvider';

const { openModal } = useModalContext();
openModal({
  id: UUID.v4(),
  title: '모달 제목',
  content: createElement(ModalComponent, { prop1 }),
});
```

### Alert — showAlert + confirmCallback

```typescript
import { useAlertContext } from '@/app/lib/context-provider/AlertProvider';

const { showAlert } = useAlertContext();
showAlert({
  id: UUID.v4(),
  title: '확인',
  content: '정말 삭제하시겠습니까?',
  confirmCallback: handleDelete,
});
```

### Toast

```typescript
import { useToastContext } from '@/app/lib/context-provider/ToastProvider';
const { showToast } = useToastContext();
```

## Routing

| 경로 | 페이지 | 비고 |
|------|--------|------|
| `/` | PageLanding | 랜딩 |
| `/kakao-authorize` | PageKakaoRedirect | OAuth 콜백 |
| `/dashboard` | PageDashboard | 관리자 대시보드 |
| `/evaluator/dashboard` | PageEvaluatorDashboard | 평가자 대시보드 |
| `/evaluation/:formId` | PageEvaluation | 평가 워크스페이스 |
| `/new-form` | PageNewForm | 폼 생성 |
| `/form/:formId` | PageFormDetail | 폼 상세 |
| `/form/:formId/apply` | PageFormApply | 지원서 작성 |
| `/invite/:inviteToken` | PageInviteAccept | 초대 수락 |

## Reference

파일 구조: `/.project-skills/app/STRUCTURE.md` 참조.
