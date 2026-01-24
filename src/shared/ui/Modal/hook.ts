import { BaseSyntheticEvent, useCallback } from 'react';

import { useModalContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?(): void;
  cancelCallback?(): void;
}

const useModalController = (props: Props) => {
  const { id, confirmCallback, cancelCallback } = props;
  const { closeModal } = useModalContext();

  const handleClose = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      closeModal(id);
    },
    [id, closeModal],
  );

  const handleConfirm = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      confirmCallback?.();
      setTimeout(() => {
        closeModal(id);
      });
    },
    [id, closeModal, confirmCallback],
  );

  const handleCancel = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      cancelCallback?.();
      setTimeout(() => {
        closeModal(id);
      });
    },
    [id, closeModal, cancelCallback],
  );

  return {
    handleClose,
    handleConfirm,
    handleCancel,
  };
};

export default useModalController;
