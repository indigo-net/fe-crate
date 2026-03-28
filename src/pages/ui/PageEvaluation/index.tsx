import { memo } from 'react';

import { EvaluationForm, EvaluationHeader } from '@/widgets/evaluation-workspace/ui';

const PageEvaluation = memo(() => {
  return (
    <div className="flex flex-col h-screen bg-bg-base">
      <EvaluationHeader />
      <EvaluationForm />
    </div>
  );
});

PageEvaluation.displayName = 'PageEvaluation';

export default PageEvaluation;
