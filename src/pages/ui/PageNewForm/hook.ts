import { useEffect, useRef, useCallback, createElement } from 'react';

import { useModalContext, useToastContext } from '@/app/lib';
import { FormValidationService } from '@/entities/form';
import { useFormSignatureStore } from '@/entities/form/store';
import { useFormQuestionListStore } from '@/entities/form/store';
import { UUID } from '@/shared/lib';

import ModalPublishSetting from '../ModalPublishSetting';

export const usePageNewFormController = () => {
  const { formSignature } = useFormSignatureStore();
  const { formQuestions } = useFormQuestionListStore();
  const { openModal } = useModalContext();
  const { showToast } = useToastContext();

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // NOTE: 질문이 추가되더라도, "질문추가용UI" 를 추적하기 위해 카드리스트의 가장 하단으로 스크롤 이동
    if (listRef.current) {
      listRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [formQuestions.length]);

  const handleOpenPublishModal = useCallback(() => {
    // 폼 검증
    const validation = FormValidationService.validate(formSignature, formQuestions);
    if (!validation.isValid) {
      showToast(validation.message);
      return;
    }

    openModal({
      id: UUID.v4(),
      title: '폼 저장 및 게시 설정',
      confirmLabel: '게시하기',
      cancelLabel: '취소',
      content: createElement(ModalPublishSetting, {
        formQuestions,
      }),
      confirmCallback: () => {
        // ModalPublishSetting 내부의 handleConfirm이 호출되도록 트리거
        const trigger = document.getElementById('modal-confirm-trigger');
        if (trigger) {
          trigger.click();
        }
      },
    });
  }, [formSignature, formQuestions, openModal, showToast]);

  return { formQuestions, listRef, handleOpenPublishModal };
};
