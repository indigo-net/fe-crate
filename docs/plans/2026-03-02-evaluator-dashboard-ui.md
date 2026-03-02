# 평가자 대시보드 UI 구현 계획

**Goal:** 평가자가 자신에게 배분된 지원서를 확인하고 평가할 수 있는 대시보드 UI 구현

**Architecture:** pages + widgets 레벨만 사용. Mock 데이터는 hook.ts에서 관리. 향후 features/entities 분리는 TODO 주석으로 표시.

**Tech Stack:** React 19, TypeScript, TailwindCSS v4, React Router 7

**설계 문서:** `docs/plans/2026-03-02-evaluator-dashboard-ui.md`

---

## Task 1: widgets/evaluator-dashboard 기본 구조 생성

**Files:**
- Create: `src/widgets/evaluator-dashboard/ui/index.ts`

**Step 1: widgets export 파일 생성**

```typescript
// src/widgets/evaluator-dashboard/ui/index.ts
export { default as EvaluationSummary } from './EvaluationSummary';
export { default as ApplicantList } from './ApplicantList';
export { default as EvaluationProgress } from './EvaluationProgress';
```

**Step 2: 커밋**

```bash
git add src/widgets/evaluator-dashboard/ui/index.ts
git commit -m "chore: widgets/evaluator-dashboard 기본 구조 생성"
```

---

## Task 2: EvaluationSummary 컴포넌트 구현

**Files:**
- Create: `src/widgets/evaluator-dashboard/ui/EvaluationSummary/index.tsx`

**Step 1: EvaluationSummary 컴포넌트 작성**

```tsx
// src/widgets/evaluator-dashboard/ui/EvaluationSummary/index.tsx
import { memo } from 'react';

import { Iconography } from '@/shared/ui';

interface Props {
  totalAssigned: number;
  completedCount: number;
  progressPercent: number;
}

const EvaluationSummary = memo(({ totalAssigned, completedCount, progressPercent }: Props) => {
  const pendingCount = totalAssigned - completedCount;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 배분된 지원서 */}
      <article className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm">
        <header className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-slim-xl bg-brand-primary/10 flex items-center justify-center">
            <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
          </div>
          <h3 className="text-sm font-slim-semibold text-text-secondary">배분된 지원서</h3>
        </header>
        <p className="text-3xl font-slim-bold text-text-primary">{totalAssigned}</p>
      </article>

      {/* 완료된 평가 */}
      <article className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm">
        <header className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-slim-xl bg-neon-green-500/10 flex items-center justify-center">
            <Iconography.Stroke.Graduation className="w-5 h-5 text-neon-green-600" />
          </div>
          <h3 className="text-sm font-slim-semibold text-text-secondary">완료된 평가</h3>
        </header>
        <p className="text-3xl font-slim-bold text-text-primary">
          {completedCount}
          <span className="text-sm font-slim-normal text-text-tertiary ml-2">
            / {totalAssigned}
          </span>
        </p>
      </article>

      {/* 진행률 */}
      <article className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm">
        <header className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-slim-xl bg-brand-secondary/10 flex items-center justify-center">
            <Iconography.Stroke.Target className="w-5 h-5 text-brand-secondary" />
          </div>
          <h3 className="text-sm font-slim-semibold text-text-secondary">진행률</h3>
        </header>
        <div className="space-y-2">
          <p className="text-3xl font-slim-bold text-text-primary">{progressPercent}%</p>
          <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </article>
    </section>
  );
});

EvaluationSummary.displayName = 'EvaluationSummary';

export default EvaluationSummary;
```

**Step 2: 커밋**

```bash
git add src/widgets/evaluator-dashboard/ui/EvaluationSummary/index.tsx
git commit -m "feat: EvaluationSummary 컴포넌트 구현"
```

---

## Task 3: EvaluationProgress 컴포넌트 구현

**Files:**
- Create: `src/widgets/evaluator-dashboard/ui/EvaluationProgress/index.tsx`

**Step 1: EvaluationProgress 컴포넌트 작성**

