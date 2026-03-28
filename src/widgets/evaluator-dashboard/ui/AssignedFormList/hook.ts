import { useCallback, useEffect, useState } from 'react';

import { EvaluationApiService } from '@/entities/evaluation/lib';
import { FormSignatureModel } from '@/entities/form';
import { DeveloperConsole } from '@/shared/lib';

const useAssignedFormListController = () => {
  const [forms, setForms] = useState<FormSignatureModel[]>([]);
  const [progressMap, setProgressMap] = useState<Map<string, { total: number; completed: number }>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await EvaluationApiService.fetchAssignedForms();
      setForms(result.forms);
      setProgressMap(result.progressMap);
    } catch (error) {
      DeveloperConsole.log({
        message: 'Failed to fetch assigned forms',
        data: error,
        location: 'AssignedFormList/hook.ts',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { forms, progressMap, isLoading };
};

export default useAssignedFormListController;
