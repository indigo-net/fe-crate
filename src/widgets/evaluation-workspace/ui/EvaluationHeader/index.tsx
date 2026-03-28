import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Iconography } from '@/shared/ui';

import useEvaluationHeaderController from './hook';

const EvaluationHeader = memo(() => {
  const { totalCount, completedCount } = useEvaluationHeaderController();

  return (
    <header className="sticky top-0 z-10 bg-bg-base border-b border-border-default px-6 py-4">
      <div className="flex items-center justify-between">
        <Link
          to="/evaluator/dashboard"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <Iconography.Stroke.Cancel className="w-4 h-4" />
          <span>돌아가기</span>
        </Link>

        {totalCount > 0 && (
          <span className="text-sm font-slim-semibold text-text-primary">
            평가 완료 {completedCount} / {totalCount}
          </span>
        )}

        <div className="w-24" />
      </div>
    </header>
  );
});

EvaluationHeader.displayName = 'EvaluationHeader';

export default EvaluationHeader;