```tsx
// src/widgets/evaluator-dashboard/ui/EvaluationProgress/index.tsx
import { memo } from 'react';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
type FilterType = EvaluationStatusType | 'ALL';

interface Props {
  progressPercent: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

// TODO: StatusFilterTab을 features/evaluate-applicant로 분리
const EvaluationProgress = memo(
  ({ progressPercent, currentFilter, onFilterChange, counts }: Props) => {
    const filters: { key: FilterType; label: string; count: number }[] = [
      { key: 'ALL', label: '전체', count: counts.all },
      { key: 'PENDING', label: '대기 중', count: counts.pending },
      { key: 'COMPLETED', label: '완료', count: counts.completed },
    ];

    return (
      <section className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm space-y-6">
        {/* 진행률 바 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-slim-semibold text-text-secondary">전체 평가 진행률</span>
            <span className="font-slim-bold text-brand-primary">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-neon-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-4 py-2 rounded-slim-lg text-sm font-slim-semibold transition-all ${
                currentFilter === filter.key
                  ? 'bg-brand-primary text-text-inverse'
                  : 'bg-bg-subtle text-text-secondary hover:bg-bg-subtle/80'
              }`}
            >
              {filter.label}
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-slim-md text-xs ${
                  currentFilter === filter.key
                    ? 'bg-white/20'
                    : 'bg-border-default text-text-tertiary'
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </section>
    );
  },
);

EvaluationProgress.displayName = 'EvaluationProgress';

export default EvaluationProgress;
```

**Step 2: 커밋**

```bash
git add src/widgets/evaluator-dashboard/ui/EvaluationProgress/index.tsx
git commit -m "feat: EvaluationProgress 컴포넌트 구현"
```

---

## Task 4: ApplicantList 컴포넌트 구현

**Files:**
- Create: `src/widgets/evaluator-dashboard/ui/ApplicantList/index.tsx`

**Step 1: ApplicantList 컴포넌트 작성**

```tsx
// src/widgets/evaluator-dashboard/ui/ApplicantList/index.tsx
import { memo } from 'react';

import { Iconography } from '@/shared/ui';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

// TODO: ApplicantData를 entities/evaluation/model/applicant-model.ts로 분리
interface ApplicantData {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatusType;
}

interface Props {
  applicants: ApplicantData[];
  onStartEvaluation: (id: string) => void;
}

const STATUS_CONFIG: Record<
  EvaluationStatusType,
  { label: string; className: string }
