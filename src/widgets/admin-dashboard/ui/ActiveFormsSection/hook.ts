import { createElement, useCallback, useEffect, useState } from 'react';

import { FormApiService } from '@/entities/form/lib/form-api-service';

import type FormSignatureModel from '@/entities/form/model/form-signature';

import { useModalContext } from '@/app/lib';
import { UUID } from '@/shared/lib';
import { ModalInviteEvaluator } from '@/widgets/evaluator-invitation/ui';


const useActiveFormsSectionController = () => {
  const [forms, setForms] = useState<FormSignatureModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useModalContext();

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

  const handleInviteButtonClick = useCallback(
    (formId: string) => {
      openModal({
        id: UUID.v4(),
        title: '평가자 초대',
        content: createElement(ModalInviteEvaluator, { formId }),
      });
    },
    [openModal],
  );

  return { forms, isLoading, error, handleInviteButtonClick };
};

export default useActiveFormsSectionController;
