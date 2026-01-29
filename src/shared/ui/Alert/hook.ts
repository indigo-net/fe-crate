import { BaseSyntheticEvent, useCallback } from 'react';

import { useAlertContext } from '@/shared/context';
import DeveloperConsole from '@/shared/lib/developer-console';

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
      try {
        confirmCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Alert confirm callback error',
          data: error,
          location: '@/shared/ui/Alert/hook.ts',
        });
      } finally {
        setTimeout(() => {
          hideAlert(id);
        });
      }
    },
    [confirmCallback, hideAlert, id],
  );

  return { handleClose, handleConfirm };
};

export default useAlertController;
