import { useCallback, useEffect, useState } from 'react';

import { FormApiService } from '@/entities/form/lib/form-api-service';

import type FormSignatureModel from '@/entities/form/model/form-signature';

const useActiveFormsSectionController = () => {
  const [forms, setForms] = useState<FormSignatureModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedForms = await FormApiService.fetchFormList();
      const activeForms = fetchedForms.filter(form => form.getValue('status') !== 'DRAFT');
      setForms(activeForms);
    } catch (e) {
      const message = e instanceof Error ? e.message : '폼 목록 조회 실패';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { forms, isLoading, error };
};

export default useActiveFormsSectionController;
