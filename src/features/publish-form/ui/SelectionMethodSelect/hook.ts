import { useCallback } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

import type { SelectionMethodType } from '@/entities/form';

const useSelectionMethodSelectController = () => {
  const formSignature = useFormSignatureStore(s => s.formSignature);
  const setFormSignature = useFormSignatureStore(s => s.setFormSignature);

  const selectionMethod = formSignature?.getValue('selectionMethod') ?? 'QUANTITATIVE';
  const isDraft = formSignature?.getValue('status') === 'DRAFT';

  const handleSelectionMethodChange = useCallback(
    (method: SelectionMethodType) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setSelectionMethod(newFormSignature, method);
        }
        return FormSignatureStateService.setSelectionMethod(prev, method);
      });
    },
    [setFormSignature],
  );

  return {
    selectionMethod,
    isDraft,
    handleSelectionMethodChange,
  };
};

export default useSelectionMethodSelectController;
