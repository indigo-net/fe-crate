import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { TypeGuard } from '@/shared/lib';
import { Toast } from '@/shared/ui';

import type { ReactNode } from 'react';

interface State {
  showToast: (message: string) => void;
}

const ToastContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const ToastProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (newMessage: string) => {
    // 이전 타이머 제거
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(newMessage);
    setIsVisible(true);

    // 3초 후 자동 숨김
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(<Toast message={message} isVisible={isVisible} />, document.body)}
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToastContext };
