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
