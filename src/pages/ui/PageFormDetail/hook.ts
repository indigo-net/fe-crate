import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormQuestionListStore, useFormSignatureStore } from '@/entities/form/store';

export const usePageFormDetailController = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const { formSignature } = useFormSignatureStore();
  const { formQuestions } = useFormQuestionListStore();

  // TODO: 인증 Context로 관리 예정
  const isEditable = false;

  const status = formSignature?.getValue('status');
  const canEdit = isEditable && (status === 'DRAFT' || status === 'SCHEDULED');

  const handleEditClick = useCallback(() => {
    if (!formId) return;
    navigate(`/form/${formId}/edit`);
  }, [navigate, formId]);

  const handleBackToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  return {
    formId,
    formSignature,
    formQuestions,
    canEdit,
    handleEditClick,
    handleBackToDashboard,
  };
};
