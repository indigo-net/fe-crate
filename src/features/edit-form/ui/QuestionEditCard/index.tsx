import { Fragment, memo } from 'react';

import { TypeGuard } from '@/shared/lib';
import { Iconography } from '@/shared/ui';

import useQuestionEditCardController from './hook';

import type { FormQuestionType } from '@/entities/form-question/model';

interface Props {
  questionId: string;
}

const QuestionEditCard = (props: Props) => {
  const { questionId } = props;
  const {
    question,
    handleTitleChange,
    handleTypeChange,
    handleDeleteQuestion,
    handleUpdateOption,
    handleAddOption,
    handleRemoveOption,
  } = useQuestionEditCardController({
    questionId,
  });

  if (TypeGuard.checkNull(question)) {
    return <Fragment />;
  }

  return (
    <section className="w-full flex flex-col gap-[12px] p-[24px] bg-bg-default border border-divider-default rounded-[16px] shadow-sm">
      <div className="w-full flex justify-between items-center">
        {/* 질문 타입 선택 */}
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

        <button
          type="button"
          aria-label="질문 삭제"
          className="group rounded-full aspect-square p-[8px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={handleDeleteQuestion}
        >
          <Iconography.Stroke.Trash
            className="text-gray-500 group-hover:text-danger transition-colors duration-200"
            aria-hidden
          />
        </button>
      </div>

      {/* 질문 제목 입력 */}
      <div className="w-full">
        <input
          type="text"
          placeholder="질문을 입력해주세요. (최대 50자)"
          className="w-full py-[4px] text-[18px] font-bold bg-transparent border-b border-gray-200 text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={50}
          value={question?.getValue('title') ?? ''}
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
      {/* 장문형 답변 영역 프리뷰 */}
      {question?.getValue('type') === 'LONG_TEXT' && (
        <div className="w-full pt-[8px]">
          <div className="w-full max-w-[400px]">
            <textarea
              disabled
              placeholder="장문형 텍스트 (최대 1000자)"
              className="resize-none w-full h-[100px] px-[12px] py-[10px] text-[14px] rounded-[8px] border border-dashed border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed select-none"
            />
          </div>
        </div>
      )}
      {/* 선택형 답변 영역 프리뷰 */}
      {(question?.getValue('type') === 'SINGLE_CHOICE' ||
        question?.getValue('type') === 'MULTIPLE_CHOICE') && (
        <div className="w-full pt-[8px]">
          <div className="w-full flex flex-col gap-[8px]">
            {question?.getValue('options')?.map(option => {
              const { id, content } = option.toJSON();
              return (
                <div key={id} className="w-full flex items-center gap-[8px]">
                  <div
                    className={`w-[18px] h-[18px] border border-gray-300 bg-white flex-shrink-0 ${
                      question?.getValue('type') === 'SINGLE_CHOICE'
                        ? 'rounded-full'
                        : 'rounded-[4px]'
                    }`}
                  />
                  <input
                    type="text"
                    value={content}
                    placeholder="옵션을 입력해주세요"
                    className="flex-1 text-[14px] text-text-primary bg-transparent border-b border-transparent focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors py-[4px]"
                    onChange={e => handleUpdateOption(id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(id)}
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
              onClick={handleAddOption}
              className="w-fit flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] hover:bg-gray-100 transition-colors text-[13px] text-text-secondary font-medium"
            >
              <Iconography.Stroke.Plus className="w-[14px] h-[14px]" />
              <span>옵션 추가</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(QuestionEditCard);
