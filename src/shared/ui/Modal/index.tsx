import type { ReactNode } from 'react';

interface Props {
  title?: string;
  content: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Modal = (props: Props) => {
  const {
    title,
    content,
    confirmLabel = '확인',
    cancelLabel = '취소',
    onConfirm,
    onCancel,
  } = props;

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl"
      onClick={e => e.stopPropagation()} // 클릭이 배경으로 퍼지는 것만 방지
    >
      {title && (
        <div className="border-b border-gray-100 px-[24px] py-[16px]">
          <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-[24px] py-[24px] text-[16px] text-gray-700">
        {content}
      </div>

      <div className="flex justify-end gap-[12px] border-t border-gray-100 bg-gray-50 px-[24px] py-[16px]">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-[10px] px-[20px] py-[12px] text-[15px] font-medium text-gray-500 hover:bg-gray-100"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-[10px] bg-indigo-600 px-[24px] py-[12px] text-[15px] font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
export default Modal;
