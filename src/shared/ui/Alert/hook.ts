import { BaseSyntheticEvent, useCallback } from 'react';

import { useAlertContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?: () => void;
}

const useAlertController = (props: Props) => {
  const { id, confirmCallback } = props;
  const { hideAlert } = useAlertContext();

  const handleClose = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      hideAlert(id);
    },
    [hideAlert, id],
  );

  const handleConfirm = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      confirmCallback?.();
      setTimeout(() => {
        hideAlert(id);
      });
    },
    [confirmCallback, hideAlert, id],
  );

  return { handleClose, handleConfirm };
};

export default useAlertController;
