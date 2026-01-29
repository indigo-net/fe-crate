import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TypeGuard } from '@/shared/lib';
import { Alert } from '@/shared/ui';

import type { ComponentProps, ReactNode } from 'react';



type AlertProps = ComponentProps<typeof Alert>;

interface State {
  showAlert(alertProps: AlertProps): string;
  hideAlert(id?: string): void;
}

const AlertContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const AlertProvider = (props: Props) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const showAlert = useCallback((alertProps: AlertProps) => {
    setAlerts(prev => [...prev, alertProps]);
    return alertProps.id;
  }, []);

  const hideAlert = useCallback((id?: string) => {
    setAlerts(prev => {
      if (TypeGuard.checkUndefined(id)) {
        const next = [...prev];
        next.pop();
        return next;
      } else {
        return prev.filter(alert => alert.id !== id);
      }
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {props.children}
      {alerts.map(alert => {
        return createPortal(<Alert key={alert.id} {...alert} />, document.body);
      })}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export { AlertProvider, useAlertContext };
