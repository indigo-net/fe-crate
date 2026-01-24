import { useCallback } from 'react';

import { useAlertContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?: () => void;
}

const useAlertController = (props: Props) => {
  const { id, confirmCallback } = props;
  const { hideAlert } = useAlertContext();

  const handleClose = useCallback(() => {
    hideAlert(id);
  }, [hideAlert, id]);

  const handleConfirm = useCallback(() => {
    confirmCallback?.();
    setTimeout(() => {
      hideAlert(id);
    });
  }, [confirmCallback, hideAlert, id]);

  return { handleClose, handleConfirm };
};

export default useAlertController;
