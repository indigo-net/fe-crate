import { useCallback } from 'react';

import { useModalContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?(): void;
  cancelCallback?(): void;
}

const useModalController = (props: Props) => {
  const { id, confirmCallback, cancelCallback } = props;
  const { closeModal } = useModalContext();

  const handleClose = useCallback(() => {
    closeModal(id);
  }, [id, closeModal]);

  const handleConfirm = useCallback(() => {
    confirmCallback?.();
    setTimeout(() => {
      closeModal(id);
    });
  }, [id, closeModal, confirmCallback]);

  const handleCancel = useCallback(() => {
    cancelCallback?.();
    setTimeout(() => {
      closeModal(id);
    });
  }, [id, closeModal, cancelCallback]);

  return {
    handleClose,
    handleConfirm,
    handleCancel,
  };
};

export default useModalController;
