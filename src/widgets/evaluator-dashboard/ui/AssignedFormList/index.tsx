import { memo } from 'react';

import { AssignedFormCard } from '@/features/start-evaluation/ui';
import { Iconography } from '@/shared/ui';

import useAssignedFormListController from './hook';

const AssignedFormList = memo(() => {
  const { forms, progressMap, isLoading } = useAssignedFormListController();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <Iconography.Stroke.Document className="w-12 h-12 mb-4 opacity-40" />
        <p className="text-base font-slim-semibold">배정된 폼이 없습니다</p>
        <p className="mt-1 text-sm">평가할 폼이 배정되면 여기에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
      {forms.map(form => {
        const formId = form.getValue('id');
        const progress = progressMap.get(formId);

        return (
          <AssignedFormCard
            key={formId}
            title={form.getValue('title') ?? ''}
            totalApplications={progress?.total ?? 0}
            completedEvaluations={progress?.completed ?? 0}
            href={`/evaluation/${formId}`}
          />
        );
      })}
    </div>
  );
});

AssignedFormList.displayName = 'AssignedFormList';

export default AssignedFormList;
