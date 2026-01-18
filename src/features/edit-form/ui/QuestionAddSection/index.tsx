import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useQuestionAddSectionController from './hook';

const QuestionAddSection = () => {
  const { handleAddQuestion } = useQuestionAddSectionController();

  const buttonClass =
    'group flex flex-col items-center justify-center gap-4 p-6 bg-bg-base border-2 border-border-default rounded-slim-2xl hover:border-brand-primary hover:bg-bg-subtle transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer';

  const iconBoxClass =
    'w-12 h-12 flex items-center justify-center bg-bg-subtle group-hover:bg-brand-primary/10 rounded-slim-xl transition-colors';

  return (
    <section className="w-full py-12 flex flex-col gap-8 items-center bg-transparent">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-2xl font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Plus className="w-6 h-6 text-brand-primary" />
          질문 추가하기
        </h3>
        <p className="text-text-secondary text-sm">
          필요한 질문 유형을 선택하여 설문을 구성해보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 w-full">
        <button className={buttonClass} onClick={() => handleAddQuestion('SHORT_TEXT')}>
          <div className={iconBoxClass}>
            <Iconography.Stroke.Document className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            단답형
          </span>
        </button>

        <button className={buttonClass} onClick={() => handleAddQuestion('LONG_TEXT')}>
          <div className={iconBoxClass}>
            <Iconography.Stroke.Document className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            장문형
          </span>
        </button>

        <button className={buttonClass} onClick={() => handleAddQuestion('MULTIPLE_CHOICE')}>
          <div className={iconBoxClass}>
            <Iconography.Stroke.Plus className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            복수선택
          </span>
        </button>

        <button className={buttonClass} onClick={() => handleAddQuestion('SINGLE_CHOICE')}>
          <div className={iconBoxClass}>
            <Iconography.Stroke.Plus className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            단일선택
          </span>
        </button>
      </div>
    </section>
  );
};

export default memo(QuestionAddSection);
