import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Iconography } from '@/shared/ui';

interface Props {
  title: string;
  totalApplications: number;
  completedEvaluations: number;
  href: string;
}

const AssignedFormCard = memo(({ title, totalApplications, completedEvaluations, href }: Props) => {
  const progressPercent =
    totalApplications > 0
      ? Math.round((completedEvaluations / totalApplications) * 100)
      : 0;
  const isCompleted = completedEvaluations >= totalApplications && totalApplications > 0;

  return (
    <Link
      to={href}
      className="block rounded-slim-xl border border-border-default bg-bg-base p-6 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-slim-bold text-text-primary truncate">{title}</h3>
          <p className="mt-1 text-sm text-text-tertiary">
            {completedEvaluations} / {totalApplications}건 완료
          </p>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-slim-lg bg-brand-primary/10 flex items-center justify-center">
          <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-primary to-neon-green-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-text-tertiary">{progressPercent}% 진행</span>
        {isCompleted ? (
          <span className="text-xs font-slim-semibold text-neon-green-600">완료됨</span>
        ) : (
          <span className="text-xs font-slim-semibold text-brand-primary flex items-center gap-1">
            평가 시작
            →
          </span>
        )}
      </div>
    </Link>
  );
});

AssignedFormCard.displayName = 'AssignedFormCard';

export default AssignedFormCard;
