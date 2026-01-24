import useAlertController from './hook';

import type { ReactNode } from 'react';

interface Props {
  id: string;
  title?: string;
  content: ReactNode;
  confirmLabel?: string;
  confirmCallback?: () => void;
}

const Alert = (props: Props) => {
  const { id, title, content, confirmLabel = '확인', confirmCallback } = props;
  const { handleClose, handleConfirm } = useAlertController({ id, confirmCallback });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="alertdialog"
    >
      <div className="bg-white rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-dialog-in w-[320px] max-w-[90%]">
        {title && (
          <div className="px-[20px] py-[8px] border-b border-gray-100">
            <h2 className="text-[17px] font-bold text-gray-900 line-clamp-1">{title}</h2>
          </div>
        )}

        <div className="px-[20px] py-[24px] text-gray-700 text-[15px] text-center">{content}</div>

        <div className="px-[20px] py-[12px] flex justify-center bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-[10px] rounded-[8px] text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-500/20"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
