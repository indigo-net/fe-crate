import { memo } from 'react';

import DateStandard from '@/shared/lib/date-standard';

import { Iconography } from '@/shared/ui';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

// TODO: ApplicantData를 entities/evaluation/model/applicant-model.ts로 분리
interface ApplicantData {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatusType;
}

interface Props {
  applicants: ApplicantData[];
  onStartEvaluation?: (id: string) => void;
}

const STATUS_CONFIG: Record<
  EvaluationStatusType,
  { label: string; className: string }
> = {
  PENDING: {
    label: '대기 중',
    className: 'bg-bg-subtle text-text-tertiary border-border-default',
  },
  IN_PROGRESS: {
    label: '평가 중',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  COMPLETED: {
    label: '완료',
    className: 'bg-neon-green-500/10 text-neon-green-600 border-neon-green-500/20',
  },
};

// TODO: 개별 행(ApplicantCard)을 features/evaluate-applicant로 분리
const ApplicantList = memo(({ applicants, onStartEvaluation }: Props) => {
  const formatDate = (isoString: string) => {
    const date = DateStandard.fromISO(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    });
  };

  return (
    <section className="bg-bg-base border border-border-default rounded-slim-2xl shadow-sm overflow-hidden">
      <header className="px-6 py-4 border-b border-border-default bg-bg-subtle">
        <h2 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
          지원서 목록
        </h2>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-default text-xs font-slim-bold text-text-secondary uppercase tracking-wider">
              <th className="px-6 py-4">지원자명</th>
              <th className="px-6 py-4">제출일시</th>
              <th className="px-6 py-4">평가 상태</th>
              <th className="px-6 py-4 text-right">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {applicants.map(applicant => {
              const statusConfig = STATUS_CONFIG[applicant.status];

              return (
                <tr key={applicant.id} className="hover:bg-bg-subtle/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-slim-semibold text-text-primary">{applicant.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {formatDate(applicant.submittedAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-slim-full text-xs font-slim-bold border ${statusConfig.className}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {applicant.status === 'PENDING' && (
                      <button
                        onClick={() => onStartEvaluation?.(applicant.id)}
                        className="px-4 py-2 bg-brand-primary text-text-inverse text-sm font-slim-semibold rounded-slim-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        평가 시작
                      </button>
                    )}
                    {applicant.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => onStartEvaluation?.(applicant.id)}
                        className="px-4 py-2 bg-warning/10 text-warning text-sm font-slim-semibold rounded-slim-lg border border-warning/20 hover:bg-warning/20 transition-all"
                      >
                        이어서 평가
                      </button>
                    )}
                    {applicant.status === 'COMPLETED' && (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="px-4 py-2 bg-bg-subtle text-text-tertiary text-sm font-slim-semibold rounded-slim-lg border border-border-default cursor-not-allowed"
                      >
                        결과 보기
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {applicants.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Iconography.Stroke.Document className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary">배분된 지원서가 없습니다.</p>
        </div>
      )}
    </section>
  );
});

ApplicantList.displayName = 'ApplicantList';

export default ApplicantList;
