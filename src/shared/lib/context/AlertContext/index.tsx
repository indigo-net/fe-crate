import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import DeveloperConsole from '@/shared/lib/developer-console';

import { TypeGuard } from '@/shared/lib';
import { Alert } from '@/shared/ui';

import type { ComponentProps, ReactNode } from 'react';

type AlertProps = ComponentProps<typeof Alert>;

interface AlertOptions extends Omit<AlertProps, 'onConfirm'> {
  id: string;
  confirmCallback?: () => void;
}

interface State {
  showAlert(options: AlertOptions): string;
  hideAlert(id?: string): void;
}

const AlertContext = createContext<State | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertOptions[]>([]);

  const hideAlert = useCallback((id?: string) => {
    setAlerts(prev => {
      if (TypeGuard.checkUndefined(id)) return prev.slice(0, -1);
      return prev.filter(alert => alert.id !== id);
    });
  }, []);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlerts(prev => [...prev, options]);
    return options.id;
  }, []);

  const handleConfirm = (id: string, callback?: () => void) => {
    try {
      callback?.();
    } catch (error) {
      DeveloperConsole.error({
        message: 'Alert confirm callback error',
        data: error,
      });
    } finally {
      setTimeout(() => hideAlert(id));
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alerts.map(alert =>
        createPortal(
          <div
            key={alert.id}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300"
            onClick={() => hideAlert(alert.id)}
            role="alertdialog"
            aria-modal="true"
          >
            <Alert {...alert} onConfirm={() => handleConfirm(alert.id, alert.confirmCallback)} />
          </div>,
          document.body,
        ),
      )}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useAlertContext error');
  }
  return context;
};
