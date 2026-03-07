import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import type { EvaluationStatus } from '@/entities/evaluation';

interface Applicant {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatus;
}

interface Props {
  applicants: Applicant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STATUS_CONFIG: Record<EvaluationStatus, { label: string; className: string }> = {
  PENDING: { label: '대기', className: 'bg-bg-subtle text-text-tertiary' },
  IN_PROGRESS: { label: '평가 중', className: 'bg-warning/10 text-warning' },
  COMPLETED: { label: '완료', className: 'bg-neon-green-500/10 text-neon-green-600' },
};

const ApplicantSidebar = memo(({ applicants, selectedId, onSelect }: Props) => {
  return (
    <aside className="w-72 h-full bg-bg-base border-r border-border-default overflow-y-auto">
      <header className="sticky top-0 bg-bg-base px-4 py-3 border-b border-border-default">
        <div className="flex items-center gap-2">
          <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
          <h2 className="text-sm font-slim-bold text-text-primary">지원자 목록</h2>
          <span className="ml-auto text-xs text-text-tertiary">{applicants.length}명</span>
        </div>
      </header>

      <ul className="divide-y divide-border-subtle">
        {applicants.map(applicant => {
          const statusConfig = STATUS_CONFIG[applicant.status];
          const isSelected = selectedId === applicant.id;

          return (
            <li key={applicant.id}>
              <button
                type="button"
                onClick={() => onSelect(applicant.id)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  isSelected ? 'bg-brand-primary/5' : 'hover:bg-bg-subtle/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-slim-semibold ${isSelected ? 'text-brand-primary' : 'text-text-primary'}`}>
                    {applicant.name}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-slim-semibold rounded-slim-md ${statusConfig.className}`}>
                    {statusConfig.label}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary mt-1">
                  제출: {new Date(applicant.submittedAt).toLocaleDateString('ko-KR')}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      {applicants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
          <Iconography.Stroke.Document className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-sm">배분된 지원서가 없습니다</p>
        </div>
      )}
    </aside>
  );
});

ApplicantSidebar.displayName = 'ApplicantSidebar';

export default ApplicantSidebar;
