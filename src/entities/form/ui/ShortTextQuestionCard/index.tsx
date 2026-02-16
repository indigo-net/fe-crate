import { memo } from 'react';

import { FormQuestionModel } from '@/entities/form/model';
import { Iconography } from '@/shared/ui';

import type { FormQuestionType } from '@/entities/form';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
}

const ShortTextQuestionCard = (props: Props) => {
  const { question, onChangeTitle, onTypeChange, onDeleteQuestion } = props;

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
          <div className="w-full max-w-sm">
            <input
              disabled
              type="text"
              placeholder="답변자가 입력할 공간입니다"
              className="w-full px-4 py-3 text-sm rounded-slim-xl border border-dashed border-border-default bg-bg-subtle/50 text-text-tertiary cursor-not-allowed select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ShortTextQuestionCard);
