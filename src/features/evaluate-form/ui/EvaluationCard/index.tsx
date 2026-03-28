import { memo } from 'react';

import { AnswerModel } from '@/entities/answer';
import { EvaluationModel } from '@/entities/evaluation';
import { FormQuestionModel } from '@/entities/form';
import { ScoreInput } from '@/shared/ui';

type Evaluation = EvaluationModel<AnswerModel<FormQuestionModel>>;

interface Props {
  evaluation: Evaluation;
  isCompleted: boolean;
  onScoreChange: (score: number) => void;
  onCommentChange: (comment: string) => void;
}

const EvaluationCard = memo(({ evaluation, isCompleted, onScoreChange, onCommentChange }: Props) => {
  const answer = evaluation.getValue('target');
  const question = answer.getValue('question');
  const answerValue = answer.getValue('value');
  const score = evaluation.getValue('score');
  const comment = evaluation.getValue('comment') ?? '';

  const displayAnswer = Array.isArray(answerValue) ? answerValue.join(', ') : (answerValue ?? '');

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 overflow-y-auto">
      <article className="w-full max-w-2xl bg-bg-base border border-border-default rounded-slim-2xl p-8 space-y-6">
        {/* 질문 */}
        <header>
          <h2 className="text-xl font-slim-bold text-text-primary">{question.getValue('title')}</h2>
          {question.getValue('description') && (
            <p className="text-sm text-text-secondary mt-2">{question.getValue('description')}</p>
          )}
        </header>

        {/* 답변 */}
        <div className="p-5 bg-bg-subtle rounded-slim-lg">
          <p className="text-xs font-slim-semibold text-text-tertiary mb-2">답변</p>
          <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
            {displayAnswer || <span className="text-text-tertiary italic">답변 없음</span>}
          </p>
        </div>

        {/* 코멘트 */}
        <div>
          <label className="text-xs font-slim-semibold text-text-secondary">코멘트 (선택)</label>
          <textarea
            value={comment}
            onChange={e => onCommentChange(e.target.value)}
            disabled={isCompleted}
            placeholder="이 답변에 대한 코멘트를 입력하세요..."
            className="w-full mt-1 px-4 py-3 text-sm bg-bg-subtle border border-border-default rounded-slim-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
            rows={3}
          />
        </div>

        {/* 점수 */}
        <div>
          <ScoreInput
            value={score > 0 ? score : null}
            onChange={onScoreChange}
            disabled={isCompleted}
          />
        </div>
      </article>
    </div>
  );
});

EvaluationCard.displayName = 'EvaluationCard';

export default EvaluationCard;
