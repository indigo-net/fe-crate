import { useCallback } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

const useFormSignatureEditSectionController = () => {
  const { formSignature, setFormSignature } = useFormSignatureStore();

  const handleTitleChange = useCallback(
    (title: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.editTitle(newFormSignature, title);
        }
        const clonedFormSignature = prev.clone();
        return FormSignatureStateService.editTitle(clonedFormSignature, title);
      });
    },
    [setFormSignature],
  );

  const handleDescriptionChange = useCallback(
    (description: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.editDescription(newFormSignature, description);
        }
        const clonedFormSignature = prev.clone();
        return FormSignatureStateService.editDescription(clonedFormSignature, description);
      });
    },
    [setFormSignature],
  );

  return {
    formSignature,
    handleTitleChange,
    handleDescriptionChange,
  };
};

export default useFormSignatureEditSectionController;
