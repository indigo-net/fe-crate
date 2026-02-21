This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
ui/
  dashboard/
    hook.ts
    index.tsx
  kakao-redirect/
    hook.ts
    index.tsx
  landing/
    hook.ts
    index.tsx
  new-form/
    hook.ts
    index.tsx
```

# Files

## File: ui/dashboard/hook.ts
```typescript
import { useState, useMemo } from 'react';

const useDashboardPageController = () => {
  const [isEvaluatorsExpanded, setIsEvaluatorsExpanded] = useState(false);

  // Mock data for evaluators
  const allEvaluators = useMemo(
    () => [
      {
        id: 1,
        name: '슈퍼 어드민',
        email: 'super@crate.io',
        role: '총괄 운영자',
        assignedForms: Array.from({ length: 102 }, (_, i) => ({
          title: `전국 단위 통합 채용 공고 ${i + 1}차`,
          progress: Math.floor((i + 1) / 2),
        })),
        status: '과부하',
        lastActive: '방금 전',
      },
      {
        id: 2,
        name: '김철수',
        email: 'chulsoo.kim@crate.io',
        role: '수석 평가원',
        assignedForms: [
          { title: '2026 동계 개발 인턴십', progress: 85 },
          { title: '브랜드 디자인 주니어 공채', progress: 100 },
        ],
        status: '평가 중',
        lastActive: '10분 전',
      },
      {
        id: 3,
        name: '이영희',
        email: 'younghee.lee@crate.io',
        role: '기술 심사역',
        assignedForms: [{ title: '데이터 엔지니어 수시 채용', progress: 42 }],
        status: '진행 중',
        lastActive: '1시간 전',
      },
      {
        id: 4,
        name: '박지성',
        email: 'jisung.park@crate.io',
        role: '디자인 디렉터',
        assignedForms: [{ title: '브랜드 디자인 주니어 공채', progress: 100 }],
        status: '완료',
        lastActive: '어제',
      },
      {
        id: 5,
        name: '최유진',
        email: 'yujin.choi@crate.io',
        role: 'HR 매니저',
        assignedForms: [{ title: 'UX 리서처 경력직 채용', progress: 15 }],
        status: '대기',
        lastActive: '3일 전',
      },
    ],
    [],
  );

  const evaluators = useMemo(() => {
    const list = isEvaluatorsExpanded ? allEvaluators : allEvaluators.slice(0, 4);

    // Process each evaluator to add aggregated workload info
    return list.map(ev => {
      const totalProgress = ev.assignedForms.reduce((acc, curr) => acc + curr.progress, 0);
      const avgProgress = Math.floor(totalProgress / ev.assignedForms.length);

      return {
        ...ev,
        avgProgress,
        totalFormsCount: ev.assignedForms.length,
        // Show top 2 (could be lowest progress for priority management)
        displayForms: ev.assignedForms.slice(0, 2),
        remainingFormsCount: Math.max(0, ev.assignedForms.length - 2),
      };
    });
  }, [allEvaluators, isEvaluatorsExpanded]);

  const hasMoreEvaluators = allEvaluators.length > 4;

  const handleToggleEvaluators = () => {
    setIsEvaluatorsExpanded(prev => !prev);
  };

  // Mock data for active forms
  const [activeForms] = useState([
    {
      id: 1,
      title: '2026 동계 개발 인턴십',
      status: '모집 중',
      statusColor: 'neon-green-500',
      applicants: 1240,
      updatedAt: '2시간 전',
    },
    {
      id: 2,
      title: '브랜드 디자인 주니어 공채',
      status: '모집 종료 D-2',
      statusColor: 'warning',
      applicants: 450,
      updatedAt: '5시간 전',
    },
    {
      id: 3,
      title: '데이터 엔지니어 수시 채용',
      status: '모집 대기',
      statusColor: 'text-tertiary',
      applicants: 0,
      updatedAt: '어제',
    },
    {
      id: 4,
      title: 'UX 리서처 경력직 채용',
      status: '평가 진행 중',
      statusColor: 'info',
      applicants: 122,
      updatedAt: '2일 전',
    },
  ]);

  // Mock activity logs
  const activityLogs = useMemo(
    () => [
      {
        id: 1,
        user: 'Admin_A',
        action: '합격 처리',
        target: '지_원_자_094번',
        time: '22:45:12',
        type: 'PASS',
      },
      {
        id: 2,
        user: 'System',
        action: '신규 지원서 접수',
        target: '지_원_자_122번',
        time: '22:42:05',
        type: 'RECV',
      },
      {
        id: 3,
        user: 'Evaluator_K',
        action: '코멘트 추가',
        target: '지_원_자_015번',
        time: '22:38:59',
        type: 'NOTE',
      },
      {
        id: 4,
        user: 'System',
        action: '상태 변경',
        target: '데이터 엔지니어 공고',
        time: '22:30:11',
        type: 'STAT',
      },
    ],
    [],
  );

  return {
    evaluators,
    hasMoreEvaluators,
    isEvaluatorsExpanded,
    handleToggleEvaluators,
    activeForms,
    activityLogs,
  };
};

