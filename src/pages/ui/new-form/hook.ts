import { useEffect, useRef, useCallback, createElement } from 'react';

import { useFormQuestionListStore } from '@/entities/form/store';
import { PublishSettingsModal } from '@/modals/ui';
import { UUID, useModalContext } from '@/shared/lib';

export const useNewFormPageController = () => {
  const { formQuestions } = useFormQuestionListStore();
  const { openModal, closeModal } = useModalContext();

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
    openModal({
      id: UUID.v4(),
      title: '폼 저장 및 게시 설정',
      confirmLabel: '게시하기',
      cancelLabel: '취소',
      content: createElement(PublishSettingsModal, {
        onConfirm: settings => {
          console.log('Publish Settings:', settings);
          // TODO: API 연동 또는 상태 저장 로직 추가
          closeModal();
        },
      }),
      confirmCallback: () => {
        // PublishSettingsModal 내부의 handleConfirm이 호출되도록 트리거
        const trigger = document.getElementById('modal-confirm-trigger');
        if (trigger) {
          trigger.click();
        }
      },
    });
  }, [openModal, closeModal]);

  return { formQuestions, listRef, handleOpenPublishModal };
};
