import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useFormQuestionListStore, useFormSignatureStore } from '@/entities/form/store';

export const usePageFormApplyController = () => {
  const { formId } = useParams<{ formId: string }>();

  const { formSignature } = useFormSignatureStore();
  const { formQuestions } = useFormQuestionListStore();

  const handleApplyClick = useCallback(() => {
    // TODO: 지원하기 기능 구현
    console.log('Apply clicked for form:', formId);
  }, [formId]);

  return {
    formId,
    formSignature,
    formQuestions,
    handleApplyClick,
  };
};
