import { Iconography } from '@/shared/ui';

import useModalController from './hook';

import type { ReactNode } from 'react';

interface Props {
  id: string;
  title?: string;
  content: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

const Modal = (props: Props) => {
  const {
    id,
    title,
    content,
    confirmLabel = '확인',
    cancelLabel = '취소',
    confirmCallback,
    cancelCallback,
  } = props;
  const { handleClose, handleConfirm, handleCancel } = useModalController({
    id,
    confirmCallback,
    cancelCallback,
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-[20px] shadow-2xl flex flex-col overflow-hidden animate-dialog-in w-[80%] h-[80%] max-w-[1200px] max-h-[90vh]">
        <div className="px-[24px] py-[8px] border-b border-gray-100 flex items-center justify-between">
          {title && <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>}
          <button
            type="button"
            onClick={handleClose}
            className="p-2 -mr-2 ml-auto text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <Iconography.Stroke.Cancel />
          </button>
        </div>

        <div className="flex-1 px-[24px] py-[24px] overflow-y-auto text-gray-700 text-[16px]">
          {content}
        </div>

        <div className="px-[24px] py-[16px] flex justify-end gap-[12px] bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-[20px] py-[12px] rounded-[10px] text-[15px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-[24px] py-[12px] rounded-[10px] text-[15px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
Modal.displayName = 'Modal';

export default Modal;
