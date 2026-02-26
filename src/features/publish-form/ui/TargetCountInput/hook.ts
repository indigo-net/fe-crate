import { useCallback } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

const useTargetCountInputController = () => {
  const formSignature = useFormSignatureStore(s => s.formSignature);
  const setFormSignature = useFormSignatureStore(s => s.setFormSignature);

  const targetCount = formSignature?.getValue('targetCount') ?? null;
  const standbyCount = formSignature?.getValue('standbyCount') ?? null;
  const selectionMethod = formSignature?.getValue('selectionMethod') ?? 'QUANTITATIVE';
  const isDraft = formSignature?.getValue('status') === 'DRAFT';

  const showInput = selectionMethod !== 'QUANTITATIVE';

  const handleTargetCountChange = useCallback(
    (value: string) => {
      const count = value === '' ? null : parseInt(value, 10);
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setTargetCount(newFormSignature, count);
        }
        return FormSignatureStateService.setTargetCount(prev, count);
      });
    },
    [setFormSignature],
  );

  const handleStandbyCountChange = useCallback(
    (value: string) => {
      const count = value === '' ? null : parseInt(value, 10);
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setStandbyCount(newFormSignature, count);
        }
        return FormSignatureStateService.setStandbyCount(prev, count);
      });
    },
    [setFormSignature],
  );

  return {
    targetCount,
    standbyCount,
    showInput,
    isDraft,
    handleTargetCountChange,
    handleStandbyCountChange,
  };
};

export default useTargetCountInputController;
