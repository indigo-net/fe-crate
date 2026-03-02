import { memo } from 'react';

import { FormQuestionModel } from '@/entities/form';

import type { FormQuestionType } from '@/entities/form';

interface Props {
  questions: FormQuestionModel[];
}

const QUESTION_TYPE_LABEL: Record<FormQuestionType, string> = {
  SINGLE_CHOICE: '단일 선택',
  MULTIPLE_CHOICE: '복수 선택',
  SHORT_TEXT: '단답형',
  LONG_TEXT: '장문형',
};

const QuestionPreviewItem = (props: { question: FormQuestionModel; index: number }) => {
  const { question, index } = props;
  const type = question.getValue('type');
  const title = question.getValue('title');
  const options = question.getValue('options');
  const required = question.getValue('required');

  const isChoiceType = type === 'SINGLE_CHOICE' || type === 'MULTIPLE_CHOICE';

  return (
    <div className="w-full flex flex-col gap-4 p-6 bg-bg-base border border-border-default rounded-slim-xl">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-brand-primary/10 text-brand-primary text-sm font-slim-bold rounded-slim-lg">
          {index + 1}
        </span>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-slim-semibold text-text-primary">
              {title || '질문 제목 없음'}
            </h3>
            {required && <span className="text-xs text-error font-slim-semibold">필수</span>}
          </div>
          <span className="text-xs text-text-tertiary px-2 py-1 bg-bg-subtle rounded-slim-md w-fit">
            {QUESTION_TYPE_LABEL[type]}
          </span>
        </div>
      </div>

      {isChoiceType && options && options.length > 0 && (
        <div className="ml-12 flex flex-col gap-2">
          {options.map(option => {
            const { id, content } = option.toJSON();
            return (
              <div key={id} className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border border-border-strong flex-shrink-0 ${
                    type === 'SINGLE_CHOICE' ? 'rounded-full' : 'rounded-slim-sm'
                  }`}
                />
                <span className="text-sm text-text-secondary">{content}</span>
              </div>
            );
          })}
        </div>
      )}

      {type === 'SHORT_TEXT' && (
        <div className="ml-12">
          <div className="h-10 border-b border-border-default bg-bg-subtle/50 rounded-slim-md" />
        </div>
      )}

      {type === 'LONG_TEXT' && (
        <div className="ml-12">
          <div className="h-24 border border-border-default bg-bg-subtle/50 rounded-slim-md" />
        </div>
      )}
    </div>
  );
};

const QuestionPreview = (props: Props) => {
  const { questions } = props;

  if (questions.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-center gap-4 p-12 bg-bg-base border border-border-default rounded-slim-2xl">
        <p className="text-text-tertiary text-center">등록된 질문이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-slim-bold text-text-primary">질문 목록 ({questions.length}개)</h2>
      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <QuestionPreviewItem key={question.getValue('id')} question={question} index={index} />
        ))}
      </div>
    </section>
  );
};

export default memo(QuestionPreview);
