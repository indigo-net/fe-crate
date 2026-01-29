import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TypeGuard } from '@/shared/lib';
import { Modal } from '@/shared/ui';

import type { ComponentPropsWithRef, ReactNode } from 'react';

type ModalProps = ComponentPropsWithRef<typeof Modal>;

interface State {
  openModal: (modalProps: ModalProps) => string;
  closeModal: (id?: string) => void;
}

const ModalContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const ModalProvider = (props: Props) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const openModal = useCallback((modalProps: ModalProps) => {
    setModals(prev => [...prev, { ...modalProps }]);
    return modalProps.id;
  }, []);

  const closeModal = useCallback((id?: string) => {
    setModals(prev => {
      if (TypeGuard.checkUndefined(id)) {
        const next = [...prev];
        next.pop();
        return next;
      } else {
        return prev.filter(modal => modal.id !== id);
      }
    });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {props.children}
      {modals.map(modal => {
        return createPortal(<Modal key={modal.id} {...modal} />, document.body);
      })}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export { useModalContext, ModalProvider };
