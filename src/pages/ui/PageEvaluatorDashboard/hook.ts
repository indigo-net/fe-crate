import { useState, useMemo } from 'react';

// TODO: EvaluationStatusType을 entities/evaluation/types.d.ts로 분리
type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
type FilterType = EvaluationStatusType | 'ALL';

// TODO: ApplicantData를 entities/evaluation/model/applicant-model.ts로 분리
interface ApplicantData {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatusType;
}

const usePageEvaluatorDashboardController = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');

  // Mock 데이터
  const allApplicants = useMemo<ApplicantData[]>(
    () => [
      { id: '1', name: '김철수', submittedAt: '2026-03-01T14:30:00Z', status: 'PENDING' },
      { id: '2', name: '이영희', submittedAt: '2026-03-01T15:00:00Z', status: 'IN_PROGRESS' },
      { id: '3', name: '박지성', submittedAt: '2026-03-01T16:00:00Z', status: 'COMPLETED' },
      { id: '4', name: '최유진', submittedAt: '2026-03-02T09:00:00Z', status: 'PENDING' },
      { id: '5', name: '정민호', submittedAt: '2026-03-02T10:30:00Z', status: 'PENDING' },
      { id: '6', name: '한소희', submittedAt: '2026-03-02T11:00:00Z', status: 'COMPLETED' },
      { id: '7', name: '오세훈', submittedAt: '2026-03-02T13:00:00Z', status: 'IN_PROGRESS' },
      { id: '8', name: '강다니엘', submittedAt: '2026-03-02T14:30:00Z', status: 'PENDING' },
    ],
    [],
  );

  // 필터링된 지원서
  const filteredApplicants = useMemo(() => {
    if (currentFilter === 'ALL') return allApplicants;
    if (currentFilter === 'PENDING') {
      return allApplicants.filter(a => a.status === 'PENDING' || a.status === 'IN_PROGRESS');
    }
    return allApplicants.filter(a => a.status === currentFilter);
  }, [allApplicants, currentFilter]);

  // 통계
  const summary = useMemo(() => {
    const totalAssigned = allApplicants.length;
    const completedCount = allApplicants.filter(a => a.status === 'COMPLETED').length;
    const pendingCount = allApplicants.filter(
      a => a.status === 'PENDING' || a.status === 'IN_PROGRESS',
    ).length;
    const progressPercent = totalAssigned > 0 ? Math.round((completedCount / totalAssigned) * 100) : 0;

    return { totalAssigned, completedCount, pendingCount, progressPercent };
  }, [allApplicants]);

  // 필터 카운트
  const filterCounts = useMemo(
    () => ({
      all: allApplicants.length,
      pending: allApplicants.filter(a => a.status === 'PENDING' || a.status === 'IN_PROGRESS')
        .length,
      completed: allApplicants.filter(a => a.status === 'COMPLETED').length,
    }),
    [allApplicants],
  );

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const handleStartEvaluation = (id: string) => {
    // TODO: 평가 페이지로 이동 또는 평가 모달 열기
    window.alert(`평가 시작: ${id}`);
  };

  return {
    currentFilter,
    filteredApplicants,
    summary,
    filterCounts,
    handleFilterChange,
    handleStartEvaluation,
  };
};

export default usePageEvaluatorDashboardController;
