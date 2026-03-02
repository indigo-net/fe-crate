import { useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModalContext, useToastContext, useAuthContext } from '@/app/lib';
import { FormApiService, FormSignatureStateService, useFormSignatureStore } from '@/entities/form';

import type { FormQuestionModel } from '@/entities/form';

interface Props {
  formQuestions: FormQuestionModel[];
}

export const useModalPublishSettingController = ({ formQuestions }: Props) => {
  const navigate = useNavigate();
  const { isLoggined } = useAuthContext();
  const { showToast } = useToastContext();
  const { closeModal } = useModalContext();
  const formSignature = useFormSignatureStore(s => s.formSignature);
  const setFormSignature = useFormSignatureStore(s => s.setFormSignature);

  // 초기화: formQuestions 검증 및 questionIds 설정
  useEffect(() => {
    if (!formQuestions || formQuestions.length === 0) {
      showToast('최소 1개의 질문을 추가해주세요');
      closeModal();
      return;
    }
    const questionIds = formQuestions.map(q => q.getValue('id'));
    const newFormSignature = FormSignatureStateService.getInitialFormSignature();
    setFormSignature(FormSignatureStateService.setQuestionIds(newFormSignature, questionIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = useMemo(() => {
    if (!formSignature) return false;
    const status = formSignature.getValue('status');
    if (status === 'DRAFT') return true;

    const publishedAt = formSignature.getValue('publishedAt');
    const closedAt = formSignature.getValue('closedAt');
    const selectionMethod = formSignature.getValue('selectionMethod');
    const targetCount = formSignature.getValue('targetCount');

    if (!publishedAt) return false;
    if (closedAt && publishedAt >= closedAt) return false;

    if (selectionMethod !== 'QUANTITATIVE') {
      if (!targetCount || targetCount <= 0) return false;
    }
    return true;
  }, [formSignature]);

  const handleConfirm = useCallback(async () => {
    if (!isValid || !formSignature) {
      return;
    }
    try {
      await FormApiService.createForm(formSignature, formQuestions);
      showToast('폼이 성공적으로 저장되었습니다');
      closeModal();
      if (isLoggined) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch {
      showToast('폼 저장에 실패했습니다');
    }
  }, [formSignature, formQuestions, isValid, isLoggined, showToast, closeModal, navigate]);

  return { isValid, handleConfirm };
};
