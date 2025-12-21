import { memo } from 'react';

interface Props {
  onClickShortTextButton?: () => void;
  onClickLongTextButton?: () => void;
  onClickMultipleChoiceButton?: () => void;
  onClickSingleChoiceButton?: () => void;
}

const QuestionAddSection = (props: Props) => {
  const {
    onClickShortTextButton = () => {},
    onClickLongTextButton = () => {},
    onClickMultipleChoiceButton = () => {},
    onClickSingleChoiceButton = () => {},
  } = props;

  return (
    <div className="shadow-sm border border-divider-default rounded-[16px] p-[24px] flex flex-col gap-[16px] bg-bg-default w-full">
      <h3 className="text-[24px] text-text-primary">질문 추가</h3>
      <div className="flex-1 w-full flex items-center gap-[12px]">
        <button
          className="border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out hover:bg-brand-primary/30 hover:border-brand-primary"
          onClick={onClickShortTextButton}
        >
          단답형
        </button>
        <button
          className="border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out hover:bg-brand-primary/30 hover:border-brand-primary"
          onClick={onClickLongTextButton}
        >
          장문형
        </button>
        <button
          className="border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out hover:bg-brand-primary/30 hover:border-brand-primary"
          onClick={onClickMultipleChoiceButton}
        >
          복수선택
        </button>
        <button
          className="border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out hover:bg-brand-primary/30 hover:border-brand-primary"
          onClick={onClickSingleChoiceButton}
        >
          단일선택
        </button>
      </div>
    </div>
  );
};

export default memo(QuestionAddSection);
