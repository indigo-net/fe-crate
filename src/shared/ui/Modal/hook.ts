import { BaseSyntheticEvent, useCallback } from 'react';

import { useModalContext } from '@/shared/context';
import DeveloperConsole from '@/shared/lib/developer-console';

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
      try {
        confirmCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Modal confirm callback error',
          data: error,
          location: '@/shared/ui/Modal/hook.ts',
        });
      } finally {
        setTimeout(() => {
          closeModal(id);
        });
      }
    },
    [id, closeModal, confirmCallback],
  );

  const handleCancel = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      try {
        cancelCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Modal cancel callback error',
          data: error,
          location: '@/shared/ui/Modal/hook.ts',
        });
      } finally {
        setTimeout(() => {
          closeModal(id);
        });
      }
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
