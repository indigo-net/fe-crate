import { memo } from 'react';

import useQuestionEditCardController from './hook';

import type { FormQuestionType } from '@/entities/form-question/model';

interface Props {
  questionId: string;
}

const QuestionEditCard = (props: Props) => {
  const { questionId } = props;
  const { question, handleTitleChange, handleTypeChange } = useQuestionEditCardController({
    questionId,
  });

  return (
    <section className="w-full flex flex-col gap-[12px] p-[24px] bg-bg-default border border-divider-default rounded-[16px] shadow-sm">
      {/* 질문 타입 선택 */}
      <div className="w-fit">
        <select
          value={question?.getValue('type') ?? 'SHORT_TEXT'}
          className="appearance-none cursor-pointer px-[8px] py-[4px] text-[12px] rounded-[6px] bg-bg-sub border border-divider-default text-text-secondary transition-colors"
          onChange={e => handleTypeChange(e.target.value as FormQuestionType)}
        >
          <option value="SHORT_TEXT">단답형</option>
          <option value="LONG_TEXT">장답형</option>
          <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
          <option value="SINGLE_CHOICE">객관식(단일선택)</option>
        </select>
      </div>

      {/* 질문 제목 입력 */}
      <div className="w-full">
        <input
          type="text"
          placeholder="질문을 입력해주세요. (최대 50자)"
          className="w-full py-[4px] text-[18px] font-bold bg-transparent border-b border-gray-200 text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={50}
          onChange={e => {
            handleTitleChange(e.target.value);
          }}
        />
      </div>

      {/* 단답형 답변 영역 프리뷰 */}
      {question?.getValue('type') === 'SHORT_TEXT' && (
        <div className="w-full pt-[8px]">
          <div className="w-full max-w-[400px]">
            <input
              disabled
              type="text"
              placeholder="단답형 텍스트 (최대 100자)"
              className="w-full px-[12px] py-[10px] text-[14px] rounded-[8px] border border-dashed border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(QuestionEditCard);