export default useDashboardPageController;
```

## File: ui/dashboard/index.tsx
```typescript
import { Link } from 'react-router-dom';

import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import useDashboardPageController from './hook';

const DashboardPage = () => {
  const {
    evaluators,
    hasMoreEvaluators,
    isEvaluatorsExpanded,
    handleToggleEvaluators,
    activeForms,
    activityLogs,
  } = useDashboardPageController();

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-base text-text-primary">
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
            대시보드
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
              <p className="text-sm font-slim-bold mb-0.5">운영지원팀</p>
              <p className="text-[11px] text-text-tertiary">admin@crate.io</p>
            </div>
          </section>
        </nav>
      </header>

      <main className="flex-1 bg-bg-subtle/30 overflow-y-auto px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
            {/* Active Recruitment Section */}
            <section className="desktop:col-span-2 space-y-6">
              <header className="flex items-center justify-between">
                <h2 className="text-xl font-slim-bold flex items-center gap-2">
                  <Iconography.Stroke.Target className="w-5 h-5 text-brand-primary" />
                  진행 중인 모집 공고
                </h2>
                <Link
                  to="/new-form"
                  className="text-sm text-brand-primary font-slim-semibold hover:underline"
                >
                  모두 보기
                </Link>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeForms.map(form => (
                  <article
                    key={form.id}
                    className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md hover:border-brand-primary transition-all group cursor-pointer flex flex-col justify-between min-h-[160px]"
                  >
                    <header className="flex justify-between items-start">
                      <span
                        className="px-3 py-1 rounded-slim-full text-[11px] font-slim-bold bg-bg-subtle"
                        style={{
                          color: form.statusColor.startsWith('var')
                            ? form.statusColor
                            : `var(--color-${form.statusColor})`,
                        }}
                      >
                        {form.status}
                      </span>
                      <time className="text-[11px] text-text-tertiary">{form.updatedAt}</time>
                    </header>
                    <h3 className="text-lg font-slim-bold text-text-primary group-hover:text-brand-primary transition-colors my-4">
                      {form.title}
                    </h3>
                    <footer className="pt-4 border-t border-border-subtle flex items-center gap-2">
                      <Iconography.Stroke.Users className="w-4 h-4 text-text-tertiary" />
                      <span className="text-sm font-slim-semibold">
                        {form.applicants.toLocaleString()}
                      </span>
                      <span className="text-xs text-text-tertiary">지원자</span>
                    </footer>
                  </article>
                ))}
                <Link
                  to="/new-form"
                  className="flex flex-col items-center justify-center gap-3 p-6 bg-bg-subtle/50 border-2 border-dashed border-border-default rounded-slim-2xl hover:border-brand-primary hover:bg-bg-base transition-all group min-h-[160px]"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Plus className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-slim-bold text-text-secondary group-hover:text-brand-primary">
                    새로운 모집 폼 만들기
                  </span>
                </Link>
              </div>
            </section>

            {/* Activity Feed Section */}
            <section className="flex flex-col gap-6">
              <h2 className="text-xl font-slim-bold flex items-center gap-2">
                <Iconography.Stroke.Flash className="w-5 h-5 text-brand-primary" />
                최근 활동
              </h2>
              <div className="flex-1 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm overflow-hidden flex flex-col">
                <header className="p-4 bg-bg-subtle border-b border-border-default flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green-500 animate-pulse" />
                  <span className="text-xs font-slim-bold text-text-secondary">
                    최근 업데이트: 오늘 23:45
                  </span>
                </header>
                <div className="divide-y divide-border-subtle overflow-y-auto max-h-[480px]">
                  {activityLogs.map(log => (
                    <article
                      key={log.id}
                      className="p-4 hover:bg-bg-subtle transition-colors flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-slim-lg bg-bg-subtle flex items-center justify-center shrink-0">
                        {log.type === 'PASS' && (
                          <Iconography.Stroke.Graduation className="w-4 h-4 text-neon-green-500" />
                        )}
                        {log.type === 'RECV' && (
                          <Iconography.Stroke.Flash className="w-4 h-4 text-brand-primary" />
                        )}
                        {log.type === 'NOTE' && (
                          <Iconography.Stroke.Document className="w-4 h-4 text-neon-violet-500" />
                        )}
                        {log.type === 'STAT' && (
                          <Iconography.Stroke.Target className="w-4 h-4 text-neon-pink-500" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[13px] leading-snug">
                          <span className="font-slim-bold text-text-primary">{log.user}</span>
                          <span className="text-text-secondary mx-1">{log.action}:</span>
                          <span className="font-slim-semibold text-brand-primary">
                            {log.target}
                          </span>
                        </p>
                        <time className="block text-[11px] text-text-tertiary">{log.time}</time>
                      </div>
                    </article>
                  ))}
                </div>
                <button className="w-full p-4 text-xs font-slim-bold text-text-secondary hover:text-brand-primary border-t border-border-default bg-bg-subtle/30 transition-colors">
                  전체 로그 보기
                </button>
              </div>
            </section>
          </div>

          {/* Admin Evaluation Schedule (Bottom) */}
          <section className="space-y-6">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-slim-bold flex items-center gap-2">
                  <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
                  관리자 평가 현황
                </h2>
                <span className="px-2 py-0.5 bg-bg-subtle border border-border-default rounded-slim-md text-[10px] font-slim-bold text-text-tertiary">
                  Total {evaluators.length} Members
                </span>
              </div>
              <button className="text-sm text-brand-primary font-slim-semibold hover:underline flex items-center gap-1">
                <Iconography.Stroke.Plus className="w-4 h-4" />
                권한 부여
              </button>
            </header>

            <div className="bg-bg-base border border-border-default rounded-slim-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed desktop:table-auto">
                  <thead>
                    <tr className="bg-bg-subtle border-b border-border-default text-[12px] font-slim-bold text-text-secondary uppercase tracking-wider">
                      <th className="px-6 py-4 w-[200px]">평가자</th>
                      <th className="px-6 py-4 w-full">담당 워크로드 및 상세</th>
                      <th className="px-6 py-4 text-right w-[100px]">상태</th>
                      <th className="px-6 py-4 text-right w-[120px]">최근 활동</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {evaluators.map(evaluator => (
                      <tr
                        key={evaluator.id}
                        className="hover:bg-bg-subtle/50 transition-colors group"
                      >
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-bg-subtle flex items-center justify-center text-text-secondary font-slim-bold text-sm border border-border-default group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
                              {evaluator.name[0]}
                            </div>
                            <div className="leading-tight">
                              <p className="text-sm font-slim-bold text-text-primary whitespace-nowrap">
                                {evaluator.name}
                              </p>
                              <p className="text-[11px] text-text-tertiary whitespace-nowrap">
                                {evaluator.role}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-5">
                            <section
                              className="space-y-2 p-3 bg-bg-subtle/50 rounded-slim-xl border border-border-subtle"
                              aria-label="요약 진행률"
                            >
                              <div className="flex justify-between items-center text-[11px] font-slim-bold uppercase">
                                <span className="text-text-tertiary">
                                  전체 평균 진행률 ({evaluator.totalFormsCount}개 공고)
                                </span>
                                <span className="text-brand-primary">{evaluator.avgProgress}%</span>
                              </div>
                              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden border border-border-subtle">
                                <div
                                  className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                                  style={{ width: `${evaluator.avgProgress}%` }}
                                />
                              </div>
                            </section>

                            <ul className="space-y-3 pl-1">
                              {evaluator.displayForms.map((form, idx) => (
                                <li key={idx} className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-1 h-1 rounded-full bg-text-tertiary shrink-0" />
                                    <span className="text-[13px] font-slim-semibold text-text-secondary truncate">
                                      {form.title}
                                    </span>
                                  </div>
                                  <span className="text-[11px] font-slim-bold text-text-tertiary shrink-0">
                                    {form.progress}% 완료
                                  </span>
                                </li>
                              ))}
                              {evaluator.remainingFormsCount > 0 && (
                                <li className="list-none">
                                  <button className="text-[11px] font-slim-bold text-brand-primary hover:underline bg-brand-primary/5 px-2 py-1 rounded-slim-md">
                                    + {evaluator.remainingFormsCount}개의 공고 더 보기
                                  </button>
                                </li>
                              )}
                            </ul>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top text-right">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-slim-full text-[11px] font-slim-bold whitespace-nowrap ${
                              evaluator.status === '완료'
                                ? 'bg-neon-green-500/10 text-neon-green-600 border border-neon-green-500/20'
                                : evaluator.status === '과부하'
                                  ? 'bg-neon-pink-500/10 text-neon-pink-600 border border-neon-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                                  : evaluator.status === '평가 중' || evaluator.status === '진행 중'
                                    ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                                    : 'bg-bg-subtle text-text-tertiary border border-border-default'
                            }`}
                          >
                            {evaluator.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 align-top text-right">
                          <time className="text-[11px] text-text-tertiary whitespace-nowrap">
                            {evaluator.lastActive}
                          </time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {hasMoreEvaluators && (
                <button
                  onClick={handleToggleEvaluators}
                  className="w-full py-4 text-sm font-slim-bold text-text-secondary hover:text-brand-primary bg-bg-subtle/50 hover:bg-bg-subtle transition-all border-t border-border-default flex items-center justify-center gap-2"
                >
                  {isEvaluatorsExpanded ? '접기' : '평가자 더 보기'}
                  {isEvaluatorsExpanded ? (
                    <Iconography.Stroke.Minus className="w-4 h-4 text-text-tertiary" />
                  ) : (
                    <Iconography.Stroke.Plus className="w-4 h-4 text-text-tertiary" />
                  )}
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full px-6 py-4 border-t border-border-default bg-bg-base">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] text-text-tertiary font-slim-normal">
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
};

export default DashboardPage;
```

## File: ui/kakao-redirect/hook.ts
```typescript
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { TypeGuard } from '@/shared/lib';
import { AxiosManager } from '@/shared/lib';

const useKakaoRedirectPageController = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialize = useCallback(async () => {
    const code = searchParams.get('code');

    console.log(code);

    if (!TypeGuard.checkNull(code)) {
      // TODO: 인가코드를 이용하여 access token을 발급
      try {
        await AxiosManager.getAxiosInstance().post('', { data: { code } });
        localStorage.setItem('isLoggined', 'true');
      } catch {
        localStorage.setItem('isLoggined', 'false');
      }
    } else {
      localStorage.setItem('isLoggined', 'false');
    }
    navigate('/');
  }, [searchParams, navigate]);

  useEffect(() => {
    initialize();
  }, []);
};

export default useKakaoRedirectPageController;
```

## File: ui/kakao-redirect/index.tsx
```typescript
import useKakaoRedirectPageController from './hook';

const KakaoRedirectPage = () => {
  useKakaoRedirectPageController();

  return (
    <div className="bg-bg-default w-full h-[100dvh] flex justify-center items-center">
      <span className="text-text-primary text-base font-medium">...</span>
    </div>
  );
};

export default KakaoRedirectPage;
```

## File: ui/landing/hook.ts
```typescript
import { useState } from 'react';

const useLandingPageController = () => {
  const [isLoggined] = useState(() => {
    const loginFlag = localStorage?.getItem('isLoggined');
    return loginFlag === 'true';
  });

  return {
    isLoggined,
  };
};

export default useLandingPageController;
```

## File: ui/landing/index.tsx
```typescript
import { Link } from 'react-router-dom';

// import { LoginButton } from '@/features/authenticate/ui';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import useLandingPageController from './hook';

const LandingPage = () => {
  const { isLoggined } = useLandingPageController();

  return (
    <div className="w-full min-h-[100dvh] overflow-y-auto flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="CRATE 홈" className="flex items-center gap-3 group">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight text-text-primary group-hover:text-brand-primary transition-colors">
              CRATE
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-3">
          <DarkModeButton />
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all"
          >
            대시보드
          </Link>
          {isLoggined ? (
            <span className="px-4 py-2 text-sm font-slim-semibold text-brand-primary bg-brand-primary/10 rounded-slim-lg">
              로그인됨
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-slim-semibold text-text-inverse bg-brand-primary rounded-slim-lg hover:bg-brand-primary-hover transition-all"
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full px-6 py-24 flex flex-col items-center gap-8 bg-bg-base">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink-50 dark:bg-neon-pink-950/30 border border-neon-pink-200 dark:border-neon-pink-800 text-neon-pink-600 dark:text-neon-pink-400 font-slim-semibold rounded-slim-xl text-sm">
              <Iconography.Stroke.Sparkles className="w-4 h-4" />
              <span>선발의 새로운 기준</span>
            </div>

            <h1 className="text-5xl desktop:text-7xl font-slim-bold text-center leading-tight tracking-tight text-text-primary">
              <span className="text-neon-pink-600 dark:text-neon-pink-400">선발,</span> 이제{' '}
              <span className="text-neon-green-600 dark:text-neon-green-400">쉽게</span>!
            </h1>

            <p className="text-xl desktop:text-2xl text-text-secondary text-center font-medium max-w-2xl leading-relaxed">
              흩어진 도구와 복잡한 과정은 이제{' '}
              <span className="font-bold text-brand-primary">CRATE</span>로 끝.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/new-form"
                className="px-8 py-4 bg-brand-primary text-text-inverse font-slim-semibold text-lg rounded-slim-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Rocket className="w-6 h-6" />
                <span>지금 시작하기</span>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-bg-subtle text-text-primary font-slim-semibold text-lg rounded-slim-xl border border-border-default hover:border-brand-primary hover:shadow-sm transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Monitor className="w-6 h-6" />
                <span>로그인하기</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-bg-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                이런 경험 있으신가요?
              </h2>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-brand-primary transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-pink-50 dark:bg-neon-pink-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Dizzy className="w-6 h-6 text-neon-pink-600 dark:text-neon-pink-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">
                  도구가 너무 많아요
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  구글 폼으로 수집, 엑셀로 정리, 메신저로 논의... 너무 복잡해요.
                </p>
              </article>

              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-neon-green-500 transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-green-50 dark:bg-neon-green-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Angry className="w-6 h-6 text-neon-green-600 dark:text-neon-green-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">공정하지 않아요</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  모집 중에 평가하면 먼저 지원한 사람이 유리하고, 일관성도 떨어져요.
                </p>
              </article>

              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-neon-violet-500 transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-violet-50 dark:bg-neon-violet-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Sad className="w-6 h-6 text-neon-violet-600 dark:text-neon-violet-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">협업이 어려워요</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  여러 운영진이 함께 평가하려면 파일 공유하고 취합하고... 너무 복잡해요.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-bg-base">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                CRATE가 해결해요!
              </h2>
              <p className="text-xl text-text-secondary font-medium">
                선발에 집중할 수 있는 올인원 플랫폼
              </p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-brand-primary rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                      통합 워크플로우
                    </h3>
                    <p className="text-text-secondary">
                      양식 제작부터 합격 통보까지, 한 곳에서 끝
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-pink-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Balance className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-pink-500 transition-colors">
                      공정한 평가
                    </h3>
                    <p className="text-text-secondary">
                      모집 마감 후 일괄 평가로 완벽한 공정성
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-violet-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-violet-500 transition-colors">
                      팀 협업
                    </h3>
                    <p className="text-text-secondary">
                      여러 운영진이 함께 평가, 파일 공유 없이 즉시 협업
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-green-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Flash className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-green-500 transition-colors">
                      단순함
                    </h3>
                    <p className="text-text-secondary">
                      직관적인 드래그 앤 드롭으로 5분 만에 모집 시작
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-gradient-to-b from-bg-subtle via-bg-base to-bg-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                이런 분들께 추천해요
              </h2>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-primary/80 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Graduation className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">대학 동아리</h3>
                  <p className="text-white/90 leading-relaxed">
                    부원 모집부터 선정까지 한 번에.
                  </p>
                </div>
              </article>

              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-neon-pink-500 via-neon-pink-400 to-neon-pink-600 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Rocket className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">스타트업</h3>
                  <p className="text-white/90 leading-relaxed">
                    전문가 없이도 완벽한 채용 프로세스.
                  </p>
                </div>
              </article>

              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-neon-violet-500 via-neon-violet-400 to-neon-violet-600 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Document className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">행사 운영진</h3>
                  <p className="text-white/90 leading-relaxed">
                    공정하고 빠른 참가자 모집.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <article className="w-full px-6 py-20 bg-brand-primary text-text-inverse relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl desktop:text-6xl font-slim-bold mb-6 leading-tight tracking-tight">
              선발의 새로운 기준,
              <br />
              지금 시작하세요
            </h2>
            <p className="text-xl desktop:text-2xl mb-10 font-slim-normal flex items-center justify-center gap-2 opacity-90">
              복잡한 설정 없이 5분 만에 모집 시작 <Iconography.Stroke.Flash className="w-5 h-5" />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/new-form"
                className="px-10 py-5 bg-bg-base text-brand-primary font-slim-bold text-xl rounded-slim-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Target className="w-8 h-8" />
                <span>무료로 시작하기</span>
              </Link>
              {!isLoggined && (
                <Link
                  to="/signup"
                  className="px-10 py-5 bg-brand-secondary text-text-inverse font-slim-bold text-xl rounded-slim-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3"
                >
                  <Iconography.Stroke.Rocket className="w-8 h-8" />
                  <span>회원가입</span>
                </Link>
              )}
            </div>
            <p className="mt-8 text-sm font-slim-normal flex items-center justify-center gap-2 opacity-75">
              <Iconography.Stroke.Sparkles className="w-4 h-4" /> 신용카드 등록 불필요 · 언제든
              무료로 시작
            </p>
          </div>
        </article>
      </main>

      <footer className="w-full px-6 py-12 bg-bg-subtle border-t border-border-default text-text-primary">
        <div className="max-w-6xl mx-auto flex flex-col desktop:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight">CRATE</span>
          </div>
          <div className="text-center desktop:text-right">
            <p className="text-text-secondary text-sm">
              © 2025 indigo-net. CRATE by indigo-net. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
```

## File: ui/new-form/hook.ts
```typescript
import { useEffect, useRef } from 'react';

import { useFormQuestionListStore } from '@/entities/form/store';

const useNewFormPageController = () => {
  const { formQuestions } = useFormQuestionListStore();

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // NOTE: 질문이 추가되더라도, "질문추가용UI" 를 추적하기 위해 카드리스트의 가장 하단으로 스크롤 이동
    if (listRef.current) {
      listRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [formQuestions.length]);

  return { formQuestions, listRef };
};

export default useNewFormPageController;
```

## File: ui/new-form/index.tsx
```typescript
import { Link } from 'react-router-dom';

import {
  QuestionList,
  QuestionAddSection,
  FormSignatureEditSection,
} from '@/features/edit-form/ui';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import useNewFormPageController from './hook';

const NewFormPage = () => {
  const { listRef } = useNewFormPageController();

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="mx-auto w-full max-w-6xl flex justify-between items-center">
          <Link
            to="/dashboard"
            className="group px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all font-slim-semibold"
          >
            <Iconography.Stroke.Monitor className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>대시보드로 돌아가기</span>
          </Link>

          <div className="flex items-center gap-4">
            <DarkModeButton />
            <div className="h-4 w-px bg-border-default mx-1" />
            <button className="px-5 py-2.5 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle border border-transparent hover:border-border-default transition-all flex items-center gap-2">
              <Iconography.Stroke.Trash className="w-4 h-4" />
              <span>초기화</span>
            </button>
            <button className="px-6 py-2.5 bg-brand-primary text-text-inverse font-slim-bold text-sm rounded-slim-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Iconography.Stroke.Rocket className="w-5 h-5" />
              <span>저장 및 게시하기</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-bg-subtle/50">
        <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col gap-8">
          <div
            ref={listRef}
            className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <FormSignatureEditSection />
            <QuestionList />
            <QuestionAddSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewFormPage;
```
