import { memo } from 'react';
import { Link } from 'react-router-dom';

import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import usePageDashboardController from './hook';

const PageDashboard = memo(() => {
  const {
    evaluators,
    hasMoreEvaluators,
    isEvaluatorsExpanded,
    handleToggleEvaluators,
    activeForms,
    activityLogs,
  } = usePageDashboardController();

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
});

PageDashboard.displayName = 'PageDashboard';

export default PageDashboard;
