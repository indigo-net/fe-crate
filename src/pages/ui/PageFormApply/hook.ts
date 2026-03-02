import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormQuestionListStore, useFormSignatureStore } from '@/entities/form/store';

export const usePageFormApplyController = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const { formSignature } = useFormSignatureStore();
  const { formQuestions } = useFormQuestionListStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyClick = useCallback(async () => {
    if (!formId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // TODO: API 연동 시 실제 submit mutation 호출
      // await submitApplication({ formId, answers });
      navigate(`/form/${formId}/complete`);
    } catch {
      // TODO: Toast로 에러 메시지 표시
    } finally {
      setIsSubmitting(false);
    }
  }, [formId, isSubmitting, navigate]);

  return {
    formId,
    formSignature,
    formQuestions,
    isSubmitting,
    handleApplyClick,
  };
};
