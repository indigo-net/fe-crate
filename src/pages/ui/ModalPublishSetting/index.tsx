import { memo, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModalContext, useToastContext, useAuthContext } from '@/app/lib';
import { FormApiService, FormSignatureStateService, useFormSignatureStore } from '@/entities/form';
import {
  DateRangePicker,
  PublishStatusSelect,
  SelectionMethodSelect,
  TargetCountInput,
} from '@/features/publish-form/ui';
import { Iconography } from '@/shared/ui';

import type { FormQuestionModel } from '@/entities/form';

interface Props {
  formQuestions: FormQuestionModel[];
}

const ModalPublishSetting = memo(({ formQuestions }: Props) => {
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
    if (!formSignature) {
      return false;
    }

    const status = formSignature.getValue('status');
    if (status === 'DRAFT') {
      return true;
    }

    const publishedAt = formSignature.getValue('publishedAt');
    const closedAt = formSignature.getValue('closedAt');
    const selectionMethod = formSignature.getValue('selectionMethod');
    const targetCount = formSignature.getValue('targetCount');

    if (!publishedAt) {
      return false;
    }
    if (closedAt && publishedAt >= closedAt) {
      return false;
    }

    if (selectionMethod !== 'QUANTITATIVE') {
      if (!targetCount || targetCount <= 0) {
        return false;
      }
    }

    return true;
  }, [formSignature]);

  const handleConfirm = async () => {
    if (!isValid || !formSignature) {
      return;
    }

    try {
      // FormApiService를 통해 API 호출 (questions 포함)
      await FormApiService.createForm(formSignature, formQuestions);

      showToast('폼이 성공적으로 저장되었습니다');
      closeModal();

      // 로그인 상태에 따른 페이지 이동 (react-router-dom useNavigate)
      if (isLoggined) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch {
      showToast('폼 저장에 실패했습니다');
    }
  };

  return (
    <div className="flex flex-col gap-8 py-2">
      <PublishStatusSelect />
      <SelectionMethodSelect />
      <DateRangePicker />
      <TargetCountInput />

      <div className="mt-4 p-4 rounded-slim-lg bg-warning-bg/30 border border-warning-border/50 flex gap-3 items-start">
        <Iconography.Stroke.Warning className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-slim-bold text-warning">확인해주세요:</span> 게시 이후에는 선발
          방식을 변경하기 어려울 수 있으며, 모든 지원 데이터는 설정된 기간 동안 암호화되어 안전하게
          보관됩니다.
        </p>
      </div>

      <button
        id="modal-confirm-trigger"
        onClick={handleConfirm}
        disabled={!isValid}
        className="hidden"
      />
      <div id="publish-settings-validity" data-valid={isValid} className="hidden" />
    </div>
  );
});

ModalPublishSetting.displayName = 'ModalPublishSetting';

export default ModalPublishSetting;
