import { useState, useMemo } from 'react';

const useDashboardPageController = () => {
  const [isEvaluatorsExpanded, setIsEvaluatorsExpanded] = useState(false);

  // Mock data for evaluators
  const allEvaluators = useMemo(
    () => [
      {
        id: 1,
        name: '슈퍼 어드민',
        email: 'super@crate.io',
        role: '총괄 운영자',
        assignedForms: Array.from({ length: 102 }, (_, i) => ({
          title: `전국 단위 통합 채용 공고 ${i + 1}차`,
          progress: Math.floor((i + 1) / 2),
        })),
        status: '과부하',
        lastActive: '방금 전',
      },
      {
        id: 2,
        name: '김철수',
        email: 'chulsoo.kim@crate.io',
        role: '수석 평가원',
        assignedForms: [
          { title: '2026 동계 개발 인턴십', progress: 85 },
          { title: '브랜드 디자인 주니어 공채', progress: 100 },
        ],
        status: '평가 중',
        lastActive: '10분 전',
      },
      {
        id: 3,
        name: '이영희',
        email: 'younghee.lee@crate.io',
        role: '기술 심사역',
        assignedForms: [{ title: '데이터 엔지니어 수시 채용', progress: 42 }],
        status: '진행 중',
        lastActive: '1시간 전',
      },
      {
        id: 4,
        name: '박지성',
        email: 'jisung.park@crate.io',
        role: '디자인 디렉터',
        assignedForms: [{ title: '브랜드 디자인 주니어 공채', progress: 100 }],
        status: '완료',
        lastActive: '어제',
      },
      {
        id: 5,
        name: '최유진',
        email: 'yujin.choi@crate.io',
        role: 'HR 매니저',
        assignedForms: [{ title: 'UX 리서처 경력직 채용', progress: 15 }],
        status: '대기',
        lastActive: '3일 전',
      },
    ],
    [],
  );

  const evaluators = useMemo(() => {
    const list = isEvaluatorsExpanded ? allEvaluators : allEvaluators.slice(0, 4);

    // Process each evaluator to add aggregated workload info
    return list.map(ev => {
      const totalProgress = ev.assignedForms.reduce((acc, curr) => acc + curr.progress, 0);
      const avgProgress = Math.floor(totalProgress / ev.assignedForms.length);

      return {
        ...ev,
        avgProgress,
        totalFormsCount: ev.assignedForms.length,
        // Show top 2 (could be lowest progress for priority management)
        displayForms: ev.assignedForms.slice(0, 2),
        remainingFormsCount: Math.max(0, ev.assignedForms.length - 2),
      };
    });
  }, [allEvaluators, isEvaluatorsExpanded]);

  const hasMoreEvaluators = allEvaluators.length > 4;

  const handleToggleEvaluators = () => {
    setIsEvaluatorsExpanded(prev => !prev);
  };

  // Mock data for active forms
  const [activeForms] = useState([
    {
      id: 1,
      title: '2026 동계 개발 인턴십',
      status: '모집 중',
      statusColor: 'neon-green-500',
      applicants: 1240,
      updatedAt: '2시간 전',
    },
    {
      id: 2,
      title: '브랜드 디자인 주니어 공채',
      status: '모집 종료 D-2',
      statusColor: 'warning',
      applicants: 450,
      updatedAt: '5시간 전',
    },
    {
      id: 3,
      title: '데이터 엔지니어 수시 채용',
      status: '모집 대기',
      statusColor: 'text-tertiary',
      applicants: 0,
      updatedAt: '어제',
    },
    {
      id: 4,
      title: 'UX 리서처 경력직 채용',
      status: '평가 진행 중',
      statusColor: 'info',
      applicants: 122,
      updatedAt: '2일 전',
    },
  ]);

  // Mock activity logs
  const activityLogs = useMemo(
    () => [
      {
        id: 1,
        user: 'Admin_A',
        action: '합격 처리',
        target: '지_원_자_094번',
        time: '22:45:12',
        type: 'PASS',
      },
      {
        id: 2,
        user: 'System',
        action: '신규 지원서 접수',
        target: '지_원_자_122번',
        time: '22:42:05',
        type: 'RECV',
      },
      {
        id: 3,
        user: 'Evaluator_K',
        action: '코멘트 추가',
        target: '지_원_자_015번',
        time: '22:38:59',
        type: 'NOTE',
      },
      {
        id: 4,
        user: 'System',
        action: '상태 변경',
        target: '데이터 엔지니어 공고',
        time: '22:30:11',
        type: 'STAT',
      },
    ],
    [],
  );

  return {
    evaluators,
    hasMoreEvaluators,
    isEvaluatorsExpanded,
    handleToggleEvaluators,
    activeForms,
    activityLogs,
  };
};

export default useDashboardPageController;
