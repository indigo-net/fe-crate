import { memo } from 'react';

import { FormQuestionModel, FormQuestionType } from '@/entities/form-question/model';
import { Iconography } from '@/shared/ui';

interface Props {
  question: FormQuestionModel;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onChangeTitle?: (questionId: string, value: string) => void;
  onAddOption?: (questionId: string) => void;
  onRemoveOption?: (questionId: string, optionId: string) => void;
  onUpdateOption?: (questionId: string, optionId: string, value: string) => void;
}

const SingleChoiceQuestionCard = (props: Props) => {
  const {
    question,
    onChangeTitle,
    onAddOption,
    onRemoveOption,
    onUpdateOption,
    onTypeChange,
    onDeleteQuestion,
  } = props;

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
          <div className="w-full flex flex-col gap-[8px]">
            {question.getValue('options')?.map(option => {
              const { id, content } = option.toJSON();
              return (
                <div key={id} className="w-full flex items-center gap-[8px]">
                  <div className="w-[18px] h-[18px] border border-gray-300 bg-white flex-shrink-0 rounded-full" />
                  <input
                    type="text"
                    value={content}
                    placeholder="옵션을 입력해주세요"
                    className="flex-1 text-[14px] text-text-primary bg-transparent border-b border-transparent focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors py-[4px]"
                    onChange={e => onUpdateOption?.(question.getValue('id'), id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveOption?.(question.getValue('id'), id)}
                    className="p-[4px] rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="옵션 삭제"
                  >
                    <Iconography.Stroke.Minus
                      className="w-[20px] h-[20px] text-danger hover:cursor-pointer"
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => onAddOption?.(question.getValue('id'))}
              className="w-fit flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] hover:bg-gray-100 transition-colors text-[13px] text-text-secondary font-medium"
            >
              <Iconography.Stroke.Plus className="w-[14px] h-[14px]" />
              <span>옵션 추가</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SingleChoiceQuestionCard);
