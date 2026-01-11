import { createPortal } from 'react-dom';

interface Props {
  message: string;
  isVisible: boolean;
}

const Toast = (props: Props) => {
  const { message, isVisible } = props;

  return createPortal(
    <div
      className={`fixed bottom-[98px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-600 text-white px-[20px] py-[12px] rounded-[8px] shadow-lg max-w-[90vw] break-words text-[14px]">
        {message}
      </div>
    </div>,
    document.body,
  );
};
Toast.displayName = 'Toast';

export default Toast;
