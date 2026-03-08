import { memo } from 'react';

import { Iconography } from '@/shared/ui';

type EvaluationMode = 'application' | 'question';

interface Props {
  mode: EvaluationMode;
  formTitle: string;
  completedCount: number;
  totalCount: number;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const MODE_LABELS: Record<EvaluationMode, string> = {
  application: '지원서 단위',
  question: '질문 단위',
};

const SAVE_STATUS_CONFIG = {
  idle: { label: '', className: 'text-text-tertiary' },
  saving: { label: '저장 중...', className: 'text-warning animate-pulse' },
  saved: { label: '자동 저장됨', className: 'text-neon-green-500' },
  error: { label: '저장 실패', className: 'text-error' },
};

const EvaluationHeader = memo(
  ({ mode, formTitle, completedCount, totalCount, saveStatus }: Props) => {
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const statusConfig = SAVE_STATUS_CONFIG[saveStatus];

    return (
      <header className="sticky top-0 z-10 bg-bg-base border-b border-border-default px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Iconography.Stroke.Document className="w-6 h-6 text-brand-primary" />
              <h1 className="text-lg font-slim-bold text-text-primary">정량평가</h1>
            </div>
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-slim-semibold rounded-slim-lg">
              {MODE_LABELS[mode]}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">{formTitle}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">진행률:</span>
                <span className="text-sm font-slim-semibold text-brand-primary">
                  {completedCount}/{totalCount}
                </span>
              </div>

              <div className="w-32 h-2 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {statusConfig.label && (
                <span className={`text-xs font-slim-semibold ${statusConfig.className}`}>
                  {statusConfig.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  },
);

EvaluationHeader.displayName = 'EvaluationHeader';

export default EvaluationHeader;
