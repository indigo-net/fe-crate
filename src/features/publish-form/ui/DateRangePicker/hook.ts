import { useCallback, useMemo } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

const useDateRangePickerController = () => {
  const formSignature = useFormSignatureStore(s => s.formSignature);
  const setFormSignature = useFormSignatureStore(s => s.setFormSignature);

  const publishedAt = formSignature?.getValue('publishedAt') ?? '';
  const closedAt = formSignature?.getValue('closedAt') ?? '';
  const isDraft = formSignature?.getValue('status') === 'DRAFT';

  const isAlwaysOpen = useMemo(() => {
    return formSignature?.getValue('closedAt') === null;
  }, [formSignature]);

  const handlePublishedAtChange = useCallback(
    (date: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setPublishedAt(newFormSignature, date || null);
        }
        return FormSignatureStateService.setPublishedAt(prev, date || null);
      });
    },
    [setFormSignature],
  );

  const handleClosedAtChange = useCallback(
    (date: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setClosedAt(newFormSignature, date || null);
        }
        return FormSignatureStateService.setClosedAt(prev, date || null);
      });
    },
    [setFormSignature],
  );

  const handleAlwaysOpenChange = useCallback(
    (checked: boolean) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.setClosedAt(newFormSignature, checked ? null : '');
        }
        return FormSignatureStateService.setClosedAt(prev, checked ? null : '');
      });
    },
    [setFormSignature],
  );

  return {
    publishedAt,
    closedAt,
    isAlwaysOpen,
    isDraft,
    handlePublishedAtChange,
    handleClosedAtChange,
    handleAlwaysOpenChange,
  };
};

export default useDateRangePickerController;
