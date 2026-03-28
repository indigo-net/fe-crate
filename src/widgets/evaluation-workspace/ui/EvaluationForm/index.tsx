import { memo } from 'react';

import { EvaluationCard, EvaluationNavigation } from '@/features/evaluate-form/ui';
import { Iconography } from '@/shared/ui';

import useEvaluationFormController from './hook';

const EvaluationForm = memo(() => {
  const {
    isLoading,
    isSubmitted,
    currentIndex,
    currentEvaluation,
    evaluations,
    totalScore,
    isAllScored,
    handleNext,
    handlePrev,
    handleScoreChange,
    handleCommentChange,
    handleComplete,
  } = useEvaluationFormController();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (evaluations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-text-tertiary">
        <Iconography.Stroke.Document className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-base">평가할 문항이 없습니다</p>
      </div>
    );
  }

  if (!currentEvaluation) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <EvaluationCard
        evaluation={currentEvaluation}
        isCompleted={isSubmitted}
        onScoreChange={handleScoreChange}
        onCommentChange={handleCommentChange}
      />
      <EvaluationNavigation
        currentIndex={currentIndex}
        totalCount={evaluations.length}
        onPrev={handlePrev}
        onNext={handleNext}
        isCompleted={isSubmitted}
        onComplete={handleComplete}
        totalScore={totalScore}
        isAllScored={isAllScored}
      />
    </div>
  );
});

EvaluationForm.displayName = 'EvaluationForm';

export default EvaluationForm;
