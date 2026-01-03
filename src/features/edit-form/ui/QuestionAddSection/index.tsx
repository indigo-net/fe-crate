import { memo } from 'react';

import useQuestionAddSectionController from './hook';

const QuestionAddSection = () => {
  const { handleAddQuestion } = useQuestionAddSectionController();

  // 공통 버튼 스타일 (기본 상태 및 호버 상태)
  const buttonBaseClass =
    'border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out';
  const activeClass =
    'hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary cursor-pointer text-text-secondary';

  // Disabled 스타일: Gray-scale 활용
  const disabledClass =
    'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed';

  return (
    <section className="shadow-sm border border-divider-default rounded-[16px] p-[24px] flex flex-col gap-[16px] bg-bg-default w-full">
      <h3 className="text-[20px] font-bold text-text-primary">질문 추가</h3>
      <div className="flex-1 w-full flex items-center gap-[12px]">
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('SHORT_TEXT')}
        >
          단답형
        </button>
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('LONG_TEXT')}
        >
          장문형
        </button>
        <button
          disabled
          className={`${buttonBaseClass} ${disabledClass}`}
          onClick={() => handleAddQuestion('MULTIPLE_CHOICE')}
        >
          복수선택
        </button>
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('SINGLE_CHOICE')}
        >
          단일선택
        </button>
      </div>
    </section>
  );
};

export default memo(QuestionAddSection);
