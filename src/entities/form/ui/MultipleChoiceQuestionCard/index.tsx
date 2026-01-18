import { memo } from 'react';

import { FormQuestionModel, FormQuestionType } from '@/entities/form/model';
import { Iconography } from '@/shared/ui';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onAddOption?: (questionId: string) => void;
  onRemoveOption?: (questionId: string, optionId: string) => void;
  onUpdateOption?: (questionId: string, optionId: string, value: string) => void;
}

const MultipleChoiceQuestionCard = (props: Props) => {
  const {
    question,
    onChangeTitle,
    onTypeChange,
    onDeleteQuestion,
    onAddOption,
    onRemoveOption,
    onUpdateOption,
  } = props;

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-all">
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <select
            value={question?.getValue('type') ?? 'SHORT_TEXT'}
            className="cursor-pointer px-3 py-1.5 text-xs font-slim-semibold rounded-slim-lg bg-bg-subtle border border-transparent hover:border-border-default text-text-secondary transition-all outline-none"
            onChange={e =>
              onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
            }
          >
            <option value="SHORT_TEXT">단답형</option>
            <option value="LONG_TEXT">장답형</option>
            <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
            <option value="SINGLE_CHOICE">객관식(단일선택)</option>
          </select>
        </div>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group w-9 h-9 flex items-center justify-center rounded-slim-lg bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 transition-all cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="w-5 h-5 text-text-tertiary group-hover:text-neon-pink-600 dark:group-hover:text-neon-pink-400 transition-colors"
            aria-hidden
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="w-full py-2 text-2xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-3">
            {question.getValue('options')?.map(option => {
              const { id, content } = option.toJSON();
              return (
                <div key={id} className="group/option w-full flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-border-default bg-bg-base flex-shrink-0 rounded-slim-sm group-focus-within/option:border-brand-primary transition-colors" />
                  <input
                    type="text"
                    value={content}
                    placeholder="옵션을 입력해주세요"
                    className="flex-1 text-base text-text-primary bg-transparent border-b border-transparent focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors py-1"
                    onChange={e => onUpdateOption?.(question.getValue('id'), id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveOption?.(question.getValue('id'), id)}
                    className="p-1.5 rounded-slim-md bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 opacity-0 group-hover/option:opacity-100 group-focus-within/option:opacity-100 transition-all"
                    aria-label="옵션 삭제"
                  >
                    <Iconography.Stroke.Minus
                      className="w-4 h-4 text-text-tertiary hover:text-neon-pink-600"
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => onAddOption?.(question.getValue('id'))}
              className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-slim-lg hover:bg-bg-subtle transition-all text-sm text-brand-primary font-slim-semibold"
            >
              <Iconography.Stroke.Plus className="w-4 h-4" />
              <span>옵션 추가하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MultipleChoiceQuestionCard);
