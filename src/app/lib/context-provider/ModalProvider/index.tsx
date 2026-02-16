import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import DeveloperConsole from '@/shared/lib/developer-console';

import { TypeGuard } from '@/shared/lib';
import { Modal } from '@/shared/ui';

import type { ComponentProps, ReactNode } from 'react';

type ModalProps = ComponentProps<typeof Modal>;

interface ModalOptions extends Omit<ModalProps, 'onConfirm' | 'onCancel'> {
  id: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

interface State {
  openModal: (options: ModalOptions) => string;
  closeModal: (id?: string) => void;
}

const ModalContext = createContext<State | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalOptions[]>([]);

  const closeModal = useCallback((id?: string) => {
    setModals(prev =>
      TypeGuard.checkUndefined(id) ? prev.slice(0, -1) : prev.filter(m => m.id !== id),
    );
  }, []);

  const openModal = useCallback((options: ModalOptions) => {
    setModals(prev => [...prev, options]);
    return options.id;
  }, []);

  const handleAction = (id: string, callback?: () => void) => {
    try {
      callback?.();
    } catch (error) {
      DeveloperConsole.error({ message: 'Modal Action Error', data: error });
    } finally {
      closeModal(id);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map(m =>
        createPortal(
          /* 배경(Backdrop)과 모달의 위치/닫기 버튼은 시스템 인프라의 몫 */
          <div
            key={m.id}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px]"
            onClick={() => closeModal(m.id)}
          >
            <div className="relative h-[80%] w-[80%] max-w-[1200px] max-h-[90vh] animate-dialog-in">
              <Modal
                {...m}
                onConfirm={() => handleAction(m.id, m.confirmCallback)}
                onCancel={() => handleAction(m.id, m.cancelCallback)}
              />
            </div>
          </div>,
          document.body,
        ),
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('ModalProvider error');
  }
  return context;
};
