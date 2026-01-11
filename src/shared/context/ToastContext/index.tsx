import { createContext, useContext, useRef, useState } from 'react';

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} isVisible={isVisible} />
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToastContext };
