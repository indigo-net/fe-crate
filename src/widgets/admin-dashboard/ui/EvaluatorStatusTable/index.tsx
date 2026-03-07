import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useEvaluatorStatusTableController from './hook';

const EvaluatorStatusTable = memo(() => {
  const { evaluators, hasMore, isExpanded, handleToggleExpand } =
    useEvaluatorStatusTableController();

  return (
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
              {evaluators.map(evaluator => {
                const statusLabel =
                  evaluator.avgProgress === 100
                    ? '완료'
                    : evaluator.avgProgress > 0
                      ? '평가 중'
                      : '대기';

                return (
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
                          statusLabel === '완료'
                            ? 'bg-neon-green-500/10 text-neon-green-600 border border-neon-green-500/20'
                            : statusLabel === '평가 중'
                              ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                              : 'bg-bg-subtle text-text-tertiary border border-border-default'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-right">
                      <time className="text-[11px] text-text-tertiary whitespace-nowrap">
                        {evaluator.lastActive}
                      </time>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {hasMore && (
          <button
            onClick={handleToggleExpand}
            className="w-full py-4 text-sm font-slim-bold text-text-secondary hover:text-brand-primary bg-bg-subtle/50 hover:bg-bg-subtle transition-all border-t border-border-default flex items-center justify-center gap-2"
          >
            {isExpanded ? '접기' : '평가자 더 보기'}
            {isExpanded ? (
              <Iconography.Stroke.Minus className="w-4 h-4 text-text-tertiary" />
            ) : (
              <Iconography.Stroke.Plus className="w-4 h-4 text-text-tertiary" />
            )}
          </button>
        )}
      </div>
    </section>
  );
});

EvaluatorStatusTable.displayName = 'EvaluatorStatusTable';

export default EvaluatorStatusTable;
