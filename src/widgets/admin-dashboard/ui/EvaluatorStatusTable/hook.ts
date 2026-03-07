import { useCallback, useEffect, useMemo, useState } from 'react';

import { EvaluatorApiService } from '@/entities/evaluator';

import type { GetEvaluatorsResponse } from '@/entities/evaluator/api/get-evaluators';

const INITIAL_DISPLAY_COUNT = 4;

const useEvaluatorStatusTableController = () => {
  const [evaluators, setEvaluators] = useState<GetEvaluatorsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await EvaluatorApiService.fetchDashboardEvaluators();
      setEvaluators(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : '평가자 현황 조회 실패';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const displayEvaluators = useMemo(() => {
    const list = isExpanded ? evaluators : evaluators.slice(0, INITIAL_DISPLAY_COUNT);

    return list.map(ev => {
      const totalProgress = ev.assignedForms.reduce((acc, curr) => acc + curr.progress, 0);
      const avgProgress =
        ev.assignedForms.length > 0 ? Math.floor(totalProgress / ev.assignedForms.length) : 0;

      return {
        ...ev,
        avgProgress,
        totalFormsCount: ev.assignedForms.length,
        displayForms: ev.assignedForms.slice(0, 2),
        remainingFormsCount: Math.max(0, ev.assignedForms.length - 2),
      };
    });
  }, [evaluators, isExpanded]);

  const hasMore = evaluators.length > INITIAL_DISPLAY_COUNT;

  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return {
    evaluators: displayEvaluators,
    isLoading,
    error,
    hasMore,
    isExpanded,
    handleToggleExpand,
  };
};

export default useEvaluatorStatusTableController;
