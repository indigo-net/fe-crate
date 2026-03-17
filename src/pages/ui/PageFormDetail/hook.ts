import { createElement, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useModalContext } from '@/app/lib';
import { useFormQuestionListStore, useFormSignatureStore } from '@/entities/form/store';
import { UUID } from '@/shared/lib';
import { ModalInviteEvaluator } from '@/widgets/evaluator-invitation/ui';

export const usePageFormDetailController = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { openModal } = useModalContext();

  const { formSignature } = useFormSignatureStore();
  const { formQuestions } = useFormQuestionListStore();

  // TODO: 인증 Context로 관리 예정
  const isEditable = false;

  const status = formSignature?.getValue('status');
  const canEdit = isEditable && (status === 'DRAFT' || status === 'SCHEDULED');

  const handleEditClick = useCallback(() => {
    if (!formId) {
      return;
    }
    navigate(`/form/${formId}/edit`);
  }, [navigate, formId]);

  const handleBackToDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleInviteButtonClick = useCallback(() => {
    openModal({
      id: UUID.v4(),
      title: '평가자 초대',
      content: createElement(ModalInviteEvaluator, {
        formId: formSignature?.getValue('id') ?? '',
      }),
    });
  }, [formSignature, openModal]);

  return {
    formId,
    formSignature,
    formQuestions,
    canEdit,
    handleEditClick,
    handleBackToDashboard,
    handleInviteButtonClick,
  };
};
