import { EvaluationListStateService, useEvaluationListStore } from '@/entities/evaluation';

const useEvaluationHeaderController = () => {
  const evaluations = useEvaluationListStore(state => state.evaluations);
  const totalCount = evaluations.length;
  const completedCount = EvaluationListStateService.getCompletedCount(evaluations);

  return { totalCount, completedCount };
};

export default useEvaluationHeaderController;
