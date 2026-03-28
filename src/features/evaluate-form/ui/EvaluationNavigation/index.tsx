import { memo } from 'react';

interface Props {
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onComplete: () => void;
  totalScore: number;
  isAllScored: boolean;
}

const EvaluationNavigation = memo(
  ({
    currentIndex,
    totalCount,
    onPrev,
    onNext,
    isCompleted,
    onComplete,
    totalScore,
    isAllScored,
  }: Props) => {
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === totalCount - 1;

    return (
      <footer className="sticky bottom-0 bg-bg-base border-t border-border-default px-8 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* 이전 */}
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="px-4 py-2 text-sm font-slim-semibold text-text-secondary rounded-slim-lg hover:bg-bg-subtle transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← 이전
          </button>

          {/* 총 점수 */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary">총 점수</span>
            <span className="text-lg font-slim-bold text-brand-primary tabular-nums">
              {totalScore}점
            </span>
          </div>

          {/* 다음 / 평가 완료 */}
          <div className="flex items-center gap-2">
            {!isLast && (
              <button
                type="button"
                onClick={onNext}
                className="px-4 py-2 text-sm font-slim-semibold text-brand-primary rounded-slim-lg hover:bg-brand-primary/10 transition-colors"
              >
                다음 →
              </button>
            )}

            {!isCompleted && (
              <button
                type="button"
                onClick={onComplete}
                disabled={!isAllScored}
                className="px-5 py-2 bg-neon-green-500 text-text-inverse text-sm font-slim-semibold rounded-slim-lg hover:bg-neon-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                평가 완료
              </button>
            )}

            {isCompleted && (
              <span className="px-4 py-2 bg-neon-green-500/10 text-neon-green-600 text-sm font-slim-semibold rounded-slim-lg">
                평가 완료됨
              </span>
            )}
          </div>
        </div>
      </footer>
    );
  },
);

EvaluationNavigation.displayName = 'EvaluationNavigation';

export default EvaluationNavigation;
