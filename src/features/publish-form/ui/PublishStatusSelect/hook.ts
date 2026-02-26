import { useCallback } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

import type { FormStatusType } from '@/entities/form';

const usePublishStatusSelectController = () => {
  const formSignature = useFormSignatureStore(s => s.formSignature);
  const setFormSignature = useFormSignatureStore(s => s.setFormSignature);

  const status = formSignature?.getValue('status') ?? 'DRAFT';

  const handleStatusChange = useCallback(
    (newStatus: FormStatusType) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setStatus(newFormSignature, newStatus);
        }
        return FormSignatureStateService.setStatus(prev, newStatus);
      });
    },
    [setFormSignature],
  );

  return {
    status,
    handleStatusChange,
  };
};

export default usePublishStatusSelectController;