> = {
  PENDING: {
    label: '대기 중',
    className: 'bg-bg-subtle text-text-tertiary border-border-default',
  },
  IN_PROGRESS: {
    label: '평가 중',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  COMPLETED: {
    label: '완료',
    className: 'bg-neon-green-500/10 text-neon-green-600 border-neon-green-500/20',
  },
};

// TODO: 개별 행(ApplicantCard)을 features/evaluate-applicant로 분리
const ApplicantList = memo(({ applicants, onStartEvaluation }: Props) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="bg-bg-base border border-border-default rounded-slim-2xl shadow-sm overflow-hidden">
      <header className="px-6 py-4 border-b border-border-default bg-bg-subtle">
        <h2 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
          지원서 목록
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-default text-xs font-slim-bold text-text-secondary uppercase tracking-wider">
              <th className="px-6 py-4">지원자명</th>
              <th className="px-6 py-4">제출일시</th>
              <th className="px-6 py-4">평가 상태</th>
              <th className="px-6 py-4 text-right">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {applicants.map(applicant => {
              const statusConfig = STATUS_CONFIG[applicant.status];

              return (
                <tr key={applicant.id} className="hover:bg-bg-subtle/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-slim-semibold text-text-primary">{applicant.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {formatDate(applicant.submittedAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-slim-full text-xs font-slim-bold border ${statusConfig.className}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {applicant.status === 'PENDING' && (
                      <button
                        onClick={() => onStartEvaluation(applicant.id)}
                        className="px-4 py-2 bg-brand-primary text-text-inverse text-sm font-slim-semibold rounded-slim-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        평가 시작
                      </button>
                    )}
                    {applicant.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => onStartEvaluation(applicant.id)}
                        className="px-4 py-2 bg-warning/10 text-warning text-sm font-slim-semibold rounded-slim-lg border border-warning/20 hover:bg-warning/20 transition-all"
                      >
                        이어서 평가
                      </button>
                    )}
                    {applicant.status === 'COMPLETED' && (
                      <button className="px-4 py-2 bg-bg-subtle text-text-tertiary text-sm font-slim-semibold rounded-slim-lg border border-border-default">
                        결과 보기
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {applicants.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Iconography.Stroke.Document className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">배분된 지원서가 없습니다.</p>
        </div>
      )}
    </section>
  );
});

ApplicantList.displayName = 'ApplicantList';

export default ApplicantList;
```

**Step 2: 커밋**

```bash
git add src/widgets/evaluator-dashboard/ui/ApplicantList/index.tsx
git commit -m "feat: ApplicantList 컴포넌트 구현"
```

---

## Task 5: PageEvaluatorDashboard hook 구현

**Files:**
- Create: `src/pages/ui/PageEvaluatorDashboard/hook.ts`

**Step 1: hook.ts 작성 (Mock 데이터 포함)**

```typescript
// src/pages/ui/PageEvaluatorDashboard/hook.ts
import { useState, useMemo } from 'react';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
type FilterType = EvaluationStatusType | 'ALL';

// TODO: ApplicantData를 entities/evaluation/model/applicant-model.ts로 분리
interface ApplicantData {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatusType;
}

const usePageEvaluatorDashboardController = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');

  // Mock 데이터
  const allApplicants = useMemo<ApplicantData[]>(
    () => [
      { id: '1', name: '김철수', submittedAt: '2026-03-01T14:30:00Z', status: 'PENDING' },
      { id: '2', name: '이영희', submittedAt: '2026-03-01T15:00:00Z', status: 'IN_PROGRESS' },
      { id: '3', name: '박지성', submittedAt: '2026-03-01T16:00:00Z', status: 'COMPLETED' },
      { id: '4', name: '최유진', submittedAt: '2026-03-02T09:00:00Z', status: 'PENDING' },
      { id: '5', name: '정민호', submittedAt: '2026-03-02T10:30:00Z', status: 'PENDING' },
      { id: '6', name: '한소희', submittedAt: '2026-03-02T11:00:00Z', status: 'COMPLETED' },
      { id: '7', name: '오세훈', submittedAt: '2026-03-02T13:00:00Z', status: 'IN_PROGRESS' },
      { id: '8', name: '강다니엘', submittedAt: '2026-03-02T14:30:00Z', status: 'PENDING' },
    ],
    [],
  );

  // 필터링된 지원서
  const filteredApplicants = useMemo(() => {
    if (currentFilter === 'ALL') return allApplicants;
    return allApplicants.filter(a => a.status === currentFilter);
  }, [allApplicants, currentFilter]);

  // 통계
  const summary = useMemo(() => {
    const totalAssigned = allApplicants.length;
    const completedCount = allApplicants.filter(a => a.status === 'COMPLETED').length;
    const pendingCount = allApplicants.filter(
      a => a.status === 'PENDING' || a.status === 'IN_PROGRESS',
    ).length;
    const progressPercent = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

    return { totalAssigned, completedCount, pendingCount, progressPercent };
  }, [allApplicants]);

  // 필터 카운트
  const filterCounts = useMemo(
    () => ({
      all: allApplicants.length,
      pending: allApplicants.filter(a => a.status === 'PENDING' || a.status === 'IN_PROGRESS')
        .length,
      completed: allApplicants.filter(a => a.status === 'COMPLETED').length,
    }),
    [allApplicants],
  );

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const handleStartEvaluation = (id: string) => {
    // TODO: 평가 페이지로 이동 또는 평가 모달 열기
    console.log('Start evaluation for:', id);
  };

  return {
    currentFilter,
    filteredApplicants,
    summary,
    filterCounts,
    handleFilterChange,
    handleStartEvaluation,
  };
};

export default usePageEvaluatorDashboardController;
```

**Step 2: 커밋**

```bash
git add src/pages/ui/PageEvaluatorDashboard/hook.ts
git commit -m "feat: PageEvaluatorDashboard hook 구현 (Mock 데이터)"
```

---

## Task 6: PageEvaluatorDashboard 페이지 컴포넌트 구현

**Files:**
- Create: `src/pages/ui/PageEvaluatorDashboard/index.tsx`

**Step 1: PageEvaluatorDashboard 컴포넌트 작성**

```tsx
// src/pages/ui/PageEvaluatorDashboard/index.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';
import {
  EvaluationSummary,
  EvaluationProgress,
  ApplicantList,
} from '@/widgets/evaluator-dashboard/ui';

import usePageEvaluatorDashboardController from './hook';

const PageEvaluatorDashboard = memo(() => {
  const {
    currentFilter,
    filteredApplicants,
    summary,
    filterCounts,
    handleFilterChange,
    handleStartEvaluation,
  } = usePageEvaluatorDashboardController();

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default">
        <Link to="/" aria-label="CRATE 홈" className="flex items-center gap-6 group">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight group-hover:text-brand-primary transition-colors">
              CRATE
            </span>
          </div>
          <div className="h-6 w-px bg-border-default hidden sm:block" />
          <h1 className="text-lg font-slim-semibold text-text-secondary hidden sm:block">
            평가자 대시보드
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <DarkModeButton />
          <div className="h-6 w-px bg-border-default mx-2" />
          <section className="flex items-center gap-3 pl-2" aria-label="사용자 프로필">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
              <Iconography.Stroke.Users className="w-6 h-6" />
            </div>
            <div className="hidden desktop:block leading-tight">
              <p className="text-sm font-slim-bold mb-0.5">평가자</p>
              <p className="text-[11px] text-text-tertiary">evaluator@crate.io</p>
            </div>
          </section>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 bg-bg-subtle/30 overflow-y-auto px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Summary Cards */}
          <EvaluationSummary
            totalAssigned={summary.totalAssigned}
            completedCount={summary.completedCount}
            progressPercent={summary.progressPercent}
          />

          {/* Progress & Filter */}
          <EvaluationProgress
            progressPercent={summary.progressPercent}
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            counts={filterCounts}
          />

          {/* Applicant List */}
          <ApplicantList
            applicants={filteredApplicants}
            onStartEvaluation={handleStartEvaluation}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-border-default bg-bg-base">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[11px] text-text-tertiary font-slim-normal">
          <p>© 2025 CRATE by indigo-net. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green-500" />
              시스템 정상 운영 중
            </span>
            <span className="tabular-nums">v1.2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

PageEvaluatorDashboard.displayName = 'PageEvaluatorDashboard';

export default PageEvaluatorDashboard;
```

**Step 2: 커밋**

```bash
git add src/pages/ui/PageEvaluatorDashboard/index.tsx
git commit -m "feat: PageEvaluatorDashboard 페이지 컴포넌트 구현"
```

---

## Task 7: 라우트 및 export 추가

**Files:**
- Modify: `src/pages/ui/index.tsx`
- Modify: `src/app/ui/index.tsx`

**Step 1: pages export 추가**

```tsx
// src/pages/ui/index.tsx - export 추가
export { default as PageEvaluatorDashboard } from './PageEvaluatorDashboard';
```

**Step 2: 라우트 추가**

```tsx
// src/app/ui/index.tsx - import 및 Route 추가
import { PageEvaluatorDashboard } from '@/pages/ui';

// Routes 내부에 추가
<Route path="/evaluator/dashboard" element={<PageEvaluatorDashboard />} />
```

**Step 3: 커밋**

```bash
git add src/pages/ui/index.tsx src/app/ui/index.tsx
git commit -m "feat: /evaluator/dashboard 라우트 추가"
```

---

## Task 8: 개발 서버에서 검증

**Step 1: 개발 서버 실행**

```bash
pnpm dev
```

**Step 2: 브라우저에서 확인**

- `http://localhost:5173/evaluator/dashboard` 접속
- 평가 현황 카드 3개 렌더링 확인
- 필터 탭 클릭 시 지원서 목록 필터링 확인
- 평가 시작/이어서 평가/결과 보기 버튼 확인

**Step 3: 빌드 검증**

```bash
pnpm build
```

Expected: 빌드 성공, 에러 없음

---

## 완료 조건 체크리스트

- [ ] 평가 현황 카드 정상 렌더링
- [ ] 지원서 리스트 테이블 동작
- [ ] 필터 탭 동작
- [ ] `/evaluator/dashboard` 라우트 추가
- [ ] 빌드 성공
