import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import type { FormQuestionModel, FormQuestionType } from '@/entities/form-question/model';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
}

const ShortTextQuestionCard = (props: Props) => {
  const { question, onChangeTitle, onTypeChange, onDeleteQuestion } = props;

  return (
    <section className="w-full flex flex-col gap-[12px] p-[24px] bg-bg-default border border-divider-default rounded-[16px] shadow-sm">
      <div className="w-full flex justify-between items-center">
        {/* 질문 타입 선택 */}
        <select
          value={question?.getValue('type') ?? 'SHORT_TEXT'}
          className="appearance-none cursor-pointer px-[8px] py-[4px] text-[12px] rounded-[6px] bg-bg-sub border border-divider-default text-text-secondary transition-colors"
          onChange={e =>
            onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
          }
        >
          <option value="SHORT_TEXT">단답형</option>
          <option value="LONG_TEXT">장답형</option>
          <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
          <option value="SINGLE_CHOICE">객관식(단일선택)</option>
        </select>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group rounded-full aspect-square p-[8px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="text-gray-500 group-hover:text-danger transition-colors duration-200"
            aria-hidden
          />
        </button>
      </div>
      <div className="w-full flex flex-col gap-[12px]">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요. (최대 50자)"
            className="w-full py-[4px] text-[18px] font-bold bg-transparent border-b border-gray-200 text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

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
      </div>
    </section>
  );
};

export default memo(ShortTextQuestionCard);
