import { memo } from 'react';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
type FilterType = EvaluationStatusType | 'ALL';

interface Props {
  progressPercent: number;
  currentFilter: FilterType;
  onFilterChange?: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

// TODO: StatusFilterTab을 features/evaluate-applicant로 분리
const EvaluationProgress = memo(
  ({ progressPercent, currentFilter, onFilterChange, counts }: Props) => {
    const safeProgress = Math.max(0, Math.min(100, progressPercent));
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
            <span className="font-slim-bold text-brand-primary">{safeProgress}%</span>
          </div>
          <div className="w-full h-3 bg-bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-neon-green-500 rounded-full transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange?.(filter.key)}
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
